<template>
  <div class="messages page-content">
    <h1 v-if="currentTopic">{{currentTopic.title}}</h1>
    <div class="message-form-container">
      <form @submit.prevent>
        <label>Create reply to Topic</label>
        <input type="textarea" @input="newMessage = $event.target.value" placeholder="message.." class="message-form-field" :value="newMessage"/>
        <button @click="submit">submit</button>
      </form>
    </div>
    <div class="messages-container">
      <div class="message" v-for="(message, index) in messages" :key="index">
        <div class="message-info-container">
          <span class="message-user">User: {{message.user.username}}</span>
          <span v-if="formatDate(message.timeStamp)" class="message-time">Time: {{formatDate(message.timeStamp)}}</span>
        </div>
        <div class="message-content">
          {{message.contents}}
        </div>
        <div>
          <button v-if="user && user.userId == message.userId" @click="editMessage(message.id, message.contents)">Edit</button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'MessagesView',
  components: {
  },
  props: {
    otopic: String
  },
  computed: {
    ...mapState({
      user: (state) => state.app.user,
      currentTopic: (state) => state.app.currentTopic,
      messages: (state) => state.app.messages,
    }),
  },
  data() {
    return {
      newMessage: ""
    }
  },
  async mounted() {
    const self = this;
    console.log(self.otopic);
    if (self.otopic) {
      self.topic = JSON.parse(self.otopic);
      await self.$store.dispatch("app/setCurrentTopic", self.topic);
    }
    if (!self.currentTopic) {
      self.$router.replace("/");
      return false;
    }
    await self.$store.dispatch("app/getMessages", self.currentTopic.id);
  },
  methods: {
    formatDate(date) {
      if (date == "0001-01-01T00:00:00") {
        return null;
      }
      var dateObj = new Date(date);
      var minuteZero = "";
      var minutes = dateObj.getMinutes();
      if (minutes < 10) {
        minuteZero = "0";
      }
      var formattedDate = +dateObj.getDate()+
        "/"+(dateObj.getMonth()+1)+
        "/"+dateObj.getFullYear()+
        " "+dateObj.getHours()+
        ":"+minuteZero+
        +minutes;
      return formattedDate;
    },
    async submit() {
      const self = this;
      if (!self.newMessage) {
        alert("Please enter a message before submitting")
        return false;
      }
      var payLoad = {
        topicId: self.currentTopic.id,
        contents: self.newMessage
      }
      var submition = await self.$store.dispatch("app/addMessage", payLoad);
      if (submition) {
        await self.$store.dispatch("app/getMessages", self.currentTopic.id);
        self.newMessage = "";
      }
      else {
        alert("Message failed to save, please try again")
      }
    },
    editMessage(messageId, messageContent) {
      const self = this;
      self.$router.push({name: "editMessage", params: {otopicId: self.currentTopic.id, ocontent: messageContent, omessageId: messageId}});
    }
  }
}
</script>

<style>
.message-form-container {
  margin-bottom: 15px;
}

.message {
  border-style: solid;
  border-width: 1px;
  margin-bottom: 5px;
  padding: 5px;
}

.title-container {
  border-style: solid;
  border-width: 1px;
}

.message-info-container {
  width: 100%;
  height: 20px;
  display: inline-block;
}

.message-user {
  float: left;
}

.message-time {
  float: right;
}

.message-content {
  border-style: solid;
  border-width: 1px;
  margin-bottom: 5px;
  padding: 5px;
  min-height: 40px;
  text-align: left;
}

.topic-buttons {
  height: 30px;
  display: inline-block;
}

</style>