import { apiInstance } from "./index.js";

const api = apiInstance();

function getAptsAroundCurrentPosition(params, success, fail) {
  return api
    .get(`/houses/apts`, {
      params,
      headers: {
        "access-token": sessionStorage.getItem("access-token"),
      },
    })
    .then(success)
    .catch(fail);
}

function getDetailedAptInfo(aptCode, success, fail) {
  return api
    .get(`/houses/apts/${aptCode}`, {
      headers: {
        "access-token": sessionStorage.getItem("access-token"),
      },
    })
    .then(success)
    .catch(fail);
}

function getSearchedResult(keyword, success, fail) {
  return api
    .get(`/houses/apts`, {
      params: {
        keyword,
      },
      headers: {
        "access-token": sessionStorage.getItem("access-token"),
      },
    })
    .then(success)
    .catch(fail);
}

export { getAptsAroundCurrentPosition, getDetailedAptInfo, getSearchedResult };
