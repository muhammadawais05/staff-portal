import { OfacStatus } from '@staff-portal/graphql/staff'

import { getOfacStatusOptions } from './get-ofac-status-options'

describe('getOfacStatusOptions', () => {
  it('properly filters and sorts OFAC options', () => {
    expect(getOfacStatusOptions(null)).toEqual([
      {
        text: 'Normal',
        value: OfacStatus.NORMAL
      },
      {
        text: 'Investigation',
        value: OfacStatus.INVESTIGATION
      },
      {
        text: 'Restricted',
        value: OfacStatus.RESTRICTED
      }
    ])

    expect(getOfacStatusOptions(OfacStatus.NORMAL)).toEqual([
      {
        text: 'Investigation',
        value: OfacStatus.INVESTIGATION
      },
      {
        text: 'Restricted',
        value: OfacStatus.RESTRICTED
      }
    ])

    expect(getOfacStatusOptions(OfacStatus.INVESTIGATION)).toEqual([
      {
        text: 'Normal',
        value: OfacStatus.NORMAL
      },
      {
        text: 'Restricted',
        value: OfacStatus.RESTRICTED
      }
    ])

    expect(getOfacStatusOptions(OfacStatus.RESTRICTED)).toEqual([
      {
        text: 'Normal',
        value: OfacStatus.NORMAL
      },
      {
        text: 'Investigation',
        value: OfacStatus.INVESTIGATION
      }
    ])
  })
})
