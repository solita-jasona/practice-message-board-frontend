<template>
  <div class="home page-content">
    <h1>Topics</h1>

    <div class="topics-container" v-if="topics && topics.length > 0">
      <div class="topic" v-for="(topic, index) in topics" :key="index"> 
        <div class="title-container">
          <span>{{topic.title}}</span>
        </div>
        <div class="topic-message-info-container">
          <span class="topic-message-count">Message Count: {{topic.messageCount}}</span>
          <span v-if="formatDate(topic.lastMessageTimeStamp)" class="topic-message-last">Last message: {{formatDate(topic.lastMessageTimeStamp)}}</span>
        </div>
        <div class="topic-buttons">
          <div class="view-button-container">
            <button @click="viewMessages(topic)">View Messages/Reply</button>
          </div>
          <div class="edit-button-container">
            <button v-if="topic.messageCount == 0 && user && user.role == 'Admin'" @click="editTopic(topic.id, topic.title)">Edit</button>
            <button class="delete-button" v-if="user && user.role == 'Admin'" @click="deleteTopic(topic.id)">Delete</button>
          </div>
          
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'HomeView',
  components: {
  },
  computed: {
    ...mapState({
      user: (state) => state.app.user,
      topics: (state) => state.app.topics,
    }),
  },
  mounted() {
    console.log("mounted home");
    const self = this;
    self.$store.dispatch("app/getTopics");
  },
  methods: {
    formatDate(date) {
      if (!date || date == "0001-01-01T00:00:00") {
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
    viewMessages(topic) {
      const self = this;
      self.$router.push({name: "messages", params: {otopic: JSON.stringify(topic ,null, 2)}}); 
    },
    editTopic(id, title) {
      const self = this;
      self.$router.push({name: "editTopic", params: {otopicId: id, otitle: title}}); 
    },
    async deleteTopic(id) {
      const self = this;
      if (confirm("Are you sure you want to delete this?")) {
        var deleted = await self.$store.dispatch("app/deleteTopic", id);
        if (deleted) {
          await self.$store.dispatch("app/getTopics");
        }
        else {
          alert("Something went wrong, please try again")
        }
      }
    }
  }
}
</script>

<style scoped>
.topic {
  background-color: #A6B5CB;
  margin-bottom: 15px;
  padding: 5px;
  box-shadow: 0px 5px 8px 0px #2c4770;
  color: #2C4770;
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 10px;
}

.title-container {
  background-color: #2C4770;
  color: #d5dce8;
  font-size: 18px;
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

.topic-buttons {
  height: 30px;
  display: inline-block;
  width: 100%;
}

.topic-buttons button {
  background-color: #4F688E;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
}

.topic-buttons .edit-button-container {
  text-align: right;
}

.topic-buttons .edit-button-container button {
  margin-left: 5px;
}

.topic-buttons .edit-button-container .delete-button {
  background-color: #9a0d0d;
}

</style>