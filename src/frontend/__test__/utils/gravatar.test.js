import gravatar from '../../utils/gravatar'

test('Gravatar Util funtionality', () => {
  const testEmail = 'josecueram@gmail.com'
  const expectedUrl =  'https://gravatar.com/avatar/2470be7618062987a1a27d1c5b1a423e'

  expect(gravatar(testEmail)).toEqual(expectedUrl)
})