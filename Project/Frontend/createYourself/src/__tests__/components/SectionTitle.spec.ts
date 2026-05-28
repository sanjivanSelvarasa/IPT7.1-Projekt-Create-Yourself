import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SectionTitle from '@/components/ui/SectionTitle.vue'

describe('SectionTitle', () => {
  it('renders the tag text', () => {
    const wrapper = mount(SectionTitle, {
      props: {
        tagText: 'Features',
        title: 'What we offer',
        description: 'A description here',
      },
    })
    expect(wrapper.text()).toContain('Features')
  })

  it('renders the title', () => {
    const wrapper = mount(SectionTitle, {
      props: {
        tagText: 'Features',
        title: 'What we offer',
        description: 'A description here',
      },
    })
    expect(wrapper.text()).toContain('What we offer')
  })

  it('renders the description', () => {
    const wrapper = mount(SectionTitle, {
      props: {
        tagText: 'Features',
        title: 'What we offer',
        description: 'A description here',
      },
    })
    expect(wrapper.text()).toContain('A description here')
  })

  it('renders the optional svg icon class when provided', () => {
    const wrapper = mount(SectionTitle, {
      props: {
        svg: 'fa fa-star',
        tagText: 'Features',
        title: 'Title',
        description: 'Desc',
      },
    })
    expect(wrapper.find('i').classes()).toContain('fa-star')
  })
})
