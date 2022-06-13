import { createStore } from 'vuex'
import axios from 'axios';

const backendURL = process.env.VUE_APP_BACKEND_URL;
const app = {
  namespaced: true,
  state: {
    user: null,
    topics: null
  },
  mutations: {
    updateUser(state, user) {
      state.user = user;
    },
    updateTopics(state, topics) {
      state.topics = topics;
    }
  },
  actions: {
    async login(context, payLoad) {
      try 
      {
        const url = backendURL + "api/Auth/login";
        var {data} = await axios.post(url, payLoad);
        if (data) {
          console.log("in login action", data);
          localStorage.setItem('user', JSON.stringify(data));
          context.commit("updateUser", {userId: data.userId,username: data.username, userEmail: data.userEmail, role: data.role});
          return true;
        }
      }
      catch(error) {
        console.log(error);
        if (error.response.status == 400) {
          return "User not found or wrong password"
        }
        else {
          return "Something went wrong, please try again later";
        }
      }
      
    },
    async logOut(context) {
      localStorage.removeItem('user');
      context.commit("updateUser", null);
    },
    async checkLogin(context) {
      var localData = localStorage.getItem('user');
      console.log(localData);
      if (localData) {
        var localDataObject = JSON.parse(localData);
        console.log(localDataObject);
        if (!localDataObject.username || !localDataObject.userId || !localDataObject.userEmail || !localDataObject.role || !localDataObject.token) {
          context.dispatch("logOut");
        }
        console.log(context)
        context.commit("updateUser", {userId: localDataObject.userId, username: localDataObject.username, userEmail: localDataObject.userEmail, role: localDataObject.role});
      }
      else {
        context.dispatch("logOut");
      }
    },
    async register(context, payLoad) {
      try 
      {
        const url = backendURL + "api/Auth/register";
        var {data} = await axios.post(url, payLoad);
        if (data) {
          console.log("in register action", data);
          return true;
        }
      }
      catch(error) {
        console.log(error);
        if (error.response.data == "username exists") {
          return "User with submitted username or email exists"
        }
        else {
          return "Something went wrong, please try again later";
        }

      }
    },
    async getTopics(context) {
      try 
      {
        const url = backendURL + "api/Topic/all";
        var {data} = await axios.get(url);
        if (data) {
          console.log("in getTopics action", data);
          context.commit("updateTopics", data)
        }
      }
      catch(error) {
        console.log(error)
      }
    }
  }
};


export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    app
  }
})