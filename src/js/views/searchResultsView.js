import View from "./View.js";

class SearchResultsView extends View {
  _parentEl;

  _errMessage =
    "Sorry, we couldn't find any results for your search. Try refining your query or exploring related terms!";

  _message = "";

  _contEl;

  constructor(parentElClass) {
    super();
    this._parentEl = document.querySelector(parentElClass);
  }

  _generateMarkupSearchResult(result) {
    const id = +window.location.hash.slice(1);

    console.log(id, result.id);
    return `
      <!-- search result -->
      <a class="search-result ${
        result.id === id ? "search-result-active" : ""
      }" href="#${result.id}">
        <!-- search result preview img -->
        <div class="search-result-preview-img">
          <img src="${result.primaryImageSmall}" />
        </div>
        <!-- search result preview info -->
        <div class="search-result-preview-info">
          <p class="preview-title">
            ${result.title}
          </p>
          <p class="preview-author">${result.artistDisplayName}</p>
        </div>
      </a>
    `;
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupSearchResult).join("");
  }

  /**
   * Inserts the search result queue container into the parent element and returns it for styling purposes.
   * @returns {HTMLElement} The search result queue container element.
   */
  _insertSearchResultQueueCont() {
    const queueContMarkup = `
      <!-- search result queue -->
      <div class="search-result-queue">
      </div>
      <!-- end of search result queue -->
    `;
    this._parentEl.insertAdjacentHTML("afterbegin", queueContMarkup);

    return this._parentEl.querySelector(".search-result-queue");
  }

  //~ OVERRIDNG from parent View class's render()
  render(data) {
    // recieving data to render
    this._data = data;

    console.log("THIS IS IMPORTANT INFORMATION HERE:", this._data);
    // checking to see if we have data to  use
    if(!Array.isArray(data)) return;
    if (Array.isArray(data) && data.length === 0) {
      console.log("There is nothing in the array");
      return this.renderError();
    }

    // clearing _parentEl before inserting
    this._clear();

    // inserting the search queue container
    this._contEl = this._insertSearchResultQueueCont();

    // generating markup
    const markup = this._generateMarkup();

    console.log("this is the markup: ", markup);

    // populating the container el, with the markup
    this._contEl.insertAdjacentHTML("beforeend", markup);
  }
}

export default SearchResultsView;
