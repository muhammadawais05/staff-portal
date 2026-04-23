import { CallbackRequest } from '@staff-portal/graphql/staff'

import { OperationValue } from '~integration/types'
import {
  getCallRequestsListResponse,
  getCallRequestResponse
} from '../responses'

export const callRequestsPageStubs = (
  callRequest?: Partial<CallbackRequest>
): {
  [key: string]: OperationValue
} => ({
  GetCallRequestsList: getCallRequestsListResponse(callRequest),
  GetCallRequest: getCallRequestResponse(callRequest),
  GetClaimCallRequest: getCallRequestResponse(callRequest),
  TouchCounter: {
    data: {
      touchCounter: {
        success: true,
        errors: [],
        __typename: 'TouchCounterPayload',
        counter: {
          name: 'callback_requests_unclaimed',
          total: 9,
          unread: 0,
          __typename: 'Counter'
        }
      }
    }
  },
  GetClaimers: {
    data: {
      roles: {
        nodes: [
          {
            id: 'VjEtU3RhZmYtMjQ0MjUwMA',
            fullName: 'Agueda Weimann',
            __typename: 'Staff'
          }
        ],
        __typename: 'StaffConnection'
      }
    }
  }
})
