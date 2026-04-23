import { SkillRating } from '@staff-portal/graphql/staff'

import { GetApproveJobDetailsQuery } from './get-approve-job-details.staff.gql.types'
import { JobDetails } from '../../types'

export const createAdditionalDetailsMock = (
  additionalDetails?: Partial<GetApproveJobDetailsQuery['node']>
): {
  node: JobDetails
  viewer: GetApproveJobDetailsQuery['viewer']
} => ({
  viewer: {
    me: {
      id: '1',
      inTalentMatchers: false
    },
    permits: {
      canManageJobMaxHourlyRate: true
    }
  },
  node: {
    id: '1',
    title: 'test job',
    requiresMatchingCallInfo: false,
    commitment: undefined,
    description: undefined,
    noRateLimit: false,
    longshotReasons: undefined,
    defaultSkillCategory: { id: '1' },
    client: {
      id: '1',
      jobDepositCanBeIssued: false,
      depositInvoices: undefined
    },
    skillSets: {
      nodes: [
        {
          id: '1',
          main: true,
          rating: SkillRating.EXPERT,
          niceToHave: true,
          skill: {
            id: '1',
            name: 'Skill Name',
            category: { id: '1', title: 'Other' },
            competentProfilesCount: 10,
            expertProfilesCount: 12,
            strongProfilesCount: 13,
            totalProfilesCount: 35
          }
        }
      ]
    },
    limitedAvailabilityRequestsExperiment: undefined,
    possiblyRelatedMeetings: { nodes: [] },
    ...additionalDetails
  }
})
