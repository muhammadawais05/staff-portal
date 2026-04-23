import { UserError, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { createGetLazyOperationMock } from '@staff-portal/operations/src/mocks'
import { NodeType } from '@staff-portal/graphql'

import { ApproveTalentIdVerificationMutationVariables } from './data/approve-talent-id-verification'
import { APPROVE_TALENT_ID_VERIFICATION } from './data/approve-talent-id-verification/approve-talent-id-verification.staff.gql'

export const createApproveTalentIdVerificationMock = (
  input: ApproveTalentIdVerificationMutationVariables['input']
): MockedResponse => {
  return {
    request: {
      query: APPROVE_TALENT_ID_VERIFICATION,
      variables: { input }
    },
    result: {
      data: {
        approveTalentIdVerification: {
          success: true,
          errors: [],
          __typename: 'ApproveTalentIdVerificationPayload'
        }
      }
    }
  }
}

export const createApproveTalentIdVerificationInvalidMock = ({
  input,
  errors = []
}: {
  input: ApproveTalentIdVerificationMutationVariables['input']
  errors?: UserError[]
}) => ({
  request: { query: APPROVE_TALENT_ID_VERIFICATION, variables: { input } },
  result: {
    data: {
      approveTalentIdVerification: {
        success: false,
        errors: errors.map(error => ({
          ...error,
          __typename: 'UserError'
        })),
        __typename: 'ApproveTalentIdVerificationPayload'
      }
    }
  }
})

export const createApproveTalentIdVerificationFailedMock = ({
  talentId
}: {
  talentId: string
}) => ({
  request: {
    query: APPROVE_TALENT_ID_VERIFICATION,
    variables: { talentId }
  },
  error: new Error('Network error occurred')
})

export const getOperationMock = (
  talentId: string,
  result: OperationCallableTypes
) => {
  return createGetLazyOperationMock({
    operation: {
      callable: result,
      messages: []
    },
    variables: {
      nodeId: talentId,
      nodeType: NodeType.TALENT,
      operationName: 'approveTalentIdVerification'
    }
  })
}
