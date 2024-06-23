import View from "./View.js";
import { MAX_SEARCH_RESULTS_AMT } from "../config.js";

class PaginationView extends View {
  _parentEl;

  constructor(parentElClass) {
    super();
    this._parentEl = document.querySelector(parentElClass);
  }

  addHandlerClick(handler) {
    this._parentEl.addEventListener("click", function (e) {
      const btn = e.target.closest(".arrow");
      console.log(btn);

      // Guard clause, to account for not pressing any buttons
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      console.log(goToPage);

      handler(goToPage);
    });
  }

  _generateMarkupFull() {
    const possibleResultsLeft = this._data.idsLeft;
    console.log("IDS LEFT: --------------", possibleResultsLeft);

    const currPage = this._data.currPage;

    const leftBtn = `
      <button data-goto="${currPage - 1}" class="arrow left-arr">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          transform="scale(-1, 1)"
        >
          <g fill="none" fill-rule="evenodd">
            <path
              d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.10-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"
            />
            <path
              fill="currentColor"
              d="M6.293 6.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414-1.414L10.586 12L6.293 7.707a1 1 0 0 1 0-1.414m6 0a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414-1.414L16.586 12l-4.293-4.293a1 1 0 0 1 0-1.414"
            />
          </g>
        </svg>
        <p>Page ${currPage - 1}</p>
      </button>`;

    const rightBtn = `
      <button data-goto="${currPage + 1}" class="arrow right-arr">
        <p>Page ${currPage + 1}</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <g fill="none" fill-rule="evenodd">
            <path
              d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"
            />
            <path
              fill="currentColor"
              d="M6.293 6.293a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414-1.414L10.586 12L6.293 7.707a1 1 0 0 1 0-1.414m6 0a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414-1.414L16.586 12l-4.293-4.293a1 1 0 0 1 0-1.414"
            />
          </g>
        </svg>
      </button>`;

    console.log("PAGINATION VIEW, PARENT ELEMENT", this._parentEl);

    // first page: and and there are more than 10 ids left
    //  >
    if (this._data.idsLeft >= MAX_SEARCH_RESULTS_AMT && currPage === 1) {
      return `${rightBtn}`;
    }

    // last page, that is not page one
    //  <
    if (this._data.idsLeft === 0 && currPage > 1) {
      return `${leftBtn}`;
    }

    // some other page with more ids left
    //  < >
    if (this._data.idsLeft >= MAX_SEARCH_RESULTS_AMT && currPage > 1) {
      return `${leftBtn} ${rightBtn} `;
    }
    // first page with no ids left
    return "";
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
export default PaginationView;

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
