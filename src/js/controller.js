import * as model from "./model.js";
import imgResultView from "./views/imgResultView.js";
import searchView from "./views/searchView.js";
import searchResultsView from "./views/searchResultsView.js";
import bookmarksView from "./views/bookmarksView.js";
import paginationView from "./views/paginationView.js";

import buttonAnimationsUI from "./ui/buttonAnimationsUI.js";
import navButtonUI from "./ui/navButtonUI.js";
import stickyNavUI from "./ui/stickyNavUI.js";

// APPLICATION LOGIC

/*  
======================
Picture Code
======================
*/

// // space = %20
const controlImgResult = async function () {
  try {
    // getting hash ID from selected search result
    const imgId = window.location.hash.slice(1);

    // gaurd clause:
    if (!imgId) return;
    imgResultView.renderSpinner();

    // 0) updating imgResult view to mark select art work
    // ! WORRY ABOUT THIS WHEN SCALING ---------
    // updating search results view to mark active serach result
    // searchResultsView.update(model.state.results);
    bookmarksView.update(model.state.bookmarks);
    // ! WORRY ABOUT THIS WHEN SCALING ---------

    // 1) loading imgObj
    const imgObj = await model.loadImgObj(imgId);

    // 2) updating state with imgObh that will rendered
    model.updateImgObj(imgObj);

    // 3) rendering imgObj aka search result
    imgResultView.render(model.state.imgObj);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    console.error(err);
    imgResultView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // render spinner
    searchResultsView.renderSpinner();

    // resetting state search object
    model.resetStateSearch();

    console.log("about to enter debugger");
    debugger;
    // 1) get search topic
    const searchTopic = searchView.getSearchTopic();

    console.log("HERE IS THE SEARCH TOPIC:", searchTopic);
    // 2) gaurd clause
    if (!searchTopic) return;

    console.log("IM ENTERING THE CRAZY STUFF");
    console.log("------------------------------");

    // 3) loading and rendering search result page
    searchResultsView.render(await model.getSearchResultsPage(searchTopic, 1));

    // 4) render initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

// Function to control pagination and update search results
const controlPagination = async function (goToPage) {
  console.log("Navigating to page:", goToPage);
  // render spinner
  searchResultsView.renderSpinner();

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

  // Step 5: Render the new pagination based on the updated model
  paginationView.render(model.state.search);
};

const controlAddBookmark = function () {
  // 1) add/remove bookmark
  if (!model.state.imgObj.bookmarked) {
    model.addBookmark(model.state.imgObj);
  } else {
    model.deleteBookmark(model.state.imgObj.id);
  }

  // 2) update imgResultView view
  imgResultView.update(model.state.imgObj);

  // 3) render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  imgResultView.addHandlerRender(controlImgResult);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  imgResultView.addHandlerBookmark(controlAddBookmark);

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
