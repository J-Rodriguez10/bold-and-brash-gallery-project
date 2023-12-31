class SearchView {
  _parentEl = document.querySelector(".search-bar-cont");

  getSearchTopic() {
    console.log("1", this._parentEl);
    console.log("2", this._parentEl.querySelector(".search-topic"));
    console.log("3", this._parentEl.querySelector(".search-topic").value);

    const topic = this._parentEl.querySelector(".search-topic").value;

    
    this._clearInput();

    return topic;
  }

  _clearInput() {
    this._parentEl.querySelector(".search-topic").value = "";
  }

  addHandlerSearch(handler) {
    console.log("event handler add");
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
