import { BusinessTypes } from '@staff-portal/graphql/staff'

import { businessTypeSelectOptions } from './businessTypeSelectOptions'

describe('businessTypeSelectOptions', () => {
  it('includes all business type select options in the proper order', () => {
    expect(businessTypeSelectOptions).toEqual([
      {
        text: 'Individual',
        value: BusinessTypes.INDIVIDUAL
      },
      {
        text: 'Start-up',
        value: BusinessTypes.START_UP
      },
      {
        text: 'Non profit',
        value: BusinessTypes.NON_PROFIT
      },
      {
        text: 'Dev shop or Agency',
        value: BusinessTypes.DEV_SHOP_OR_AGENCY
      },
      {
        text: 'Small business',
        value: BusinessTypes.SMALL_BUSINESS
      },
      {
        text: 'Medium business',
        value: BusinessTypes.MEDIUM_BUSINESS
      },
      {
        text: 'Enterprise business',
        value: BusinessTypes.ENTERPRISE_BUSINESS
      },
      {
        text: 'Government',
        value: BusinessTypes.GOVERNMENT
      }
    ])
  })
})
