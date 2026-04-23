import { CommunityLeaderStatus } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { successMutationMock } from '~integration/mocks/mutations'
import { talentCommunityLeaderMock } from '~integration/mocks/talent-community-leader-mock'
import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { talentsSharedStubs } from '~integration/mocks/request-stubs/talents/shared-stubs'

const updateRemoveCommunityLeaderRequestsStub = ({
  useSharedStub
}: { useSharedStub?: boolean } = {}) => {
  const defaultStubs = useSharedStub
    ? talentsSharedStubs()
    : talentProfileStubs()

  return cy.stubGraphQLRequests({
    ...defaultStubs,
    GetCommunityLeader: {
      data: talentCommunityLeaderMock({
        status: CommunityLeaderStatus.APPROVED
      })
    },
    RemoveCommunityLeader: {
      data: {
        removeCommunityLeader: successMutationMock()
      }
    },
    GetCommunityLeaderApplicationsHistory: {
      data: {
        communityLeader: {
          id: encodeEntityId('123', 'CommunityLeaderApplication'),
          applicationsHistory: []
        }
      }
    },
    GetCommunityLeaderWithNotes: {
      data: talentCommunityLeaderMock()
    }
  })
}

export default updateRemoveCommunityLeaderRequestsStub
