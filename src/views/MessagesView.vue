<template>
  <div class="messages page-content">
    <div v-if="currentTopic" class="topic">
      <div class="title-container">
        <span>{{ currentTopic.title }}</span>
      </div>
      <div class="topic-message-info-container">
        <span class="topic-message-count">Message Count: {{ currentTopic.messageCount }}</span>
        <span v-if="formatDate(currentTopic.lastMessageTimeStamp)" class="topic-message-last">Last message:
          {{ formatDate(currentTopic.lastMessageTimeStamp) }}</span>
      </div>
    </div>
    <div class="message-form-container" v-if="user">
      <form @submit.prevent>
        <span>Reply to Topic</span>
        <textarea class="message-form-input" @input="newMessage = $event.target.value" placeholder="message.."
          :value="newMessage"></textarea>
        <div class="message-submit-container">
          <button class="message-submit" @click="submit">submit</button>
        </div>
      </form>
    </div>
    <div class="messages-container">
      <DiscussionMessage v-for="(message, index) in messages" :key="index" :ocontents="message.contents"
          :oid="message.id" :otimeStamp="message.timeStamp" :otopicId="message.topicId" :ouserId="message.userId" :ouser="message.user"
          :ocurrentUser="user" :ocurrentTopic="currentTopic"></DiscussionMessage>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DiscussionMessage from "@/components/DiscussionMessage.vue"
export default {
  name: 'MessagesView',
  components: {
    DiscussionMessage
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
  beforeUnmount() {
    this.$messageHub.off("ReceiveMessage");
  },
  async mounted() {
    const self = this;
    if (self.otopic) {
      self.topic = JSON.parse(self.otopic);
      await self.$store.dispatch("app/setCurrentTopic", self.topic);
    }
    if (!self.currentTopic) {
      self.$router.replace("/");
      return false;
    }
    await self.$store.dispatch("app/getMessages", self.currentTopic.id);
    if (self.$messageHub) {
      self.$messageHub.on("ReceiveMessage", (topicId) => {
        if (topicId == self.currentTopic.id) {
          self.updateMessagesTopic()
        }
      })
    }

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
      var formattedDate = +dateObj.getDate() +
        "/" + (dateObj.getMonth() + 1) +
        "/" + dateObj.getFullYear() +
        " " + dateObj.getHours() +
        ":" + minuteZero +
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
        await self.updateMessagesTopic();
        self.$messageHub.send("SendMessage", self.currentTopic.id);
        self.newMessage = "";
      }
    },
    async updateMessagesTopic() {
      const self = this;
      await self.$store.dispatch("app/getMessages", self.currentTopic.id);
      await self.$store.dispatch("app/getCurrentTopic", self.currentTopic.id);
    },

  }
}
</script>

<style scoped>
.topic {
  background-color: #A6B5CB;
  padding: 5px;
  box-shadow: 0px 5px 8px 0px #2c4770;
  color: #2C4770;
  border-radius: 5px;
  margin: 10px 5px 30px 5px;
}

.title-container {
  background-color: #2C4770;
  color: #D5DCE8;
  font-size: 20px;
  font-weight: bold;
  border-radius: 5px;
}

.topic-message-info-container {
  width: 100%;
  height: 20px;
  display: inline-block;
}

.topic-message-info-container span {
  margin: auto;
}

.topic-message-count {
  float: left;
}

.topic-message-last {
  float: right;
}

.message-form-container {
  margin-bottom: 15px;
  text-align: left;
  padding: 10px;
}

.message {
  margin-bottom: 5px;
  padding: 5px;
  background-color: #A6B5CB;
  ;
  color: #2C4770;
  border-radius: 5px;
  box-shadow: 0px 5px 8px 0px #2c4770;
  margin: 0px 15px 20px 15px;
}

.user-message {
  background-color: #758AA8;
  color: #D5DCE8;
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
  margin-bottom: 5px;
  padding: 5px;
  min-height: 40px;
  text-align: left;
  color: #2C4770;
  background-color: #D5DCE8;
  border-radius: 5px;
}

.topic-buttons {
  height: 30px;
  display: inline-block;
}

.message-form-input {
  resize: none;
  width: calc(100% - 21px);
  margin: 5px 10px 10px 5px;
  display: inline-block;
  position: relative;
  padding: 5px;
  height: 150px;
  border-radius: 5px;
}

.message-submit {
  background-color: #4F688E;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
}

.edit-button-container {
  text-align: right;
}

.edit-button-container button {
  background-color: #4F688E;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
}

.message-submit-container {
  width: 100%;
  text-align: right;
}

@media only screen and (max-width: 420px) {

  .message-user,
  .message-time,
  .topic-message-count,
  .topic-message-last {
    float: unset;
    display: block;
  }

}
</style>