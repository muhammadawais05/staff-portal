import { PublicationGigStatus } from '@staff-portal/graphql/staff'

import { getRequestStatusDetails } from './'

describe('GetRequestStatusDetails', () => {
  it('returns correct information when status is PENDING', () => {
    expect(getRequestStatusDetails(PublicationGigStatus.PENDING)).toEqual([
      'Pending Claim',
      'yellow'
    ])
  })

  it('returns correct information when status is CLAIMED', () => {
    expect(getRequestStatusDetails(PublicationGigStatus.CLAIMED)).toEqual([
      'Pending Approval',
      'yellow'
    ])
  })

  it('returns correct information when status is APPROVED', () => {
    expect(getRequestStatusDetails(PublicationGigStatus.APPROVED)).toEqual([
      'Pending Candidate',
      'yellow'
    ])
  })

  it('returns correct information when status is APPROVED and a reach out is sent', () => {
    expect(
      getRequestStatusDetails(PublicationGigStatus.APPROVED, true)
    ).toEqual(['Reach Out Sent', 'yellow'])
  })

  it('returns correct information when status is CLOSED', () => {
    expect(getRequestStatusDetails(PublicationGigStatus.CLOSED)).toEqual([
      'Closed',
      'red'
    ])
  })

  it('returns correct information when status is MATCHED', () => {
    expect(getRequestStatusDetails(PublicationGigStatus.MATCHED)).toEqual([
      'Candidate Sent',
      'green'
    ])
  })

  it('returns correct information when status is COMPLETED', () => {
    expect(getRequestStatusDetails(PublicationGigStatus.COMPLETED)).toEqual([
      'Completed',
      'dark-grey'
    ])
  })
})
