<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/login" v-if="!user">Login</router-link> |
    <router-link to="/register" v-if="!user">Register</router-link> |
    <router-link to="/about">About</router-link> |
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
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
