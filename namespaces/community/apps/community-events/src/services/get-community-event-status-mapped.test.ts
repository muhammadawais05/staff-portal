import { CommunityEventStatus } from '@staff-portal/graphql/staff'

import { getCommunityEventStatusMapped } from './get-community-event-status-mapped'

describe('Get community event category names', () => {
  it.each([
    [CommunityEventStatus.APPROVED, { label: 'Approved', color: 'green' }],
    [CommunityEventStatus.PENDING, { label: 'Pending', color: 'yellow' }],
    [CommunityEventStatus.REJECTED, { label: 'Rejected', color: 'red' }],
    [CommunityEventStatus.REMOVED, { label: 'Removed', color: 'red' }]
  ])('returns proper status object for %s status enum', (value, expected) => {
    const result = getCommunityEventStatusMapped(value)

    expect(result).toEqual(expected)
  })
})
