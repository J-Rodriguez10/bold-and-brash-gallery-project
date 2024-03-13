class ButtonScrollUI {
  _button;
  _targetDestination;

  constructor(buttonSelector, targetDestSelector) {
    this._button = document.querySelector(buttonSelector);
    this._targetDestination = document.querySelector(targetDestSelector);

    if (!this._button || !this._targetDestination) {
      console.error("ButtonScrollUI: Button or target element not found.");
      return;
    }
  }

  scroll() {
    this._targetDestination.scrollIntoView({ behavior: "smooth" });
  }

  activate() {
    this._button.addEventListener("click", this.scroll.bind(this));
  }
}

// Create an instance and export it
const buttonScrollUI = new ButtonScrollUI("#scroll-btn", "#scroll-destination");
export default buttonScrollUI;
