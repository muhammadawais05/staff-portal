import { adjustUpdateOpportunityValues } from './adjust-update-opportunity-values'

describe('adjustUpdateOpportunityValues', () => {
  it('returns proper values', () => {
    expect(adjustUpdateOpportunityValues('name', 'some value')).toEqual({
      name: 'some value'
    })
  })
})
