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

function getSearchedResult(params, success, fail) {
  return api
    .get(`/houses/apts`, {
      params: params,
      headers: {
        "access-token": sessionStorage.getItem("access-token"),
      },
    })
    .then(success)
    .catch(fail);
}

function postLikeThisApt(aptCode, success, fail) {
  return api
    .post(`http://localhost:8080/houses/like/${aptCode}`, null, {
      headers: {
        "access-token": sessionStorage.getItem("access-token"),
      },
    })
    .then(success)
    .catch(fail);
}

function postUnlikeThisApt(aptCode, success, fail) {
  return api
    .delete(`http://localhost:8080/houses/unlike/${aptCode}`, {
      headers: {
        "access-token": sessionStorage.getItem("access-token"),
      },
    })
    .then(success)
    .catch(fail);
}

export {
  getAptsAroundCurrentPosition,
  getDetailedAptInfo,
  getSearchedResult,
  postLikeThisApt,
  postUnlikeThisApt,
};
