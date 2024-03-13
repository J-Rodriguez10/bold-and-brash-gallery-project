class SearchView {
  _parentEl;

  constructor(parentElClassOrId) {
    if (parentElClassOrId.startsWith(".")) {
      // assume it's a class
      this._parentEl = document.querySelector(parentElClassOrId);
    } else if (parentElClassOrId.startsWith("#")) {
      // assume it's an id
      this._parentEl = document.getElementById(parentElClassOrId.slice(1));
    } else {
      // Otherwise, treat it as is
      this._parentEl = document.querySelector(parentElClassOrId);
    }
  }

  getSearchTopic() {
    const topicInput = this._parentEl.querySelector("input[type='text']");
    const topic = topicInput ? topicInput.value : "";

    console.log("This is the topic:", topic);

    this._clearInput();

    return topic;
  }

  _clearInput() {
    // const topicInput = this._parentEl.querySelector("input[type='text']");
    this._parentEl.querySelector("input[type='text']").value = "";
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default SearchView;
