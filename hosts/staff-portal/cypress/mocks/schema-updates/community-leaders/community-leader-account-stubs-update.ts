import {
  CommunityLeaderStatus,
  CommunityLeaderType
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock, hiddenOperationMock } from '~integration/mocks'
import { successMutationMock } from '~integration/mocks/mutations'

const updateAppliedCommunityLeaderAccountsMock = () => {
  const approveMutation = {
    ApproveCommunityLeader: {
      data: { approveCommunityLeaderApplication: successMutationMock() }
    }
  }
  const rejectMutation = {
    RejectCommunityLeaderApplication: {
      data: { rejectCommunityLeaderApplication: successMutationMock() }
    }
  }
  const pauseMutation = {
    HoldCommunityLeaderApplication: {
      data: { holdCommunityLeaderApplication: successMutationMock() }
    }
  }

  cy.stubGraphQLRequests({
    CommunityLeadersAccounts: {
      data: {
        communityLeaderAccounts: {
          nodes: [
            {
              application: {
                id: encodeEntityId('123', 'CommunityLeaderApplication'),
                createdAt: '2022-02-04T15:23:56+03:00',
                interestedIn: CommunityLeaderType.COMMUNITY_LEADER,
                updatedAt: '2022-05-16T22:18:41+02:00',
                holdComment: null,
                initialIdeas: 'being the best cl',
                commitment: true,
                performerComment: null,
                slackChannel: 'a',
                type: CommunityLeaderType.COMMUNITY_LEADER,
                __typename: 'CommunityLeaderApplication',
                status: CommunityLeaderStatus.APPLIED
              },
              appliedStaffRole: null,
              appliedTalentRole: {
                __typename: 'Talent',
                email: null,
                id: encodeEntityId('123', 'Talent'),
                fullName: 'Euna Conroy',
                photo: null,
                location: null,
                webResource: {
                  text: 'Euna Conroy',
                  url: 'https://staging.toptal.net/platform/staff/talents/123',
                  __typename: 'Link'
                },
                roleFlags: {
                  nodes: [
                    {
                      flag: {
                        id: encodeEntityId('123', 'Flag'),
                        title: 'High Quality Headshot',
                        __typename: 'Flag'
                      },
                      __typename: 'RoleFlag'
                    }
                  ],
                  __typename: 'RoleFlagConnection'
                }
              },
              id: encodeEntityId('123', 'CommunityLeaderAccount'),
              node: null,
              operations: {
                appointCommunityLeader: hiddenOperationMock(),
                updateCommunityLeader: enabledOperationMock(),
                removeCommunityLeader: hiddenOperationMock(),
                approveCommunityLeaderApplication: enabledOperationMock(),
                rejectCommunityLeaderApplication: enabledOperationMock(),
                restoreCommunityLeader: hiddenOperationMock(),
                holdCommunityLeaderApplication: enabledOperationMock(),
                unfeatureCommunityLeader: hiddenOperationMock(),
                featureCommunityLeader: hiddenOperationMock(),
                __typename: 'CommunityLeaderOperations'
              },
              status: CommunityLeaderStatus.APPLIED,
              type: CommunityLeaderType.COMMUNITY_LEADER,
              __typename: 'CommunityLeaderAccount'
            }
          ],
          totalCount: 1,
          __typename: 'CommunityLeaderAccountConnection'
        }
      }
    },
    ...approveMutation,
    ...rejectMutation,
    ...pauseMutation
  })
}

export default updateAppliedCommunityLeaderAccountsMock
