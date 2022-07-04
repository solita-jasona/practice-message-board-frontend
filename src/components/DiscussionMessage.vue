<template>
  <div :class="{ 'message': true, 'user-message': (user && user.userId == message.userId) }">
    <div class="message-info-container">
      <span class="message-user" v-if="message.user">User: {{ message.user.username }}</span>
      <span v-if="formatDate(message.timeStamp)" class="message-time">Time:
        {{ formatDate(message.timeStamp) }}</span>
    </div>
    <div class="message-content">
      {{ message.contents }}
    </div>
    <div class="edit-button-container">
      <button v-if="user && user.userId == message.userId"
        @click="editMessage(message.id, message.contents)">Edit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiscussionMessage',
  props: {
    ocontents: String,
    oid: Number,
    otimeStamp: String,
    otopicId: Number,
    ouserId: Number,
    ouser: Object,
    ocurrentUser: Object,
    ocurrentTopic: Object
  },
  data() {
    return {
      message: {},
      currentTopic: {},
      user: null
    }
  },
  async mounted() {
    const self = this;
    self.message = {
      id: self.oid,
      contents: self.ocontents,
      timeStamp: self.otimeStamp,
      topicId: self.otopicId,
      userId: self.ouserId,
      user: self.ouser
    }
    self.user = self.ocurrentUser;
    self.currentTopic = self.ocurrentTopic
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
    editMessage(messageId, messageContent) {
      const self = this;
      self.$router.push({name: "editMessage", params: {otopicId: self.currentTopic.id, ocontent: messageContent, omessageId: messageId}});
    }
    
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
  background-color: #A6B5CB;;
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
  width: calc(100% - 21px );
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
  .message-user, .message-time, .topic-message-count, .topic-message-last {
    float: unset;
    display: block;
  }

}
</style>