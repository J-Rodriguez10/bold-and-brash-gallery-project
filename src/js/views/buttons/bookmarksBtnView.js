class BookmarksBtnView {
  _parentEl;

  constructor(selector) {
    this._parentEl = document.querySelector(selector);
  }

  addHandlerToggle(handler) {
    this._parentEl.addEventListener("click", function (e) {
      // to make it more dynamic, you can replace "button#bookmarks" to a varaible
      const btnPressed = e.target.closest("button#bookmarks");

      // gaurd clause
      if (!btnPressed) return;

      handler();
    });
  }
}

export default BookmarksBtnView;
