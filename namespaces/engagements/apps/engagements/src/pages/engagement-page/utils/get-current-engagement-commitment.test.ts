import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'

import { getCurrentEngagementCommitment } from './get-current-engagement-commitment'

describe('getCurrentEngagementCommitment', () => {
  it('returns undefined when engagements is undefined', () => {
    expect(getCurrentEngagementCommitment(undefined)).toBeUndefined()
  })

  it('returns undefined when no nodes', () => {
    const engagements = { nodes: [] }

    expect(getCurrentEngagementCommitment(engagements)).toBeUndefined()
  })

  it('returns a commitment when a node exists', () => {
    const engagements = {
      nodes: [{ commitment: EngagementCommitmentEnum.FULL_TIME }]
    }

    expect(getCurrentEngagementCommitment(engagements)).toEqual(
      EngagementCommitmentEnum.FULL_TIME
    )
  })

  it('returns a first commitment string when some nodes exist', () => {
    const engagements = {
      nodes: [
        { commitment: EngagementCommitmentEnum.HOURLY },
        { commitment: EngagementCommitmentEnum.FULL_TIME }
      ]
    }

    expect(getCurrentEngagementCommitment(engagements)).toEqual(
      EngagementCommitmentEnum.HOURLY
    )
  })
})
