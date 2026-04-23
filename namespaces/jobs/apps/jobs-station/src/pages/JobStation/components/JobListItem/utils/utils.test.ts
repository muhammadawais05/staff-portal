import { NO_VALUE } from '@staff-portal/config'
import { Job } from '@staff-portal/graphql/staff'

import { renderCommitment } from './utils'

describe('renderCommitment', () => {
  it('returns no value', () => {
    expect(
      renderCommitment({
        commitment: null
      } as Job)
    ).toEqual(NO_VALUE)
    expect(renderCommitment({} as Job)).toEqual(NO_VALUE)
    expect(
      renderCommitment({
        commitment: 'random string'
      } as Job)
    ).toEqual(NO_VALUE)
  })

  it('returns a title for the job commitment', () => {
    expect(
      renderCommitment({
        commitment: 'full_time'
      } as Job)
    ).toBe('Full-time')
    expect(
      renderCommitment({
        commitment: 'part_time'
      } as Job)
    ).toBe('Part-time')
    expect(
      renderCommitment({
        commitment: 'hourly'
      } as Job)
    ).toBe('Hourly')
  })

  it('returns a title for the enagement commitment', () => {
    expect(
      renderCommitment({
        commitment: 'part_time',
        talentCount: 1,
        currentEngagement: {
          commitment: 'FULL_TIME'
        }
      } as Job)
    ).toBe('Full-time')
    expect(
      renderCommitment({
        commitment: 'full_time',
        talentCount: 1,
        currentEngagement: {
          commitment: 'PART_TIME'
        }
      } as Job)
    ).toBe('Part-time')
    expect(
      renderCommitment({
        commitment: 'part_time',
        talentCount: 1,
        currentEngagement: {
          commitment: 'HOURLY'
        }
      } as Job)
    ).toBe('Hourly')
    expect(
      renderCommitment({
        commitment: 'part_time',
        talentCount: 2,
        currentEngagement: {
          commitment: 'HOURLY'
        }
      } as Job)
    ).toBe('Part-time')
  })
})
