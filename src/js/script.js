/*  
======================
Nav Toggle Menu Button
======================
*/

// const toggleBtn = document.querySelector(".toggle-bars");
// const exitBtn = document.querySelector(".x-icon");
// const navMenu = document.querySelector(".nav-toggle-menu");
// const navMenuCont = document.querySelector(".nav-toggle-menu-cont");

// const toggleBackDrop = () => {
//   navMenuCont.classList.toggle("backdrop");
// };

// toggleBtn.addEventListener("click", function () {
//   console.log("You pressed the bars");
//   toggleBackDrop();
//   navMenu.style.transform = "translateX(0px)";
// });

// exitBtn.addEventListener("click", function () {
//   console.log("You pressed the x");
//   toggleBackDrop();
//   navMenu.style.transform = "translateX(-400px)";
// });
/*  
======================
Sticky Nav
======================
*/
const header = document.querySelector(".header");
const navbar = document.querySelector(".navbar");
const navHeight = navbar.getBoundingClientRect().height;
// console.log(header);

const stickyNav = (entries) => {
  const [entry] = entries;
  // console.log(entry);

  !entry.isIntersecting
    ? navbar.classList.add("pos-fixed")
    : navbar.classList.remove("pos-fixed");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

/*  
======================
Clear Button Animation
======================
*/
// const btnClearArr = document.querySelectorAll(".btn-clear");
// console.log(btnClearArr);
// const root = document.documentElement;

// btnClearArr.forEach((btnClear) => {
//   btnClear.addEventListener("mouseover", function () {
//     console.log("hovered in");
//     this.style.setProperty("--btn-clear-span-width", "30%");
//   });

//   btnClear.addEventListener("mouseout", function () {
//     console.log("hovered out");
//     this.style.setProperty("--btn-clear-span-width", "15%");
//   });
// });

/*  
======================
Spinner
======================
*/

const renderSpinner = function (parentEl) {
  const markup = `
    <div class="loading-screen">
      <div class="spinner-cont">
        <div class="spinner"></div>
      </div>
    </div>
  `;
  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", markup);
};

/*  
======================
Picture Code
======================
*/
const searchResultsCont = document.querySelector(".search-results-cont");

const searchTopic = "cat";

// const searchTopicUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchTopic}`;

// // space = %20

// const fetchIdObjFromSearch = async function (searchTopicUrl) {
//   try {
//     //first phase
//     const res = await fetch(searchTopicUrl);

//     if (!res.ok) {
//       throw new Error(`HTTP error! Status: ${res.status}`);
//     }

//     const idObj = await res.json();
//     return idObj;
//   } catch (err) {
//     console.error("Error fetching data:", err.message);
//     throw err;
//   }
// };

// const fetchImgObjFromId = async function (imgIdUrl) {
//   try {
//     const res = await fetch(imgIdUrl);

//     if (!res.ok) {
//       throw new Error(`HTTP error 2! Status: ${res.status}`);
//     }
//     const imgObj = await res.json();
//     return imgObj;
//   } catch (err) {
//     console.error("Error fetching data:", err.message);
//     throw err;
//   }
// };

// const filterObjectProperties = function (imgObj) {
//   const {
//     medium,
//     dimensions,
//     classification,
//     objectDate,
//     title,
//     artistDisplayName,
//     culture,
//     primaryImageSmall,
//     primaryImage,
//     objectName,
//   } = imgObj;

//   const filteredObj = {
//     medium,
//     dimensions,
//     classification,
//     objectDate,
//     title,
//     artistDisplayName,
//     culture,
//     primaryImageSmall,
//     primaryImage,
//     objectName,
//   };

//   return filteredObj;
// };

const resetContainer = (parrentEl) => {
  parrentEl.innerHTML = "";
};

const renderImgInfoCont = function (filteredObj) {
  console.log("searchResultsCont: ", searchResultsCont);

  const markup = `
  <!-- search result image container -->
  <div class="search-result-img-cont">

    <!-- search result image -->
    <div class="search-result-img" style="background-image: url(${filteredObj.primaryImageSmall});"></div>
    <!-- img backdrop -->
    <div class="img-backdrop"></div>
    <!-- bookmark button -->
    <button class="bookmark-btn">
      <i
        class="fa-solid fa-bookmark bookmark-icon-style bookmark-icon-style-active"
      ></i>
    </button>
    <!-- reveal-info-btn -->
    <input type="checkbox" id="check" />
    <label for="check">
      <div class="reveal-info-btn">
        <i class="fa-solid fa-circle-info info-icon-style"></i>
      </div>
    </label>
    <!-- img info container -->
    <div class="img-info-cont">
      <p class="img-title">"TITLE: ${filteredObj.title}"</p>
      <p class="img-author">ARTIST: ${filteredObj.artistDisplayName}</p>
      <p class="img-objName">Object Name: ${filteredObj.objectName}</p>
      <p class="img-medium">
        MEDIUM: ${filteredObj.medium}
      </p>
      <p class="img-culture">CULTURE: ${filteredObj.culture}</p>
      <p class="img-date">DATE: ${filteredObj.objectDate}</p>
      <p class="img-dimensions">
        DIMENSTIONS: ${filteredObj.dimensions}
      </p>
    </div>
  </div>
  <!-- end of search result image container -->
  `;

  console.log("this is markup: ", markup);

  // order matters, makes the info button work
  resetContainer(searchResultsCont);
  searchResultsCont.insertAdjacentHTML("beforeend", markup);
};

const fetchData = async function () {
  try {
    // if (searchResultsCont.innerHTML != "") return;
    renderSpinner(searchResultsCont);
    //first fetch
    // const idObj = await fetchIdObjFromSearch(searchTopicUrl);

    // getting a random ID
    const imgId = window.location.hash.slice(1);

    // gaurd clause:
    if (!imgId) return;

    // let imgId = idObj.objectIDs[4];
    // console.log("idObj", idObj);

    // getting URL from ID
    // const imgIdUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${imgId}`;


    //second fetch
    // const imgObj = await fetchImgObjFromId(imgIdUrl);
    // console.log("imgObj: ", imgObj);

    // filtering data
    // const filteredObj = filterObjectProperties(imgObj);

    // placing the img url in the container
    renderImgInfoCont(filteredObj);
    
  } catch (err) {
    console.error("Error fetching data:", err.message);
  }
};

// fetchData();



["hashchange", "load"].forEach(ev => window.addEventListener(ev, fetchData));


window.addEventListener("hashchange", fetchData);




// title: "Dog"

// objectDate: "second half 18th century"

// classification: "Crèche"

// dimensions: "H. 4 1/8 in. (10.5 cm.)"

// .medium: "Polychromed terracotta body; glass eyes; leather colla

// helper method

/*
            





   <!-- img info container -->
            <!-- <div class="img-info-cont">
              <p class="img-title">"Dagger with Scabbard"</p>
              <p class="img-author">AUTHOR: Wolf Paller</p>
              <p class="img-medium">
                MEDIUM: Steel, silver, ray skin, leather, wood
              </p>
              <p class="img-culture">CULTURE: German, Dresden</p>
              <p class="img-date">DATE: ca. 1575</p>
              <p class="img-dimensions">
                DIMENSTIONS: L. 15 1/8 in. (38.4 cm); Wt. (with sheath) 1 lb. 6
                oz. (624 g)
              </p>
            </div> -->


*/
