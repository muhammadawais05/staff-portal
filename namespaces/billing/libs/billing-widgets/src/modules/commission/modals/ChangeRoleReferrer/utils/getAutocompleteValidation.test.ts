import getAutocompleteValidation from './getAutocompleteValidation'

describe('#getAutocompleteValidation', () => {
  describe('when payload includes a valid referrelId', () => {
    describe('when role has referrel', () => {
      it('does not return an error', () => {
        expect(
          getAutocompleteValidation(true)({ referrerId: 'abc123' })
        ).toEqual({})
      })
    })

    describe('when role does not have referrel', () => {
      it('does not return an error', () => {
        expect(
          getAutocompleteValidation(false)({ referrerId: 'abc123' })
        ).toEqual({})
      })
    })
  })

  describe('when payload does not include a valid referrelId', () => {
    describe('when role has referrel', () => {
      it('does not return an error', () => {
        expect(
          getAutocompleteValidation(true)({ referrerId: undefined })
        ).toEqual({})
      })
    })

    describe('when role does not have referrel', () => {
      it('returns a validation error', () => {
        expect(
          getAutocompleteValidation(false)({ referrerId: undefined })
        ).toEqual({
          referrerId__fake: 'Please provide existing Payee as the referrer.'
        })
      })
    })
  })
})
