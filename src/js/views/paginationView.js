import View from "./View.js";
import { MAX_SEARCH_RESULTS_AMT } from "../config.js";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".arrow");
      console.log(btn);

      // gaurd clause, to account for not pressing any buttons
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      console.log(goToPage);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const possiblePages = this._data.idsLeft;
    console.log("ids left", possiblePages);

    const currPage = this._data.currPage;

    console.log("PAGINATION VIEW, PARENT ELEMENT", this._parentEl);

    // first page: and and there are more than 10 ids left
    //  >
    if (this._data.idsLeft >= MAX_SEARCH_RESULTS_AMT && currPage === 1) {
      return `
      <button data-goto="${currPage + 1}" class="arrow right-arr">
        <p>Page ${currPage + 1}</p>
        <i class="fa-solid fa-arrow-right"></i>
      </button>`;
    }

    // last page, that is not page one
    //  <
    if (this._data.idsLeft === 0 && currPage > 1) {
      return `
      <button data-goto="${currPage - 1}"class="arrow left-arr">
        <i class="fa-solid fa-arrow-left"></i>
        <p>Page ${currPage - 1}</p>
      </button>`;
    }

    // some other page with more ids left
    //  < >
    if (this._data.idsLeft >= MAX_SEARCH_RESULTS_AMT && currPage > 1) {
      return `
      <button data-goto="${currPage - 1}" class="arrow left-arr">
        <i class="fa-solid fa-arrow-left"></i>
        <p>Page ${currPage - 1}</p>
      </button>

      <button data-goto="${currPage + 1}" class="arrow right-arr">
        <p>Page ${currPage + 1}</p>
        <i class="fa-solid fa-arrow-right"></i>
      </button>`;
    }

    // first page with no ids left
    return "";
  }
}
export default new PaginationView();

/* <!-- left/right arrows -->
        <div class="search-arrows">
          <!-- left arrow -->
          <button class="arrow left-arr">
            <i class="fa-solid fa-arrow-left"></i>
            <p>Page 1</p>
          </button>
          <!-- right arrow -->
          <button class="arrow right-arr">
            <p>Page 2</p>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>

*/
