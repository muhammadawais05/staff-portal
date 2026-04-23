import { encodeEntityId } from '@staff-portal/data-layer-service'

import { getClaimerOptions } from './get-claimer-options'

describe('getClaimerOptions()', () => {
  it('prepends list with additional options', () => {
    const options = getClaimerOptions([])

    expect(options).toHaveLength(3)
    expect(options[0].label).toBe('Not Selected')
    expect(options[0].value).toBe('')

    expect(options[1].label).toBe('Not claimed')
    expect(options[1].value).toBe('none')

    expect(options[2].label).toBe('Claimed by Me')
    expect(options[2].value).toBe('me')
  })

  it('allows custom additional options', () => {
    const OPTION_LABEL = 'Option ad4235'
    const OPTION_VALUE = 'Value ad4235'
    const options = getClaimerOptions([], undefined, [
      {
        label: OPTION_LABEL,
        value: OPTION_VALUE
      }
    ])

    expect(options).toHaveLength(1)
    expect(options[0].label).toEqual(OPTION_LABEL)
    expect(options[0].value).toEqual(OPTION_VALUE)
  })

  it('filters out the current user', () => {
    const CURRENT_USER_ID = '123'
    const REGULAR_USER_ID = encodeEntityId('456', 'Test')
    const claimers = [
      {
        id: CURRENT_USER_ID,
        fullName: 'Current user name'
      },
      {
        id: REGULAR_USER_ID,
        fullName: 'Regular user name'
      }
    ]

    const options = getClaimerOptions(
      claimers,
      encodeEntityId(CURRENT_USER_ID, 'Test')
    )

    expect(options).toHaveLength(4)
    expect(options[3].value).toEqual(REGULAR_USER_ID)
  })
})
