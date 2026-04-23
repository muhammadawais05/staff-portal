import { CommunityLeaderOperations } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { successMutationMock } from '~integration/mocks/mutations'
import {
  enabledOperationMock,
  hiddenOperationMock,
  talentCommunityLeaderMock
} from '~integration/mocks'
import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { talentsSharedStubs } from '~integration/mocks/request-stubs/talents/shared-stubs'

const updateMakeCommunityLeaderRequestsStub = ({
  useSharedStub
}: { useSharedStub?: boolean } = {}) => {
  const defaultStubs = useSharedStub
    ? talentsSharedStubs()
    : talentProfileStubs()

  return cy.stubGraphQLRequests({
    ...defaultStubs,
    GetCommunityLeader: {
      data: talentCommunityLeaderMock({
        operations: {
          appointCommunityLeader: enabledOperationMock(),
          updateCommunityLeader: hiddenOperationMock(),
          removeCommunityLeader: hiddenOperationMock()
        } as unknown as CommunityLeaderOperations,
        status: null
      })
    },
    AppointCommunityLeader: {
      data: {
        appointCommunityLeader: successMutationMock()
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

export default updateMakeCommunityLeaderRequestsStub
