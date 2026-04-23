import { GigReachOutStatus } from '@staff-portal/graphql/staff'

import { getReachOutStatus } from './'

describe('Get ReachOut Status', () => {
  it('returns correct information when there is no reach out', () => {
    expect(getReachOutStatus()).toEqual(['Not Sent', 'dark-grey'])
  })

  it('returns correct information when status is ACCEPTED', () => {
    expect(getReachOutStatus(GigReachOutStatus.ACCEPTED)).toEqual([
      'Accepted',
      'green'
    ])
  })

  it('returns correct information when status is CANCELED', () => {
    expect(getReachOutStatus(GigReachOutStatus.CANCELED)).toEqual([
      'Canceled',
      'red'
    ])
  })

  it('returns correct information when status is INTRODUCED', () => {
    expect(getReachOutStatus(GigReachOutStatus.INTRODUCED)).toEqual([
      'Introduced',
      'green'
    ])
  })

  it('returns correct information when status is REJECTED', () => {
    expect(getReachOutStatus(GigReachOutStatus.REJECTED)).toEqual([
      'Rejected',
      'red'
    ])
  })

  it('returns correct information when status is SENT', () => {
    expect(getReachOutStatus(GigReachOutStatus.SENT)).toEqual([
      'Sent',
      'yellow'
    ])
  })
})
