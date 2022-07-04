import { mount } from '@vue/test-utils'
import Home from '@/views/HomeView.vue'
import { createStore } from 'vuex'

const app = {
  namespaced: true,
  state: {
    user: null,
    topics: null,
    currentTopic: null,
    messages: null
  },
  mutations: {
    updateUser(state, user) {
      state.user = user;
    },
    updateTopics(state, topics) {
      state.topics = topics;
    },
    updateCurrentTopic(state, topic) {
      state.currentTopic = topic;
    },
    updateMessages(state, messages) {
      state.messages = messages;
    }
  },
  actions: {
    async getTopics(context) {
      var data = [
        {
          id: 4003,
          lastMessageTimeStamp: "2022-06-29T14:10:06.81592",
          messageCount: 7,
          title: "test 2",
          userId: 2,
        }
      ];
      context.commit("updateTopics", data)
     
    }
  }
};
const store = createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    app
  }
})

describe('HomeView.vue', () => {
    it('renders correct title', () => {
      const wrapper = mount(Home, {
        global: {
          plugins: [store]
        }
      })
      const title = "Topics";
      expect(wrapper.find('h1').text()).toEqual(title)
    })

    it('topics passed to data', async() => {
      const wrapper = mount(Home, {
        global: {
          plugins: [store]
        }
      })
      const topic = "test 2";
      expect(wrapper.vm.topics[0].title).toBe(topic);
     
      
    })
})