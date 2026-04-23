import { CompanyRepresentativeCommunicationOption } from '@staff-portal/graphql/staff'

import { getCommunicationOptions } from './get-communication-options'

describe('getCommunicationOptions', () => {
  it.each([
    [
      [
        CompanyRepresentativeCommunicationOption.NOTIFY_JOBS,
        CompanyRepresentativeCommunicationOption.NOTIFY_OTHER
      ],
      'All Job Activity, Other'
    ],
    [
      [CompanyRepresentativeCommunicationOption.NOTIFY_JOBS],
      'All Job Activity'
    ],
    [[], null],
    [undefined, null],
    [null, null]
  ])('returns expected value %s', (value, expected) => {
    const result = getCommunicationOptions(value)

    expect(result).toBe(expected)
  })
})
