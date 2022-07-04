<template>
  <div class="home page-content">
    <h1>Topics</h1>
    <div class="topics-container" v-if="topics && topics.length > 0">
      <DiscussionTopic
        v-for="(topic, index) in topics" :key="index"
        :oid="topic.id"
        :olastMessageTimeStamp="topic.lastMessageTimeStamp"
        :omessageCount="topic.messageCount"
        :otitle="topic.title"
        :ouserId="topic.userId"
        :ocurrentUser="user"></DiscussionTopic>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DiscussionTopic from "@/components/DiscussionTopic.vue";
export default {
  name: 'HomeView',
  components: {
    DiscussionTopic
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
      }
    }
  }
}
</script>