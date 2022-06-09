import { createStore } from 'vuex'
import axios from 'axios';

const backendURL = process.env.VUE_APP_BACKEND_URL;
const app = {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    updateUser(state, user) {
      state.user = user;
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
          return data;
        }
      }
      catch(error) {
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
    }
    
  },
  getters: {
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