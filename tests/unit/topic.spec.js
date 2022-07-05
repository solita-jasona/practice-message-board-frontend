import { mount } from '@vue/test-utils'
import DiscussionTopic from '@/components/DiscussionTopic.vue'

describe('DiscussionTopic.vue', () => {
	const topicData = {
		topic: {
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
	it('renders topic title', async() => {
		const wrapper = mount(DiscussionTopic)
		const topic = "test 2";
		await wrapper.setData(topicData);
		expect(wrapper.find('.topic .title-container span').text()).toEqual(topic)
	})

	it('displays formatted date', async() => {
		const wrapper = mount(DiscussionTopic)
		await wrapper.setData(topicData);
		const formattedDate = "4/7/2022 11:23"
		expect(wrapper.find('.topic .topic-message-info-container span.topic-message-last').text()).toContain(formattedDate);
	})

	it('displays message count', async() => {
		const wrapper = mount(DiscussionTopic)
		const text = "Message Count: 8";
		await wrapper.setData(topicData);
		expect(wrapper.find('.topic .topic-message-info-container span.topic-message-count').text()).toContain(text);
		await wrapper.setData({topic : { messageCount: 9}});
		const text2 = "Message Count: 9";
		expect(wrapper.find('.topic .topic-message-info-container span.topic-message-count').text()).toContain(text2);
	})

	it('delete button triggers', async() => {
		const wrapper = mount(DiscussionTopic)
		window.confirm = jest.fn(() => false)
		await wrapper.setData(topicData);
		wrapper.find('.topic .topic-buttons .edit-button-container button.delete-button').trigger('click')
		expect(window.confirm).toBeCalled();
	})

	it('delete button visible to admin', async() => {
		const wrapper = mount(DiscussionTopic)
		await wrapper.setData(topicData);
		expect(wrapper.find('.topic .topic-buttons .edit-button-container button.delete-button').exists()).toBeTruthy;
		await wrapper.setData({user: { role: "Poster"}});
		expect(wrapper.find('.topic .topic-buttons .edit-button-container button.delete-button').exists()).toBeFalsy;
	})
	
})
