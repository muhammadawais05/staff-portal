import { TalentEngagementScope } from '@staff-portal/graphql/staff'

import { GET_ASSIGNED_TALENT_ENGAGEMENTS } from './get-talent-engagements.staff.gql'

export const createGetCurrentTalentEngagementsMock = (
  roleId: string,
  id: string,
  title: string
) => ({
  request: {
    query: GET_ASSIGNED_TALENT_ENGAGEMENTS,
    variables: {
      roleId,
      filter: { scopes: [TalentEngagementScope.ASSIGNED] }
    }
  },
  result: {
    data: {
      node: {
        id: roleId,
        engagements: {
          nodes: [
            {
              id: id,
              webResource: {
                text: title,
                __typename: 'Link'
              },
              __typename: 'Engagement'
            }
          ],
          __typename: 'TalentEngagementConnection'
        },
        __typename: 'Talent'
      }
    }
  }
})

export const createGetCurrentTalentEngagementsMocks = (
  roleId: string,
  engagementStatus: {
    id: string
    title: string
  }[]
) => ({
  request: {
    query: GET_ASSIGNED_TALENT_ENGAGEMENTS,
    variables: {
      roleId,
      filter: { scopes: [TalentEngagementScope.ASSIGNED] }
    }
  },
  result: {
    data: {
      node: {
        id: roleId,
        engagements: {
          nodes: engagementStatus.map(({ id, title }) => ({
            id: id,
            webResource: {
              text: title,
              __typename: 'Link'
            },
            __typename: 'Engagement'
          })),
          __typename: 'TalentEngagementConnection'
        },
        __typename: 'Talent'
      }
    }
  }
})
