<template>
  <nav>
    <router-link to="/">Topics</router-link>
    <router-link to="/login" v-if="!user">Login</router-link>
    <router-link to="/register" v-if="!user">Register</router-link>
    <router-link to="/add-topic" v-if="user">Add Topic</router-link>
    <a href="#" @click="logOut" v-if="user">Logout</a>
  </nav>
  <router-view/>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      user: (state) => state.app.user,
    }),
  },
  data() {
    return {
    };
  },
  mounted() {
    const self = this;
    self.$store.dispatch("app/checkLogin");
  },
  methods: {
    logOut() {
      const self = this;
      console.log("logout");
      self.$store.dispatch("app/logOut");
      self.$router.push("/");
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  background-color: #D5DCE8
}

.page-content {
  padding: 0px 5px 0px 5px;
}

nav {
  padding: 30px;
  background-color: #2C4770;
}

nav a {
  font-weight: bold;
  color: #A6B5CB;
  text-decoration: none;
  margin: 0 10px 10px 0;
}

nav a.router-link-exact-active {
  color: #FFFFFF;
}

body {
  margin: 0px;
}
</style>
