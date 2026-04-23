import { adjustContactName } from '.'

describe('adjustContactName', () => {
  describe('returns proper value for', () => {
    it.each([
      [{ contactName: undefined }, { contactName: '' }],
      [{ contactName: 'a' }, { contactName: 'a' }],
      [{ contactName: ' a ' }, { contactName: 'a' }],
      [{ contactName: ' a  b ' }, { contactName: 'a  b' }]
    ])('%s', (input, expected) => {
      expect(adjustContactName(input)).toMatchObject(expected)
    })
  })
})
