import React from 'react'
import { mount }  from 'enzyme'
import { create } from 'react-test-renderer'
import Header from '../../components/Header'
import ProviderMock from '../../__mocks__/providerMock'


describe('<Header /> Tests', () => {
  
  const header = mount(
    <ProviderMock>
      <Header />
    </ProviderMock>
  )

  test('Component rendering', () => {
    expect(header.length).toEqual(1)
  })

  test('Logo existance', () => {
    expect(header.find('.Header__logo')).toHaveLength(1)
  })

  test('Component snapshot', () => {
    const header = create(
      <ProviderMock>
        <Header />
      </ProviderMock>
    )

    expect(header.toJSON()).toMatchSnapshot()
  })

})