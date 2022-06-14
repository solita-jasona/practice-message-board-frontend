<template>
  <div class="add-topic">
    <h1>Add topic</h1>
    <div class="form-container">
      <form @submit.prevent>
        <input type="text" @input="title = $event.target.value" placeholder="Topic" class="topic-input"/>
        <button @click="submit">Create Topic</button>
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
      else {
          alert("something went wrong, please try again later");
      }
    }
  }
}
</script>
