<template>
  <div class="login">
    <div class="form-container">
      <div class="title">Login</div>
      <form @submit.prevent>
        <input type="text" @input="username = $event.target.value" placeholder="username" class="form-field"/>
        <input type="password" @input="password = $event.target.value" placeholder="password" class="form-field"/>
        <div class="submit-container"> 
          <button class="submit" @click="login">Login</button>
        </div>
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
    }
  }
}
</script>

<style scoped>
.form-container {
  background-color: #A6B5CB;
  padding: 5px;
  box-shadow: 0px 5px 8px 0px #2c4770;
  color: #2C4770;
  border-radius: 5px;
  margin: 50px auto 30px auto;
  width: 450px;
}

.title {
  background-color: #2C4770;
  color: #D5DCE8;
  font-size: 24px;
  font-weight: bold;
  border-radius: 5px;
  margin-bottom: 10px;
}

.form-field {
  width: 95%;
  padding: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  border-width: 0px;
}

.submit {
  background-color: #4F688E;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
}

.submit-container {
  padding: 5px;
}

@media only screen and (max-width: 500px) {
  .form-container {
    width: 90%;
  }
}
</style>