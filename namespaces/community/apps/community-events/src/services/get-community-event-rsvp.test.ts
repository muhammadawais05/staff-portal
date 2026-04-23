import { CommunityEventRsvp } from '@staff-portal/graphql/staff'

import { getCommunityEventRSVP } from './get-community-event-rsvp'

describe('Get community event RSVP name', () => {
  it.each([
    [CommunityEventRsvp.EXTERNAL_RSVP, 'External'],
    [CommunityEventRsvp.INTERNAL_RSVP, 'Internal'],
    [CommunityEventRsvp.NO_RSVP, 'No']
  ])('returns proper RSVP name for "%s" enum', (value, expected) => {
    const result = getCommunityEventRSVP(value)

    expect(result).toEqual(expected)
  })
})
