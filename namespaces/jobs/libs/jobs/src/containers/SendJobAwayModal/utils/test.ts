import { getMatchingCallsOptions, getFirstMeetingId } from '.'
import { PossiblyRelatedMeetingsType } from '../types'
import { matchingCallsMock } from '../data/mocks'

jest.mock('@staff-portal/date-time-utils', () => ({
  getFormattedDate: (value: string) => value
}))

describe('getMatchingCallsOptions', () => {
  it('is blank array when totalCount: 0', () => {
    expect(
      getMatchingCallsOptions({ totalCount: 0, nodes: [] })
    ).toBeUndefined()
  })

  it('is blank array when totalCount: 1', () => {
    expect(
      getMatchingCallsOptions({ totalCount: 1, nodes: [] })
    ).toBeUndefined()
  })

  describe('has more then 2 items', () => {
    it('returns expected data', () => {
      expect(
        getMatchingCallsOptions({ totalCount: 3, nodes: matchingCallsMock })
      ).toEqual([
        {
          text: '2021-11-18T20:00:00+03:00 at 2021-11-18T20:00:00+03:00, Yvette Harber',
          value: 'meeting-1'
        },
        {
          text: '2021-11-18T19:30:00+03:00 at 2021-11-18T19:30:00+03:00, Tracy Schuppe',
          value: 'meeting-2'
        },
        {
          text: '2021-11-18T19:00:00+03:00 at 2021-11-18T19:00:00+03:00, Adah Gutkowski',
          value: 'meeting-3'
        }
      ])
    })
  })
})

describe('getFirstMeetingId', () => {
  it('is undefined when no related meetings', () => {
    expect(getFirstMeetingId(undefined)).toBeUndefined()
    expect(
      getFirstMeetingId({ totalCount: 0 } as PossiblyRelatedMeetingsType)
    ).toBeUndefined()
  })

  it('gives a first meeting ID if there only one is presented', () => {
    expect(
      getFirstMeetingId({
        totalCount: 1,
        nodes: [{ id: 'meting-id-1' }]
      } as PossiblyRelatedMeetingsType)
    ).toBe('meting-id-1')
  })

  it('gives undefined when there more the one are presented', () => {
    expect(
      getFirstMeetingId({
        totalCount: 2,
        nodes: [{ id: 'meting-id-1' }, { id: 'meting-id-2' }]
      } as PossiblyRelatedMeetingsType)
    ).toBeUndefined()
  })
})
