import { adjustUpdateOpportunityValues } from './adjust-update-opportunity-values'

describe('adjustUpdateOpportunityValues', () => {
  it('returns proper values', () => {
    expect(adjustUpdateOpportunityValues('budget', '1000')).toEqual({
      budget: 1000
    })

    expect(adjustUpdateOpportunityValues('value', '10.11')).toEqual({
      value: 10
    })

    expect(adjustUpdateOpportunityValues('value', '0.75')).toEqual({
      value: 0
    })

    expect(adjustUpdateOpportunityValues('value', '1,70')).toEqual({
      value: 1
    })

    expect(adjustUpdateOpportunityValues('poAmount', '')).toEqual({
      poAmount: 0
    })

    expect(adjustUpdateOpportunityValues('probability', null)).toEqual({
      probability: null
    })

    expect(adjustUpdateOpportunityValues('highPriority', 'true')).toEqual({
      highPriority: true
    })

    expect(adjustUpdateOpportunityValues('highPriority', 'false')).toEqual({
      highPriority: false
    })

    expect(adjustUpdateOpportunityValues('highPriority', null)).toEqual({
      highPriority: false
    })

    expect(adjustUpdateOpportunityValues('name', 'some value')).toEqual({
      name: 'some value'
    })
  })
})
