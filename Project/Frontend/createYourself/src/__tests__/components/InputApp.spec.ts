import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InputApp from '@/components/ui/InputApp.vue'

describe('InputApp', () => {
  it('renders the label text', () => {
    const wrapper = mount(InputApp, {
      props: { name: 'Email', for: 'email' },
    })
    expect(wrapper.find('label').text()).toBe('Email')
  })

  it('sets the "for" attribute on the label', () => {
    const wrapper = mount(InputApp, {
      props: { name: 'Password', for: 'password' },
    })
    expect(wrapper.find('label').attributes('for')).toBe('password')
  })

  it('renders slot content', () => {
    const wrapper = mount(InputApp, {
      props: { name: 'Email', for: 'email' },
      slots: {
        default: '<input id="email" type="email" />',
      },
    })
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('input').attributes('type')).toBe('email')
  })
})
