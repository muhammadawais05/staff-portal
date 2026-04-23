import {
  OperationCallableTypes,
  VisualComplianceStatus
} from '@staff-portal/graphql/staff'

import { GET_CHECK_COMPLIANCE_STATUS } from './get-check-compliance-status.staff.gql'

export const createGetCheckComplianceStatusMock = ({
  id,
  ofacProhibited,
  visualComplianceStatus
}: {
  id: string
  ofacProhibited: boolean
  visualComplianceStatus: VisualComplianceStatus
}) => ({
  request: { query: GET_CHECK_COMPLIANCE_STATUS, variables: { clientId: id } },
  result: {
    data: {
      node: {
        id,
        ofacProhibited,
        visualComplianceStatus,
        operations: {
          checkClientCompliance: {
            callable: OperationCallableTypes.ENABLED,
            messages: [],
            __typename: 'Operation'
          },
          __typename: 'ClientOperations'
        },
        __typename: 'Client'
      }
    }
  }
})

export const createGetCheckComplianceStatusFailedMock = (
  id: string,
  errorMessage = 'fake error message.'
) => ({
  request: { query: GET_CHECK_COMPLIANCE_STATUS, variables: { clientId: id } },
  error: new Error(errorMessage)
})
