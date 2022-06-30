<template>
  <div class="edit-message">
    <h1>Edit Message</h1>
    <div class="form-container">
      <form @submit.prevent>
        <input type="textarea" @input="content = $event.target.value" placeholder="" class="content-field" :value="content"/>
        <button @click="updateMessage">Update Message</button>
      </form>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'EditMessageView',
  props: {
    ocontent: String,
    omessageId: Number,
    otopicId: Number
  },
  data() {
    return {  
      content: "",
      messageId: null,
      topicId: null
    };
  },
  async mounted() {
    const self = this;
    if (!self.ocontent || !self.omessageId || !self.otopicId) {
      self.$router.replace("/");
      return false;
    }
    self.content = self.ocontent;
    self.messageId = self.omessageId;
    self.topicId = self.otopicId;

  },
  methods: {
    async updateMessage() {
      const self = this;
      if (!self.content) {
        alert("Fill all fields");
        return false;
      }
      var login = await self.$store.dispatch("app/editMessage", {id: self.messageId, topicId: self.topicId, contents: self.content});
      if (login == true) {
        self.$router.push("/messages");
      }
    }
  }
}
</script>
