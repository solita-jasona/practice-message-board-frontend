<template>
  <div class="login">
    <h1>Login</h1>
    <div class="form-container">
      <form @submit.prevent>
        <input type="text" @input="username = $event.target.value" placeholder="username" class="form-field"/>
        <input type="password" @input="password = $event.target.value" placeholder="password" class="form-field"/>
        <button @click="login">login</button>
      </form>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {  
      username: "",
      password: ""
    };
  },
  async mounted() {
    // const self = this;

  },
  methods: {
    async login() {
      const self = this;
      if (!self.username || !self.password) {
        alert("Fill all fields");
        return false;
      }
      var login = await self.$store.dispatch("app/login", {username: self.username, password: self.password});
      if (login == true) {
        self.$router.push("/");
      }
      else {
          alert(login);
      }
    }
  }
}
</script>
