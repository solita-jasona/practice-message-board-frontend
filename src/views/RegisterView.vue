<template>
  <div class="register">
    <div class="form-container">
      <div class="title">Register</div>
      <form @submit.prevent>
        <input type="text" @input="username = $event.target.value" placeholder="username" class="form-field"/>
        <input type="text" @input="email = $event.target.value" placeholder="email" class="form-field"/>
        <input type="password" @input="password = $event.target.value" placeholder="password" class="form-field"/>
        <input type="password" @input="password2 = $event.target.value" placeholder="confirm password" class="form-field"/>
        <div class="submit-container">
          <button class="submit" @click="register">Register</button>
        </div>     
      </form>
    </div>
    
  </div>
</template>

<script>
/* eslint-disable no-useless-escape */
export default {
  name: 'RegisterView',
  data() {
    return {  
      username: "",
      email: "",
      password: "",
      password2: "",
    };
  },
  async mounted() {
    // const self = this;

  },
  methods: {
    async register() {
      const self = this;
      // if (!self.username || !self.password|| !self.password2 || !self.email) {
      //   alert("Fill all fields");
      //   return false;
      // }
      if (!self.emailIsValid(self.email)) {
        alert("Enter a valid email address")
        return false;
      }
      if (!self.passwordsMatch(self.password, self.password2)) {
        alert("Please ensure passwords match");
        return false;
      }
      var register = await self.$store.dispatch("app/register", {username: self.username, password: self.password, userEmail: self.email});
      if (register == true) {
        self.$router.push("/");
        alert("User {{self.username}} registered successfully")
      }
      else {
        alert(register);
      }
    },
    emailIsValid(email) {
      const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      if (emailReg.test(email)) {
        return true
      }
      return false;
    },
    passwordsMatch(pass, pass2) {
      if(!pass || !pass2) {
        return false;
      }
      if(pass == pass2) {
        return true;
      }
      return false;
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
  margin-bottom: 5px;
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
  margin-bottom: 5px;
}

.submit-container {
  padding: 5px;
}
</style>