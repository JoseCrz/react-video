import React from 'react'
import { mount } from 'enzyme'
import { create } from 'react-test-renderer'
import Register from '../../containers/Register'
import ProviderMock from '../../__mocks__/providerMock'

describe('<Register /> Tests', () => {
  const register = mount(
    <ProviderMock>
      <Register />
    </ProviderMock>
  )

  test('Container Rendering', () => {
    expect(register.length).toEqual(1)
  })

  test('handleOnSubmit calling', () => {
    const  preventDefault = jest.fn()
    register.find('form').simulate('submit', { preventDefault })
    expect(preventDefault).toHaveBeenCalledTimes(1)

  })

  test('Container snapshot', () => {
    const register = create(
      <ProviderMock>
        <Register />
      </ProviderMock>
    )

    expect(register.toJSON()).toMatchSnapshot()
  })

})