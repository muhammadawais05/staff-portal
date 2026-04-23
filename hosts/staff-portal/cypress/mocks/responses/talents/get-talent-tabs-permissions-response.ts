import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentTabsPermissionsResponse = (talent?: Partial<Talent>) => ({
  data: {
    viewer: {
      permits: {
        canViewEngagements: true,
        canViewCommunityLeaders: true,
        __typename: 'Permits'
      },
      __typename: 'Viewer'
    },
    node: {
      id: encodeEntityId('123', 'Talent'),
      displayPerformanceProfileTab: false,
      talentPartner: null,
      topShieldApplication: null,
      jobApplications: {
        nodes: [],
        __typename: 'TalentJobApplicationConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
