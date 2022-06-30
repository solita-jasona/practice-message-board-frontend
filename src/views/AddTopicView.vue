<template>
  <div class="add-topic">
    <div class="form-container">
      <div class="title">Add new Topic</div>
      <form @submit.prevent>
        <textarea @input="title = $event.target.value" placeholder="Topic" class="topic-input"/>
        <div class="submit-container">
          <button class="submit" @click="submit">Create Topic</button>
        </div>      
      </form>
    </div>
    
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'AddTopicView',
  computed: {
    ...mapState({
      user: (state) => state.app.user,
    }),
  },
  data() {
    return {  
      title: ""
    };
  },
  async created() {
    const self = this;
    if (!self.user) {
      self.$router.replace("/");
    }
  },
  methods: {
    async submit() {
      const self = this;
      if (!self.title) {
        alert("Fill all fields");
        return false;
      }
      var addTopic = await self.$store.dispatch("app/createTopic", {title: self.title});
      if (addTopic == true) {
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
  font-size: 20px;
  font-weight: bold;
  border-radius: 5px;
  margin-bottom: 5px;
}

.topic-input {
  display: block;
  width: 95%;
  margin:auto;
  height: 120px;
  resize: none;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
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

@media only screen and (max-width: 500px) {
  .form-container {
    width: 90%;
  }
}
</style>