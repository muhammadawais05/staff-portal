import {
  CommunityLeaderOperations,
  CommunityLeaderStatus
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { talentProfileStubs } from '~integration/mocks/request-stubs/talents/tabs/talent-profile'
import { successMutationMock } from '~integration/mocks/mutations'
import {
  enabledOperationMock,
  hiddenOperationMock,
  talentCommunityLeaderMock
} from '~integration/mocks'
import { talentsSharedStubs } from '~integration/mocks/request-stubs/talents/shared-stubs'

const updateRestoreCommunityLeaderRequestsStub = ({
  useSharedStub
}: { useSharedStub?: boolean } = {}) => {
  const defaultStubs = useSharedStub
    ? talentsSharedStubs()
    : talentProfileStubs()

  cy.stubGraphQLRequests({
    ...defaultStubs,
    GetCommunityLeader: {
      data: talentCommunityLeaderMock({
        operations: {
          removeCommunityLeader: hiddenOperationMock(),
          restoreCommunityLeader: enabledOperationMock(),
          featureCommunityLeader: hiddenOperationMock()
        } as unknown as CommunityLeaderOperations,
        status: CommunityLeaderStatus.DELETED
      })
    },
    UpdateCommunityLeader: {
      data: {
        updateCommunityLeader: successMutationMock()
      }
    },
    RestoreCommunityLeader: {
      data: {
        restoreCommunityLeader: successMutationMock()
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

export default updateRestoreCommunityLeaderRequestsStub
