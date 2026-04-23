import {
  CommunityLeaderOperations,
  CommunityLeaderStatus
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { successMutationMock } from '~integration/mocks/mutations'
import {
  enabledOperationMock,
  hiddenOperationMock,
  talentCommunityLeaderMock
} from '~integration/mocks'
import { talentsSharedStubs } from '~integration/mocks/request-stubs/talents/shared-stubs'

const updateAppliedCommunityLeaderRequestsStub = () => {
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

  return cy.stubGraphQLRequests({
    ...talentsSharedStubs(),
    GetCommunityLeader: {
      data: talentCommunityLeaderMock({
        operations: {
          approveCommunityLeaderApplication: enabledOperationMock(),
          rejectCommunityLeaderApplication: enabledOperationMock(),
          holdCommunityLeaderApplication: enabledOperationMock(),
          featureCommunityLeader: hiddenOperationMock(),
          removeCommunityLeader: hiddenOperationMock(),
          updateCommunityLeader: hiddenOperationMock()
        } as unknown as CommunityLeaderOperations,
        status: CommunityLeaderStatus.APPLIED
      })
    },
    GetCommunityLeaderApplicationsHistory: {
      data: {
        communityLeader: {
          id: encodeEntityId('123', 'CommunityLeaderAccount'),
          applicationsHistory: []
        }
      }
    },
    GetCommunityLeaderWithNotes: {
      data: talentCommunityLeaderMock()
    },
    GetCommunityLeaderEvents: {
      data: {
        communityLeader: {
          id: encodeEntityId('123', 'CommunityLeaderAccount'),
          communityEvents: []
        }
      }
    },
    ...approveMutation,
    ...rejectMutation
  })
}

export default updateAppliedCommunityLeaderRequestsStub
