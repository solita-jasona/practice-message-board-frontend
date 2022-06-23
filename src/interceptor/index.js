import axios from 'axios';
import store from '../store';

export default function () {
  axios.interceptors.request.use(request => {
    console.log("intercept");
    var localData = localStorage.getItem('user');
    if (localData) {
      var localDataObject = JSON.parse(localData);
      const token = localDataObject.token;
      if (token) {
        request.headers.common.Authorization = "Bearer " + token;
      }
    }
    return request;
  });

  axios.interceptors.response.use(async response => {
    return response;
  }, async error => {
    var responseUrl = error.request.responseURL;
    if (responseUrl.includes("refresh-token")) {
      await store.dispatch("app/logOut");
      return error;
    }
    if (error.response.status == 401) {
      var localData = localStorage.getItem('user');
      if (localData) {
        var localDataObject = JSON.parse(localData);
        console.log(localDataObject);
        await store.dispatch("app/refreshToken", { userId: localDataObject.userId, refreshToken: localDataObject.refreshToken.token })
      }
      else {
        await store.dispatch("app/logOut");
      }
    }
    return error;
  });
}