import React from 'react'
import { mount } from 'enzyme'
import Footer from '../../components/Footer'

describe('<Footer /> Tests', () => {
  const footer = mount(<Footer />)

  test('Component Rendering', () => {
    expect(footer.length).toEqual(1)
  })

  test('Footer has 3 anchors', () => {
    expect(footer.find('a')).toHaveLength(3)
  })

})
