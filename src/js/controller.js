import * as model from "./model.js";

import BookmarksBtnView from "./views/buttons/bookmarksBtnView.js";
import BookmarksView from "./views/bookmarksView.js";
import SearchView from "./views/searchView.js";
import ImgResultView from "./views/imgResultView.js";
import SearchResultsView from "./views/searchResultsView.js";
import PaginationView from "./views/paginationView.js";

import buttonAnimationsUI from "./ui/buttonAnimationsUI.js";
import navButtonUI from "./ui/navButtonUI.js";
import stickyNavUI from "./ui/stickyNavUI.js";
import buttonScrollUI from "./ui/buttonScrollUI.js";

const searchResultsView = new SearchResultsView(".search-results-cont");
const searchResultsViewFull = new SearchResultsView(
  ".search-results-cont-full"
);

const bookmarksView = new BookmarksView(".bookmarked-search-results");
const bookmarksBtnViewFull = new BookmarksBtnView("#bookmarks");
const bookmarksViewFull = new BookmarksView(".search-results-cont-full", false);

const paginationView = new PaginationView(".pagination");
const paginationViewFull = new PaginationView(".pagination-full");

const imgResultView = new ImgResultView(".search-results-cont");
const imgResultViewFull = new ImgResultView(".image-display");

const searchView = new SearchView(".search-bar-cont");
const searchViewFull = new SearchView("#form-menu-large");

//  space = %20

/**
 * Controls the display of image results.
 * @returns {Promise<void>} A Promise that resolves when the function completes.
 */
const controlImgResult = async function () {
  try {
    // Get ID From URL hash
    const imgId = window.location.hash.slice(1);

    // Guard clause
    if (!imgId) return;

    // Render spinners to indicate loading
    imgResultView.renderSpinner();
    imgResultViewFull.renderSpinner();

    // Update the appropriate Views based on display
    if (bookmarksViewFull.getIsRevealed()) {
      bookmarksViewFull.update(model.state.bookmarks);
      // Update View only if there were ALREADY search results present
    } else if (model.state.search.results.length !== 0) {
      searchResultsViewFull.render(model.state.search.results);
    }

    bookmarksView.update(model.state.bookmarks);

    // Load image
    const imgObj = await model.loadImgObj(imgId);
    model.updateImgObj(imgObj);

    // Render image:
    imgResultView.render(model.state.imgObj);
    imgResultViewFull.render(model.state.imgObj, "FULL");
  } catch (err) {
    console.error("Error fetching data:", err.message);
    imgResultView.renderError();
    imgResultViewFull.renderError();
  }
};

/**
 * Controls the display of search results.
 * @returns {Promise<void>} A Promise that resolves when the function completes.
 */
const controlSearchResults = async function () {
  try {
    // Making room for search results
    bookmarksViewFull.hideBookmarks();

    // Render spinner
    searchResultsView.renderSpinner();
    searchResultsViewFull.renderSpinner();

    // Resetting state search object
    model.resetStateSearch();

    // Get search topic from correct searchView
    let searchTopic;
    searchTopic = searchView.getSearchTopic();
    if (!searchTopic) {
      searchTopic = searchViewFull.getSearchTopic();
    }

    // Guard clause
    if (!searchTopic) return;

    // Loading and rendering search result page
    const initSearchResultsPage = await model.getSearchResultsPage(
      searchTopic,
      1
    );

    // Guard clause: If there are no search results, render an error notification
    if (!initSearchResultsPage) {
      searchResultsView.renderError();
      searchResultsViewFull.renderError();
      return;
    }

    // Otherwise render the search results
    searchResultsView.render(initSearchResultsPage);
    searchResultsViewFull.render(initSearchResultsPage);

    // Render initial pagination
    paginationView.render(model.state.search);
    paginationViewFull.render(model.state.search, "FULL");
  } catch (err) {
    console.log(err);
  }
};

/**
 * Controls the pagination functionality.
 * @param {number} goToPage The page number to navigate to.
 * @returns {Promise<void>} A Promise that resolves when the function completes.
 */
const controlPagination = async function (goToPage) {
  // Remove bookmarks container in full screen menu
  bookmarksViewFull.hideBookmarks();

  // Render spinner
  searchResultsView.renderSpinner();
  searchResultsViewFull.renderSpinner();

  // Update page to new page
  model.updateCurrPage(goToPage);

  // Load the next search results for the specified page
  const newSearchRes = await model.loadNextSearchRes(
    model.state.search.idObj,
    goToPage
  );

  // Update the search results in the model
  model.updateSearchResults(newSearchRes);

  // Render the updated search results in the view
  searchResultsView.render(model.state.search.results);
  searchResultsViewFull.render(model.state.search.results);

  // Render the new pagination based on the updated model
  paginationView.render(model.state.search);
  paginationViewFull.render(model.state.search, "FULL");
};

/**
 * Controls the addition/removal of bookmarks.
 * @returns {void}
 */
const controlAddBookmark = function () {
  // Gaurd clause:
  if (!model.state.imgObj) return;

  // Add/remove bookmark
  if (!model.state.imgObj.bookmarked) {
    model.addBookmark(model.state.imgObj);
  } else {
    model.deleteBookmark(model.state.imgObj.id);
  }

  // Update imgResultView view
  imgResultView.update(model.state.imgObj);
  imgResultViewFull.update(model.state.imgObj, "FULL");

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
  bookmarksViewFull.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);

  // debugger;
  bookmarksViewFull.render(model.state.bookmarks);
};

const controlBookmarksVisibility = function () {
  // Render spinner
  bookmarksViewFull.renderSpinner();

  // Get the current status of bookmarks visibility
  const isRevealed = bookmarksViewFull.getIsRevealed();

  // Toggle the status for rendering: true = render, false = don't render
  bookmarksViewFull.toggleIsRevealed();

  // Clear the container
  searchResultsViewFull.clearContainer();

  if (!isRevealed) {
    bookmarksViewFull.render(model.state.bookmarks);
  } else {
    bookmarksViewFull.hideBookmarks();
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  bookmarksViewFull.addHandlerRender(controlBookmarks);

  bookmarksBtnViewFull.addHandlerToggle(controlBookmarksVisibility);

  imgResultView.addHandlerRender(controlImgResult);
  imgResultViewFull.addHandlerRender(controlImgResult);

  searchView.addHandlerSearch(controlSearchResults);
  searchViewFull.addHandlerSearch(controlSearchResults);

  paginationView.addHandlerClick(controlPagination);
  paginationViewFull.addHandlerClick(controlPagination);

  imgResultView.addHandlerBookmark(controlAddBookmark);
  // imgResultViewFull.addHandlerBookmark(controlAddBookmark);

  buttonAnimationsUI.activateAnimation();
  navButtonUI.activateNavMenuBtn();
  stickyNavUI.activateStickyNav();
  buttonScrollUI.activate();
};

init();
