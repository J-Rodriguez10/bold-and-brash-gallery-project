import View from "./View.js";


class ImgResultView extends View {
  _parentEl = document.querySelector(".search-results-cont");
  // data will contain state.imgInfo from model.js whenever render() is used
  _errMessage =
    "Sorry, we couldn't find any results for your search. Try refining your query or exploring related terms.";

  addHandlerBookmark(handler) {
    this._parentEl,
      addEventListener("click", function (e) {
        const bookmarkBtnClicked = e.target.closest(".bookmark-btn");

        if (!bookmarkBtnClicked) return;

        handler();
      });
  }

  _generateMarkup() {
    return `
  <!-- search result image container -->
  <div class="search-result-img-cont">

    <!-- search result image -->
    <div class="search-result-img" style="background-image: url(${this._data.primaryImageSmall});"></div>

    <!-- img backdrop -->
    <div class="img-backdrop"></div>
  
    <!-- bookmark button -->
    <button class="bookmark-btn">
      <i
        class="fa-solid fa-bookmark bookmark-icon-style ${(this._data.bookmarked) ? "bookmark-icon-style-active" : ""}"
      ></i>
    </button>

    <!-- reveal-info-btn -->
    <input type="checkbox" id="check" />
    <label for="check">
      <div class="reveal-info-btn">
        <i class="fa-solid fa-circle-info info-icon-style"></i>
      </div>
    </label>

    <!-- img info container -->
    <div class="img-info-cont">
      <p class="img-title">"TITLE: ${this._data.title}"</p>
      <p class="img-author">ARTIST: ${this._data.artistDisplayName}</p>
      <p class="img-objName">Object Name: ${this._data.objectName}</p>
      <p class="img-medium">
        MEDIUM: ${this._data.medium}
      </p>
      <p class="img-culture">CULTURE: ${this._data.culture}</p>
      <p class="img-date">DATE: ${this._data.objectDate}</p>
      <p class="img-dimensions">
        DIMENSTIONS: ${this._data.dimensions}
      </p>
    </div>

  </div>
  <!-- end of search result image container -->
  `;
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }
}

export default new ImgResultView();

//! bookmark-icon-style-active
