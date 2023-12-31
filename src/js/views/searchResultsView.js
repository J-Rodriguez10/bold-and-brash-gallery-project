import View from "./View.js";

class SearchResultsView extends View {
  _parentEl = document.querySelector(".search-results-cont");
  _errMessage =
    "Sorry, we couldn't find any results for your search. Try refining your query or exploring related terms.";

  _message = "";

  _contEl;

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
  // each child view must have a _generateMarkup()
  _generateMarkup() {
    return this._data.map(this._generateMarkupSearchResult).join("");
  }

  _insertSearchResultQueueCont() {
    const queueContMarkup = `
      <!-- search result queue -->
      <div class="search-result-queue">
      </div>
      <!-- end of search result queue -->
    `;
    this._parentEl.insertAdjacentHTML("afterbegin", queueContMarkup);

    return document.querySelector(".search-result-queue");
  }

  //~ OVERRIDNG parent View class render()
  render(data) {
    // recieving data to render
    this._data = data;

    console.log("THIS IS THE RECIEVING DATA", this._data);
    // checking to see if we have data to  use
    if (!data || (Array.isArray(data) && data.length === 0)) {
      console.log("There is nothing in the array");
      return this.renderError();
    }

    // clearing _parentEl before inserting
    this._clear();

    // inserting the search queue container
    this._contEl = this._insertSearchResultQueueCont();

    // populating search queue continer w/ search results

    // ^ checking to see if queue cont is inside
    console.log("queue container is inside", this._contEl);

    // generating markup
    const markup = this._generateMarkup();

    console.log("this is the markup: ", markup);

    // populating the container el, with the markup
    this._contEl.insertAdjacentHTML("beforeend", markup);
  }
}

export default new SearchResultsView();
