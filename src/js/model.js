import {
  ID_OBJ_API_URL,
  IMG_OBJ_API_URL,
  MAX_SEARCH_RESULTS_AMT,
} from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
  imgObj: {
    // ^ Example of the data contained:
    // artistDisplayName: "Saint James's Factory"
    //^ bookmarked: false
    // classification: "Ceramics-Porcelain"
    // culture: ""
    // dimensions: "Overall: 3 × 1 1/2 in. (7.6 × 3.8 cm)"
    // id: 203392
    // medium: "Soft-paste porcelain"
    // objectDate: "ca. 1755"
    // objectName: "Toy"
    // primaryImage: "https://images.metmuseum.org/CRDImages/es/original/DP-247-001.jpg"
    // primaryImageSmall: "https://images.metmuseum.org/CRDImages/es/web-large/DP-247-001.jpg"
    // title: "Cat"
  },
  search: {
    searchTopic: "",
    idObj: {},
    idsLeft: 0,
    results: [],
    indexArr: [0],
    currPage: 1,
  },
  bookmarks: [],
};

export const resetStateSearch = function () {
  state.search.searchTopic = "";
  state.search.idObj = {};
  state.search.idsLeft = 0;
  state.search.results = [];
  state.search.indexArr = [0];
  state.search.currPage = 1;
};

export const updateCurrPage = function (newCurrPage) {
  state.search.currPage = newCurrPage;
};

export const updateSearchResults = function (newSearchRes) {
  state.search.results = newSearchRes;
};


export const loadIdObj = async function (searchTopic) {
  try {
    const idObjUrl = `${ID_OBJ_API_URL}${searchTopic}$`;

    console.log("This is the idObj URL:", idObjUrl);

    const idObj = await getJSON(idObjUrl);

    // gaurd clause just in case there are no ids
    if (idObj.total === 0) {
      console.log("There are no search results");
      return null;
    }

    state.search.idObj = idObj;

    console.log("WE DO HAVE AN ID OBJ!!!", state.search.idObj);

    // gaurd clause just in case there are no ids
    if (idObj.total === 0) {
      return console.log("There are no search results");
    }

    // before returning the id obj, saving the length of the id obj to the state for the pagination feat.
    state.search.idsLeft = idObj.total;

    return idObj;
  } catch (err) {
    console.error("ERROR LOADING SEARCH RESULTS", err.message);
    throw err;
  }
};

//NOTE: only returns imgObj that are in public domain, these contain images that are displayable
export const loadImgObj = async function (imgId) {
  try {
    const imgObjUrl = `${IMG_OBJ_API_URL}${imgId}`;

    const imgObj = await getJSON(imgObjUrl);

    if (!imgObj) {
      console.log("404 ERROR, THAT ID HAS NOTHING TO IT", imgObj);
      return null;
    }

    // console.log("this is the raw data:", imgObj.title, imgObj);

    if (!imgObj.isPublicDomain) {
      console.log("this is NOT public domain");
      return null;
    }

    console.log("THIS PASSED ALL CHECKS!!!");
    return imgObj;
  } catch (err) {
    console.error("ERROR MESSAGE:", err.message);
    throw err;
  }
};

export const updateImgObj = function (imgObj) {
  state.imgObj = {
    medium: imgObj.medium,
    dimensions: imgObj.dimensions,
    classification: imgObj.classification,
    objectDate: imgObj.objectDate,
    title: imgObj.title,
    artistDisplayName: imgObj.artistDisplayName,
    culture: imgObj.culture,
    primaryImageSmall: imgObj.primaryImageSmall,
    primaryImage: imgObj.primaryImage,
    objectName: imgObj.objectName,
    id: imgObj.objectID,
  };

  if (state.bookmarks.some((bookmark) => bookmark.id === state.imgObj.id)) {
    state.imgObj.bookmarked = true;
  } else {
    state.imgObj.bookmarked = false;
  }

  console.log("HERE", state.imgObj);
};

const _returnFilteredImgObj = function (imgObj) {
  const filteredInfo = {
    medium: imgObj.medium,
    dimensions: imgObj.dimensions,
    classification: imgObj.classification,
    objectDate: imgObj.objectDate,
    title: imgObj.title,
    artistDisplayName: imgObj.artistDisplayName,
    culture: imgObj.culture,
    primaryImageSmall: imgObj.primaryImageSmall,
    primaryImage: imgObj.primaryImage,
    objectName: imgObj.objectName,
    id: imgObj.objectID,
  };

  return filteredInfo;
};

export const loadNextSearchRes = async function (idObj, currPage) {
  let currI = state.search.indexArr[currPage - 1];
  const searchResProArr = [];

  console.log("STARTING TO SEARCH !!!");

  for (let i = currI; i < idObj.objectIDs.length; i++) {
    const searchResPro = await loadImgObj(idObj.objectIDs[i]);

    // if search result is null, it didnt pass the check - skip iteration
    if (searchResPro === null) {
      console.log("EITHER ITS NOT PUBLIC DOMAIN OR 404 ERROR");
      console.log("-------------------------");
      continue;
    }

    // if there is a valid search result promise, add it to arr
    if (searchResPro) {
      console.log(
        `OBJECT ID ${idObj.objectIDs[i]} ADDED TO ARRAY`,
        searchResProArr.length
      );
      searchResProArr.push(searchResPro);
      console.log("-------------------------");
    }

    if (
      searchResProArr.length === MAX_SEARCH_RESULTS_AMT ||
      i === idObj.objectIDs.length - 1
    ) {
      // returning search results
      console.log("IM ABOUT TO RETURN ARR");

      // update indexArr
      state.search.indexArr.push(i);
      console.log("Updating index Arr", state.search.indexArr);

      // update the amount of ids left - for pagination purposes
      console.log("BEFORE", state.search.idsLeft);
      state.search.idsLeft -= i;
      console.log("THIS IS WHAT YOU LOOKING FORR!!", state.search.idsLeft);

      return Promise.all(
        searchResProArr.map((imgObj) => _returnFilteredImgObj(imgObj))
      );
    }
  }
};

export const getSearchResultsPage = async function (searchTopic, page) {
  try {
    // updating current page in the state
    state.search.currPage = page;

    // saving search topic in case needed for future use
    state.search.searchTopic = searchTopic;

    // load id object and store it in the state
    const idObj = await loadIdObj(searchTopic);

    // loading search results
    const imgObjArr = await loadNextSearchRes(
      state.search.idObj,
      state.search.currPage
    );

    // saving imgObjArr - the search results, into state
    state.search.results = imgObjArr;

    console.log(
      "returning the search results to be rendered :",
      state.search.results
    );

    // RETURNING THE SEARCH RESULTS
    return imgObjArr;
  } catch {
    console.log("OOPSIES");
  }
};


const persistBookmarks= function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const addBookmark = function (imgObj) {
  console.log("IM SUPPOSEDD TO ADD THIS IMG OBJ TO THE STATE BOOKMARKS", imgObj);

  // gaurd clause
  if(!imgObj) return;

  // add bookmark
  state.bookmarks.push(imgObj);
  // mark current imgObj as bookmarked
  if (imgObj.id === state.imgObj.id) state.imgObj.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  console.log("SUPPOSED TO DELETE ");
  const index = state.bookmarks.findIndex((imgObj) => imgObj.id === id);
  // splice mutates original arr
  state.bookmarks.splice(index, 1);

  // unmarking current imgObj from bookmarks
  if (id === state.imgObj.id) state.imgObj.bookmarked = false;

  persistBookmarks();
};

const init = function() {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);

}

init();
console.log(state.bookmarks);