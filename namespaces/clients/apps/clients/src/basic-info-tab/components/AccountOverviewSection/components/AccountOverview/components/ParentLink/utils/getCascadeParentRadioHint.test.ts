import { getCascadeParentRadioHint } from './getCascadeParentRadioHint'

describe('getCascadeParentRadioHint', () => {
  describe('when hintsOrErrors is not provided', () => {
    it('returns an empty array', () => {
      expect(getCascadeParentRadioHint('cascadeBillingDetails', '')).toEqual([])
    })
  })

  describe('when name is "cascadeBillingDetails"', () => {
    it('gets all paragraph elements and returns an array', () => {
      expect(
        getCascadeParentRadioHint(
          'cascadeBillingDetails',
          '<p>Billing name will not be changed for: Nader, Witting and Collier (current).</p>\\n\\n<p>Billing address will not be changed for: Nader, Witting and Collier (current).</p>\\n\\n<p>Billing phone will not be changed for: Nader, Witting and Collier (current).</p>'
        )
      ).toEqual([
        'Billing name will not be changed for: Nader, Witting and Collier (current).',
        'Billing address will not be changed for: Nader, Witting and Collier (current).',
        'Billing phone will not be changed for: Nader, Witting and Collier (current).'
      ])
    })
  })

  describe('when name is different than "cascadeBillingDetails"', () => {
    it('puts the hintOrError in an array and returns it', () => {
      expect(
        getCascadeParentRadioHint(
          'cascadeSalesClaimer',
          'Will be updated to Rory Spanier'
        )
      ).toEqual(['Will be updated to Rory Spanier'])
    })
  })
})
