import { apiInstance } from "./index.js";

const api = apiInstance();

function listBoard(param, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  api.get(`/board`, { params: param }).then(success).catch(fail);
}

function writeBoard(board, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  api.post(`/board`, JSON.stringify(board)).then(success).catch(fail);
}

function getBoard(boardno, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  api.get(`/board/${boardno}`).then(success).catch(fail);
}

function modifyBoard(board, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  api
    .put(`/board/${board.boardno}`, JSON.stringify(board))
    .then(success)
    .catch(fail);
}

function deleteBoard(boardno, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  api.delete(`/board/${boardno}`).then(success).catch(fail);
}

export { listBoard, writeBoard, getBoard, modifyBoard, deleteBoard };
