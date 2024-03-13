/**
 * every child class that extends View needs to have:
 * _parentEl
 * _generateMarkup()
 */

export default class View {
  _data;
  _clear() {
    this._parentEl.innerHTML = "";
  }

  clearContainer() {
    this._clear();
  }

  /**
   * Renders the data onto the view.
   * @param {any} data The data to render.
   * @param {string} [markupType=null] The type of markup to generate (optional).
   * @returns {void}
   */
  render(data, markupType = null) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;

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

  /**
   * Updates the view with new data, re-rendering specific parts that changed.
   * @param {any} data The new data to update the view with.
   * @param {string} [markupType=null] The type of markup to generate (optional).
   * @returns {void}
   */
  update(data, markupType = null) {
    this._data = data;

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

  renderSpinner() {
    console.log("spinner is rendering");
    const spinnerMarkup = `
      <div class="loading-screen">
        <div class="spinner-cont">
          <div class="spinner"></div>
        </div>
      </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", spinnerMarkup);
  }

  renderError(errMessage = this._errMessage) {
    const errMarkup = `
    <div class="error-cont">
      <p>${errMessage}</p>
      <div class="error-img">
        <img src="./src/img/error-msg-pic.png">
      </div>
    </div>
    `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", errMarkup);
  }
}
