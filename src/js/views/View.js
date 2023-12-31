// when extended, child class must have
// 1) parentEl defined
// 2) _generateMarkup() defined

export default class View {
  _data;
  _clear() {
    this._parentEl.innerHTML = "";
  }

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    // order matters, makes the info button work

    console.log("INSIDE VIEW RENDER() - data ", this._data);
    const markup = this._generateMarkup();
    console.log("INSIDE VIEW RENDER() - markup ", markup);

    console.log("INSIDE VIEW RENDER() - parentEl", this._parentEl);
    this._clear();
    this._parentEl.insertAdjacentHTML("beforeend", markup);
  }

  // instead of rendering everything, update() only re renders specefic parts that changed
  update(data) {
    this._data = data;

    console.log("INSIDE VIEW UPDATE() - data ", this._data);
    const newMarkup = this._generateMarkup();

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
