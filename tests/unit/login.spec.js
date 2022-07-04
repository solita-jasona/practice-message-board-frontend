import { mount } from '@vue/test-utils'
import Login from '@/views/LoginView.vue'

describe('LoginrView.vue', () => {
    it('renders correct title', () => {
      const wrapper = mount(Login)
      const title = "Login";
      expect(wrapper.find('.title').text()).toEqual(title)
    })
})