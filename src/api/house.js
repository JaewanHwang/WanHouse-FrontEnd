import { apiInstance } from "./index.js";

const api = apiInstance();

function getAptsAroundCurrentPosition(params, success, fail) {
  api.get(`/houses/apts`, { params }).then(success).catch(fail);
}

export { getAptsAroundCurrentPosition };
