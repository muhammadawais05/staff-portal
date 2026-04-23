import { ClientCollectionSpeed } from '@staff-portal/graphql/staff'

import { collectionSpeedSelectionOptions } from './collectionSpeedSelectOptions'

describe('collectionSpeedSelectOptions', () => {
  it('includes all options in the proper order', () => {
    expect(collectionSpeedSelectionOptions).toEqual([
      {
        text: 'Slow Pay',
        value: ClientCollectionSpeed.SLOW_PAY
      },
      {
        text: 'Standard',
        value: ClientCollectionSpeed.STANDARD
      }
    ])
  })
})
