// import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long. Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(10)]);

    if (!res) {
      console.err("TIME IS TIMING OUT");
      throw new Error("Request timed out!");
    }
    // if getJSON meets a 404 error and there are no results, it returns null
    if (!res.ok) {
      console.log("404 ERROR");
      return null;
    }

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};
