/* eslint-disable max-lines */
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'

import { GetTalentProfileOperationsQueryVariables } from './get-talent-profile-operations.staff.gql.types'
import { GET_TALENT_PROFILE_OPERATIONS } from './get-talent-profile-operations.staff.gql'

export const createGetTalentProfileOperationsMock = ({
  talentId = '123'
}: {
  talentId: string
}): MockedResponse => {
  const talentProfileOperations = {
    node: {
      id: talentId || '123',
      operations: {
        changeTalentSourcer: {
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        },
        changeRoleReferrer: {
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        },
        updateTalentReapplicationDate: {
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        },
        updateTalentSpecialHandling: {
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        },
        updateTalentSigningBonusDeadline: {
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        },
        addRoleFlag: {
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        },
        updateEligibleForRestoration: {
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        },
        discardTalentPrescreeningVideo: {
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        },
        approveTalentIdVerification: {
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        },
        updateBillingNotes: {
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        },
        updateTalentApplicantSkills: {
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        },
        subscribeToTalentAvailabilityUpdates: {
          callable: OperationCallableTypes.ENABLED,
          messages: [],
          __typename: 'Operation'
        },
        __typename: 'TalentOperations'
      },
      __typename: 'Talent'
    }
  }

  return {
    request: {
      query: GET_TALENT_PROFILE_OPERATIONS,
      variables: { talentId: talentProfileOperations.node?.id }
    },
    result: {
      data: talentProfileOperations
    }
  }
}

export const createGetTalentProfileOperationsFailedMock = (
  variables: GetTalentProfileOperationsQueryVariables,
  errorMessage = 'fake error message.'
) => ({
  request: { query: GET_TALENT_PROFILE_OPERATIONS, variables },
  error: new Error(errorMessage)
})
