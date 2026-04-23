import { EngagementStatus } from '@staff-portal/graphql/staff'

import { JobCandidateIntroDraftsEngagementFragment } from '../data/get-candidate-intro-drafts'
import { getPitchSnippetEngagementIds } from './get-pitch-snippet-engagement-ids'

describe('#getPitchSnippetEngagementIds', () => {
  it('returns pitch snippet engagement ids', () => {
    const engagements = [
      { id: '1', status: EngagementStatus.ACTIVE },
      { id: '2', status: EngagementStatus.CANCELLED },
      { id: '3', status: EngagementStatus.CLOSED },
      { id: '4', status: EngagementStatus.DRAFT },
      { id: '5', status: EngagementStatus.END_SCHEDULED },
      { id: '6', status: EngagementStatus.EXPIRATION_POSTPONED },
      { id: '7', status: EngagementStatus.EXPIRED },
      { id: '8', status: EngagementStatus.ON_BREAK },
      { id: '9', status: EngagementStatus.ON_HOLD },
      { id: '10', status: EngagementStatus.ON_TRIAL },
      { id: '11', status: EngagementStatus.PENDING },
      { id: '12', status: EngagementStatus.PENDING_APPROVAL },
      { id: '13', status: EngagementStatus.PENDING_EXPIRATION },
      { id: '14', status: EngagementStatus.PENDING_LEGAL },
      { id: '15', status: EngagementStatus.READY_TO_SEND },
      { id: '16', status: EngagementStatus.REJECTED_DRAFT },
      { id: '17', status: EngagementStatus.REJECTED_INTERVIEW },
      { id: '18', status: EngagementStatus.REJECTED_TRIAL },
      { id: '19', status: EngagementStatus.REVIEWED },
      { id: '20', status: EngagementStatus.SCHEDULED },
      { id: '21', status: EngagementStatus.CANCELLED_DRAFT }
    ] as JobCandidateIntroDraftsEngagementFragment[]
    const expectedEngagementIds: string[] = ['4', '12', '15']

    expect(getPitchSnippetEngagementIds(engagements)).toEqual(
      expectedEngagementIds
    )
  })
})
