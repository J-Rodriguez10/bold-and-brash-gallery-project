import View from "./View.js";

class BookmarksView extends View {
  _parentEl;

  _isRevealed;

  _errMessage =
    "Welcome, start browsing for your favorite works. Bookmarked pieces will appear here!";

  _message = "";

  constructor(parentElClass, isRevealed = true) {
    super();
    this._parentEl = document.querySelector(parentElClass);
    this._isRevealed = isRevealed;
  }

  getIsRevealed() {
    return this._isRevealed;
  }

  toggleIsRevealed() {
    this._isRevealed = !this._isRevealed;
  }

  hideBookmarks() {
    this.clearContainer();
    this._isRevealed = false;
  }

  // ~ OVERRIDING FROM VIEWS CLASS
  render(data, markupType = null) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    // if isRevealed is false, we dont need to render anything

    if (!this._isRevealed) return;

    this._data = data;
    // order matters, makes the info button work

    console.log("INSIDE VIEW RENDER() - data ", this._data);

    // generating markup based on markupType
    let markup;

    if (markupType && markupType.trim().toUpperCase() === "FULL") {
      markup = this._generateMarkupFull();
    } else {
      markup = this._generateMarkup();
    }

    console.log("RENDER() - THE MARKUP GENERATED AND BEING RENDERED: ", markup);

    console.log("INSIDE VIEW RENDER() - parentEl", this._parentEl);
    this._clear();
    this._parentEl.insertAdjacentHTML("beforeend", markup);
  }

  // ~ OVERRIDING FROM VIEWS CLASS
  update(data, markupType = null) {
    // gaurd clause
    if (!this._isRevealed) return;

    this._data = data;

    // generating markup based on markupType
    let newMarkup;
    if (markupType && markupType.trim().toUpperCase() === "FULL") {
      newMarkup = this._generateMarkupFull();
    } else {
      newMarkup = this._generateMarkup();
    }
    // converts string to DOM html element
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // array of nodes - updated version
    const newElements = Array.from(newDOM.querySelectorAll("*"));

    // array of nodes - old version
    const currElements = Array.from(this._parentEl.querySelectorAll("*"));

    // Compare the updated and old version, to see what needs to be changed. The old version (currElements) gets mutated
    newElements.forEach((newEl, i) => {
      // Get the corresponding element from the current DOM
      const curEl = currElements[i];

      // Log whether the current and new elements are equal
      // console.log("Comparing elements:", curEl, newEl.isEqualNode(curEl));

      // Check if nodes are different AND if the new node contains non-empty text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        // Update the text content of the current element with the new element's text content
        curEl.textContent = newEl.textContent;
      }

      // Update changed attributes
      if (!newEl.isEqualNode(curEl)) {
        // Loop through the attributes of the new element and set them on the current element
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkupSearchResult(result) {
    const id = +window.location.hash.slice(1);

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
}

export default BookmarksView;