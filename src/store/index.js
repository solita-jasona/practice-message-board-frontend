import { createStore } from 'vuex'
import axios from 'axios';
import router from '../router';
const backendURL = process.env.VUE_APP_BACKEND_URL;
const app = {
  namespaced: true,
  state: {
    user: null,
    topics: null,
    messages: null,
    currentTopic: null
  },
  mutations: {
    updateUser(state, user) {
      state.user = user;
    },
    updateTopics(state, topics) {
      state.topics = topics;
    },
    updateCurrentTopic(state, topic) {
      state.currentTopic = topic;
    },
    updateMessages(state, messages) {
      state.messages = messages;
    }
  },
  actions: {
    async login(context, payLoad) {
      const url = backendURL + "api/Auth/login";
      var { data } = await axios.post(url, payLoad);
      if (data) {
        console.log("in login action", data);
        localStorage.setItem('user', JSON.stringify(data));
        context.commit("updateUser", { userId: data.userId, username: data.username, userEmail: data.userEmail, role: data.role });
        return true;
      }
    },
    async logOut(context) {
      localStorage.removeItem('user');
      context.commit("updateUser", null);
      router.replace("/");
    },
    async checkLogin(context) {
      var localData = localStorage.getItem('user');
      if (localData) {
        var localDataObject = JSON.parse(localData);
        if (!localDataObject.username || !localDataObject.userId || !localDataObject.userEmail || !localDataObject.role || !localDataObject.token) {
          await context.dispatch("logOut");
          return false;
        }
        context.commit("updateUser", { userId: localDataObject.userId, username: localDataObject.username, userEmail: localDataObject.userEmail, role: localDataObject.role });
        await context.dispatch("checkUser");
      }
      else {
        await context.dispatch("logOut");
      }
    },
    async refreshToken(context, payLoad) {
      const url = backendURL + "api/Auth/refresh-token";
      var { data } = await axios.post(url, payLoad);
      if (data) {
        await localStorage.setItem('user', JSON.stringify(data));
        await context.commit("updateUser", { userId: data.userId, username: data.username, userEmail: data.userEmail, role: data.role });
        return data;
      }
    },
    async checkUser(context) {
      const url = backendURL + "api/User/current";
      var { data } = await axios.get(url);
      console.log("current", data);
      if (data) {
        await context.commit("updateUser", { userId: data.id, username: data.username, userEmail: data.userEmail, role: data.role.name });
        return true;
      }
    },
    async register(context, payLoad) {
      const url = backendURL + "api/Auth/register";
      var { data } = await axios.post(url, payLoad);
      if (data) {
        console.log("in register action", data);
        return true;
      }
    },
    async getTopics(context) {
      const url = backendURL + "api/Topic/all";
      var { data } = await axios.get(url);
      if (data) {
        console.log("in getTopics action", data);
        context.commit("updateTopics", data)
      }
    },
    async createTopic(context, payLoad) {
      const url = backendURL + "api/Topic/add";
      var { data } = await axios.post(url, payLoad);
      if (data) {
        console.log("in addTopics action", data);
        return data;
      }
    },
    async editTopic(context, payLoad) {
      const url = backendURL + "api/Topic/update";
      var { data } = await axios.put(url, payLoad);
      if (data) {
        console.log("in editTopics action", data);
        return data;
      }
    },
    async deleteTopic(context, id) {
      const url = backendURL + "api/Topic/delete/" + id;
      var { data } = await axios.delete(url);
      if (data) {
        console.log("in deleteTopic action", data);
        return data;
      }
    },
    async setCurrentTopic(context, topic) {
      await context.commit("updateCurrentTopic", topic);
    },
    async getCurrentTopic(context, id) {
      const url = backendURL + "api/Topic/single/" + id;
      var { data } = await axios.get(url);
      if (data) {
        console.log("in getCurrentTopic action", data);
        await context.commit("updateCurrentTopic", data);
        return data;
      }
    },
    async getMessages(context, id) {
      const url = backendURL + "api/Message/byTopic/" + id;
      var { data } = await axios.get(url);
      if (data) {
        console.log("in getMessages action", data);
        context.commit("updateMessages", data);
        return data;
      }
    },
    async addMessage(context, payLoad) {
      const url = backendURL + "api/Message/add"
      var { data } = await axios.post(url, payLoad);
      if (data) {
        console.log("in addMessage action", data);
        return data;
      }
    },
    async editMessage(context, payLoad) {
      const url = backendURL + "api/Message/update";
      var { data } = await axios.put(url, payLoad);
      if (data) {
        console.log("in editMessage action", data);
        return data;
      }
    },
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