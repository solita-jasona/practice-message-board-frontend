<template>
  <div class="edit-topic">
    <h1>Edit Topic</h1>
    <div class="form-container">
      <form @submit.prevent>
        <input type="textarea" @input="title = $event.target.value" placeholder="" class="topic-title-field" :value="title"/>
        <button @click="updateTopic">Update Topic</button>
      </form>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'EditTopicView',
  props: {
    otitle: String,
    otopicId: Number
  },
  data() {
    return {  
      title: "",
      topicId: null
    };
  },
  async mounted() {
    const self = this;
    if (!self.otitle || !self.otopicId) {
      self.$router.replace("/");
      return false;
    }
    self.title = self.otitle;
    self.topicId = self.otopicId;

  },
  methods: {
    async updateTopic() {
      const self = this;
      if (!self.title) {
        alert("Fill all fields");
        return false;
      }
      var login = await self.$store.dispatch("app/editTopic", {id: self.topicId, title: self.title});
      if (login == true) {
        self.$router.push("/");
      }
      else {
          alert("Topic failed to update, please try again");
      }
    }
  }
}
</script>
