import View from "./View.js";

class BookmarksView extends View {
  _parentEl = document.querySelector(".bookmarked-search-results");
  _errMessage =
    "No bookmarks yet. Add your favorite art work to your bookmarked list";

  _message = "";

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

  // each child view must have a _generateMarkup()
  _generateMarkup() {
    return this._data.map(this._generateMarkupSearchResult).join("");
  }


}

export default new BookmarksView();

//  <!-- search result -->
//           <div class="search-result">
//             <!-- search result preview img -->
//             <div class="search-result-preview-img">
//               <img src="./src/img/search-section-img.jpg" alt="" />
//             </div>
//             <!-- search result preview info -->
//             <div class="search-result-preview-info">
//               <p class="preview-title">
//                 CAT STATUETTE INTENDED TO CONTAIN A MUMMIFIED CAT
//               </p>
//               <p class="preview-author">Unknown</p>
//             </div>
//           </div>
//           <!-- search result -->
//           <div class="search-result">
//             <!-- search result preview img -->
//             <div class="search-result-preview-img">
//               <img src="./src/img/search-section-img.jpg" alt="" />
//             </div>
//             <!-- search result preview info -->
//             <div class="search-result-preview-info">
//               <p class="preview-title">CONTAIN A MUMMIFIED CAT</p>
//               <p class="preview-author">Unknown</p>
//             </div>
//           </div>
//           <!-- search result -->
//           <div class="search-result">
//             <!-- search result preview img -->
//             <div class="search-result-preview-img">
//               <img src="./src/img/search-section-img.jpg" alt="" />
//             </div>
//             <!-- search result preview info -->
//             <div class="search-result-preview-info">
//               <p class="preview-title">
//                 CAT STATUETTE INTENDED TO CONTAIN A MUMMIFIED CAT
//               </p>
//               <p class="preview-author">Unknown</p>
//             </div>
//           </div>
//           <!-- search result -->
//           <div class="search-result">
//             <!-- search result preview img -->
//             <div class="search-result-preview-img">
//               <img src="./src/img/search-section-img.jpg" alt="" />
//             </div>
//             <!-- search result preview info -->
//             <div class="search-result-preview-info">
//               <p class="preview-title">
//                 CAT STATUETTE INTENDED TO CONTAIN A MUMMIFIED CAT
//               </p>
//               <p class="preview-author">Unknown</p>
//             </div>
//           </div>
//           <!-- search result -->
//           <div class="search-result">
//             <!-- search result preview img -->
//             <div class="search-result-preview-img">
//               <img src="./src/img/search-section-img.jpg" alt="" />
//             </div>
//             <!-- search result preview info -->
//             <div class="search-result-preview-info">
//               <p class="preview-title">
//                 CAT STATUETTE INTENDED TO CONTAIN A MUMMIFIED CAT
//               </p>
//               <p class="preview-author">Unknown</p>
//             </div>
//           </div>
//           <!-- search result -->
//           <div class="search-result">
//             <!-- search result preview img -->
//             <div class="search-result-preview-img">
//               <img src="./src/img/search-section-img.jpg" alt="" />
//             </div>
//             <!-- search result preview info -->
//             <div class="search-result-preview-info">
//               <p class="preview-title">CONTAIN A MUMMIFIED CAT</p>
//               <p class="preview-author">Unknown</p>
//             </div>
//           </div>
//           <!-- search result -->
//           <div class="search-result">
//             <!-- search result preview img -->
//             <div class="search-result-preview-img">
//               <img src="./src/img/search-section-img.jpg" alt="" />
//             </div>
//             <!-- search result preview info -->
//             <div class="search-result-preview-info">
//               <p class="preview-title">
//                 CAT STATUETTE INTENDED TO CONTAIN A MUMMIFIED CAT
//               </p>
//               <p class="preview-author">Unknown</p>
//             </div>
//           </div>
//           <!-- search result -->
//           <div class="search-result">
//             <!-- search result preview img -->
//             <div class="search-result-preview-img">
//               <img src="./src/img/search-section-img.jpg" alt="" />
//             </div>
//             <!-- search result preview info -->
//             <div class="search-result-preview-info">
//               <p class="preview-title">
//                 CAT STATUETTE INTENDED TO CONTAIN A MUMMIFIED CAT
//               </p>
//               <p class="preview-author">Unknown</p>
//             </div>
//           </div>
//           <!-- search result -->
//           <div class="search-result">
//             <!-- search result preview img -->
//             <div class="search-result-preview-img">
//               <img src="./src/img/search-section-img.jpg" alt="" />
//             </div>
//             <!-- search result preview info -->
//             <div class="search-result-preview-info">
//               <p class="preview-title">
//                 CAT STATUETTE INTENDED TO CONTAIN A MUMMIFIED CAT
//               </p>
//               <p class="preview-author">Unknown</p>
//             </div>
//           </div>
