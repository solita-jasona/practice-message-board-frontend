import { mount } from '@vue/test-utils'
import Register from '@/views/RegisterView.vue'

describe('RegisterView.vue', () => {
    it('renders correct title', () => {
      const wrapper = mount(Register)
      const title = "Register";
      expect(wrapper.find('.title').text()).toEqual(title)
    })
    it('validates good email', () => {
        const wrapper = mount(Register);
        const email = "test@gmail.com";
        expect(wrapper.vm.emailIsValid(email)).toBeTruthy();
    }) 
    it('validates bad email', () => {
        const wrapper = mount(Register);
        const email = "tes.t.gmail.com";
        expect(wrapper.vm.emailIsValid(email)).toBeFalsy();
    })
    it('validates matching passwords', () => {
        const wrapper = mount(Register);
        const pass1 = "testpassword";
        const pass2 = "testpassword";
        expect(wrapper.vm.passwordsMatch(pass1,pass2)).toBeTruthy();
    })
    it('validates non-matching passwords', () => {
        const wrapper = mount(Register);
        const pass1 = "testpassword";
        const pass2 = "differentpassword";
        expect(wrapper.vm.passwordsMatch(pass1,pass2)).toBeFalsy();
    })
    it('validates missing password', () => {
        const wrapper = mount(Register);
        const pass1 = "testpassword";
        const pass2 = "";
        expect(wrapper.vm.passwordsMatch(pass1,pass2)).toBeFalsy();
    })
})