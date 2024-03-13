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

// APPLICATION LOGIC

const searchResultsView = new SearchResultsView(".search-results-cont");
const searchResultsViewFull = new SearchResultsView(
  ".search-results-cont-full"
);

// const searchResultsViewFull = new SearchResultsView(".bookmarks-displayer");

const bookmarksBtnViewFull = new BookmarksBtnView("#bookmarks");

const bookmarksView = new BookmarksView(".bookmarked-search-results");
const bookmarksViewFull = new BookmarksView(".search-results-cont-full", false);

console.log("JUST MAKING SURE I HAVE EVERYTHING", bookmarksViewFull);

const paginationView = new PaginationView(".pagination");
const paginationViewFull = new PaginationView(".pagination-full");

const imgResultView = new ImgResultView(".search-results-cont");
const imgResultViewFull = new ImgResultView(".image-display");

const searchView = new SearchView(".search-bar-cont");
const searchViewFull = new SearchView("#form-menu-large");

console.log("This is bookmarksView:", bookmarksView);
// console.log("This is searchViewFull:", searchViewFull);

// // space = %20
const controlImgResult = async function () {
  console.log("START CONTROL IMG RESULT-------------------");
  console.log();
  console.log();
  console.log();
  try {
    // getting hash ID from selected search result
    const imgId = window.location.hash.slice(1);

    // gaurd clause:
    if (!imgId) return;

    // rendering spinner
    imgResultView.renderSpinner();
    imgResultViewFull.renderSpinner();


    // ! WORRY ABOUT THIS WHEN SCALING ---------
    
    // updating bookmarksViewFull or searchView depending on whats currently on display
    if (bookmarksViewFull.getIsRevealed()) {
      // update bookmarks
      bookmarksViewFull.update(model.state.bookmarks);
    } else {
      // update search results container
      searchResultsViewFull.render(model.state.search.results);
    }
    bookmarksView.update(model.state.bookmarks);

    // ! WORRY ABOUT THIS WHEN SCALING ---------

    // 1) loading imgObj
    const imgObj = await model.loadImgObj(imgId);

    // 2) updating state with imgObj that will rendered
    model.updateImgObj(imgObj);

    // 3) rendering imgObj aka search result
    imgResultView.render(model.state.imgObj);
    // ^ rendering markup made for a "FULL" screen
    imgResultViewFull.render(model.state.imgObj, "FULL");

    console.log("END OF CONTROL IMG RESULT-------------------");
    console.log();
    console.log();
    console.log();
  } catch (err) {
    console.error("Error fetching data:", err.message);
    console.error(err);
    imgResultView.renderError();
    imgResultViewFull.renderError();
  }
};

const controlSearchResults = async function () {
  console.log("START CONTROL SEARCH RESULTS-------------------");
  console.log();
  console.log();
  console.log();
  try {
    // making room for search results
    bookmarksViewFull.hideBookmarks();
  
    // render spinner
    searchResultsView.renderSpinner();
    searchResultsViewFull.renderSpinner();

    // resetting state search object
    model.resetStateSearch();

    // console.log("about to enter debugger");
    // debugger;

    // 1) get search topic
    let searchTopic;

    console.log("About to get the small search topic");
    searchTopic = searchView.getSearchTopic();
    console.log("SEARCH TOPIC FOR SMALL:", searchTopic);

    if (!searchTopic) {
      console.log("ABOUT TO LOOK FOR SEARCH TOPIC IN FULL");
      searchTopic = searchViewFull.getSearchTopic();

      console.log("SEARCH TOPIC FOR FULL:", searchTopic);
    }
    // gaurd clause
    if (!searchTopic) return;

    console.log("------------------------------");

    console.log(
      "THIS IS THE EXTRACTED SEARCH TOPIC FROM SEARCH BARS:",
      searchTopic
    );

    // 3) loading and rendering search result page
    const initSearchResultsPage = await model.getSearchResultsPage(
      searchTopic,
      1
    );

    searchResultsView.render(initSearchResultsPage);
    searchResultsViewFull.render(initSearchResultsPage);

    // 4) render initial pagination
    paginationView.render(model.state.search);
    paginationViewFull.render(model.state.search, "FULL");

    console.log("END RESULT:", paginationViewFull);

    console.log("END OF CONTROL SEARCH RESULTS-------------------");
    console.log();
    console.log();
    console.log();
  } catch (err) {
    console.log(err);
  }
};

