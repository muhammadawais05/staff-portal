import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentTabsCountersResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      sourcingRequests: {
        totalCount: 0,
        __typename: 'SourcingRequestConnection'
      },
      engagements: {
        jobCounters: {
          total: 0,
          __typename: 'TalentEngagementsJobCounters'
        },
        __typename: 'TalentEngagementConnection'
      },
      activitiesAndNotes: {
        totalCount: 3,
        __typename: 'ActivityOrNoteConnection'
      },
      infractions: {
        totalCount: 0,
        __typename: 'TalentInfractionConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
