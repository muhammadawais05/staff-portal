import { adjustLegalName } from '.'

describe('adjustLegalName', () => {
  describe('returns proper value for', () => {
    it.each([
      [{ legalName: 'a' }, { legalName: 'a' }],
      [{ legalName: 'a  b' }, { legalName: 'a  b' }],
      [{ legalName: ' a  b' }, { legalName: 'a  b' }],
      [{ legalName: 'a  b  ' }, { legalName: 'a  b' }],
      [{ legalName: ' a   ' }, { legalName: 'a' }],
      [{ legalName: '' }, { legalName: '' }],
      [{ legalName: '   ' }, { legalName: '' }]
    ])('%s', (input, expected) => {
      expect(adjustLegalName(input)).toMatchObject(expected)
    })
  })
})