// Function to control pagination and update search results
const controlPagination = async function (goToPage) {
  console.log("START CONTROL PAGINATION-------------------");
  console.log();
  console.log();
  console.log();
  console.log("Navigating to page:", goToPage);

  bookmarksViewFull.hideBookmarks();
  // render spinner
  searchResultsView.renderSpinner();
  searchResultsViewFull.renderSpinner();

  // Step 1: Update the current page in the model for pagination purposes
  model.updateCurrPage(goToPage);

  // Step 2: Load the next search results for the specified page
  const newSearchRes = await model.loadNextSearchRes(
    model.state.search.idObj,
    goToPage
  );

  // Step 3: Update the search results in the model
  model.updateSearchResults(newSearchRes);

  // Step 4: Render the updated search results in the view
  searchResultsView.render(model.state.search.results);
  searchResultsViewFull.render(model.state.search.results);

  // Step 5: Render the new pagination based on the updated model
  paginationView.render(model.state.search);
  paginationViewFull.render(model.state.search, "FULL");
  console.log("END OF CONTROL PAGINATION-------------------");
  console.log();
  console.log();
  console.log();
};

const controlAddBookmark = function () {
  console.log("START CONTROL ADD BOOKMARKS-------------------");
  console.log();
  console.log();
  console.log();
  // gaurd clause in case state has no bookmark to add:
  if (!model.state.imgObj) return;

  // 1) add/remove bookmark
  console.log("IS IT BOOKMARKED?:", model.state.imgObj.bookmarked);
  if (!model.state.imgObj.bookmarked) {
    model.addBookmark(model.state.imgObj);
  } else {
    model.deleteBookmark(model.state.imgObj.id);
  }

  // 2) update imgResultView view
  imgResultView.update(model.state.imgObj);
  imgResultViewFull.update(model.state.imgObj, "FULL");

  // 3) render bookmarks
  bookmarksView.render(model.state.bookmarks);
  bookmarksViewFull.render(model.state.bookmarks);

  console.log("END CONTROL ADD BOOKMARKS-------------------");
  console.log();
  console.log();
  console.log();
};

const controlBookmarks = function () {
  console.log("START CONTROL BOOKMARKS-------------------");
  console.log();
  console.log();
  console.log();
  bookmarksView.render(model.state.bookmarks);
  bookmarksViewFull.render(model.state.bookmarks);
  console.log("END CONTROL BOOKMARKS-------------------");
  console.log();
  console.log();
  console.log();
};

const controlBookmarksVisibility = function () {
  console.log("START CONTROL BOOKMARKS VISIBILLITY-------------------");
  console.log();
  console.log();
  console.log();

  // rendering spinner
  bookmarksViewFull.renderSpinner();

  // Debugging logs
  console.log("Button clicked");

  // Get the current status of bookmarks visibility
  const isRevealed = bookmarksViewFull.getIsRevealed();
  console.log("Bookmarks status:", isRevealed);
  // Toggle the status for rendering: true = render, false = dont render
  bookmarksViewFull.toggleIsRevealed();
  console.log("New Bookmarks status:", bookmarksViewFull.getIsRevealed());

  // Clear the container (if necessary)
  searchResultsViewFull.clearContainer();

  if (!isRevealed) {
    // rendering based on the bookmarksView's isRevealed property
    bookmarksViewFull.render(model.state.bookmarks);
  } else {
    bookmarksViewFull.hideBookmarks();
  }

  console.log("END CONTROL BOOKMARKS VISIBILLITY-------------------");
  console.log();
  console.log();
  console.log();
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  bookmarksViewFull.addHandlerRender(controlBookmarks);

  bookmarksBtnViewFull.addHandlerToggle(controlBookmarksVisibility);
  // bookmarksViewFull.addHandlerToggle(controlRevealBookmarks);

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
};

init();

/*
<div class="error-cont">
            <p>Sorry, we couldn't find any results for your search. Try refining your query or exploring related terms.</p>
            <div class="error-img">
              <img src="./src/img/error-msg-pic.png" alt="">
            </div>
            
</div>




    <!-- search result queue -->
          <div class="search-result-queue">
            <!-- search result -->
            <a class="search-result" href="#545971">
              <!-- search result preview img -->
              <div class="search-result-preview-img">
                <img src="./src/img/search-section-img.jpg" alt="" />
              </div>
              <!-- search result preview info -->
              <div class="search-result-preview-info">
                <p class="preview-title">
                  CAT STATUETTE INTENDED TO CONTAIN A MUMMIFIED CAT
                </p>
                <p class="preview-author">Unknown</p>
              </div>
            </a>
          </div>
          <!-- end of search result queue -->






*/
