import { mount } from '@vue/test-utils'
import DiscussionMessage from '@/components/DiscussionMessage.vue'

describe('DiscussionMessage.vue', () => {
  const mockRoute = {
    params: {
      id: 1,
      name: "editMessage"
    }
  }
  const mockRouter = {
    push: jest.fn()
  }
  const messageData = {
    message: {
      id: 4,
      contents: "hello world",
      timeStamp: "2022-07-05T11:23:21.429071",
      topicId: 1,
      user: { 
        id: 2,
        userEmail: "user@test.com",
        username: "user"
      },
      userId: 2
    },
    currentTopic: {
      id: 1,
			lastMessageTimeStamp: "2022-07-04T11:23:21.429071",
			messageCount: 8,
			title: "test 2",
			userId: 2
    },
    user: {
      role: "Admin",
			userEmail: "user@test.com",
			userId: 2,
			username: "user"
    }
  }
  it('renders message', async () => {
    const wrapper = mount(DiscussionMessage)
    const message = "hello world";
    await wrapper.setData(messageData);
    expect(wrapper.find('.message-content').text()).toEqual(message)
  })

  it('displays formatted date', async () => {
    const wrapper = mount(DiscussionMessage)
    await wrapper.setData(messageData);
    const formattedDate = "5/7/2022 11:23"
    expect(wrapper.find('.message .message-info-container .message-time').text()).toContain(formattedDate);
  })

  it('edit button redirects to edit page', async() => {
    const wrapper = mount(DiscussionMessage, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter
        }
      }
    })
    await wrapper.setData(messageData)
    await wrapper.find('.message .edit-button-container button').trigger('click')
		expect(mockRouter.push).toHaveBeenCalledTimes(1)
    expect(mockRouter.push).toHaveBeenCalledWith({"name": "editMessage", "params": {"ocontent": "hello world", "omessageId": 4, "otopicId": 1}})
  })

  it('edit button visible to admin', async () => {
    const wrapper = mount(DiscussionMessage)
    await wrapper.setData(messageData);
    expect(wrapper.find('.topic .topic-buttons .edit-button-container button.delete-button').exists()).toBeTruthy;
    await wrapper.setData({ user: { role: "Poster" } });
    expect(wrapper.find('.topic .topic-buttons .edit-button-container button.delete-button').exists()).toBeFalsy;
  })

})
