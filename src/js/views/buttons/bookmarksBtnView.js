class BookmarksBtnView {
  _parentEl;

  constructor(selector) {
    this._parentEl = document.querySelector(selector);
  }

  // toggleBookmarks(state) {
  //   const sanitizedState = state.trim().toLowerCase();

  //   if (sanitizedState === "on") {
  //     return true;
  //   } else if (sanitizedState === "off") {
  //     return false;
  //   } else {
  //     throw new Error("State variable for the Bookmarks container is invalid");
    // }
  // }

  addHandlerToggle(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btnPressed = e.target.closest("button#bookmarks");
      // gaurd clause
      if (!btnPressed) return;
      handler();
    });
  }
}

export default BookmarksBtnView;
