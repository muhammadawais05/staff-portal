import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'

import { GetCallRequestDocument } from './get-call-request.staff.gql.types'

export interface GetCallRequestMockProps {
  id: string
  name?: string
  claimCallRequestOperation?: Operation & { __typename: string }
  claimCallbackRequestWithClientOperation?: Operation & { __typename: string }
}

export const createGetCallRequestMock = ({
  id,
  name = 'Christopher Jenkins',
  claimCallRequestOperation = {
    callable: OperationCallableTypes.ENABLED,
    messages: [],
    __typename: 'Operation'
  },
  claimCallbackRequestWithClientOperation = {
    callable: OperationCallableTypes.HIDDEN,
    messages: [],
    __typename: 'Operation'
  }
}: GetCallRequestMockProps) => ({
  request: { query: GetCallRequestDocument, variables: { id } },
  result: {
    data: {
      node: {
        id,
        name,
        claimedAt: null,
        createdAt: '2020-09-27T22:57:28+04:00',
        purpose: 'Sales',
        requestedStartTime: '2020-09-28T16:30:00+04:00',
        status: 'pending',
        type: 'scheduled',
        late: true,
        isNew: false,
        obscureLead: false,
        job: null,
        claimer: null,
        inWorkingHours: true,
        overlappingMeetings: {
          __typename: 'CallbackRequestOverlappingMeetingConnection',
          nodes: []
        },
        contacts: {
          nodes: []
        },
        operations: {
          claimCallbackRequest: claimCallRequestOperation,
          claimCallbackRequestWithClient:
            claimCallbackRequestWithClientOperation,
          removeCallbackRequest: {
            callable: 'ENABLED',
            messages: [],
            __typename: 'Operation'
          },
          __typename: 'CallbackRequestOperations'
        },
        client: {
          id: 'VjEtQ2xpZW50LTQ1MjIyMA',
          roleFlags: {
            __typename: 'RoleFlagConnection',
            nodes: []
          },
          claimer: {
            id: 'VjEtU3RhZmYtMTMzODEzNg',
            __typename: 'Staff'
          },
          contact: {
            id: 'test_id',
            fullName: 'Anibal Hudson',
            contacts: {
              nodes: [
                {
                  id: 'test-id',
                  type: 'PHONE',
                  value: '+34693812101',
                  __typename: 'Contact'
                }
              ],
              __typename: 'ContactConnection'
            },
            __typename: 'CompanyRepresentative'
          },
          createdAt: '2020-09-27T22:56:59+04:00',
          timeZone: {
            name: '(UTC-05:00) America - Chicago',
            __typename: 'TimeZone'
          },
          photo: {
            icon: 'https://uploads-staging.toptal.io/icon.png',
            __typename: 'Photo'
          },
          fullName: 'Schultz, Olson and Schroeder',
          netTerms: 10,
          country: {
            name: 'United States',
            id: 'VjEtQ291bnRyeS0yMzQ',
            __typename: 'Country'
          },
          webResource: {
            url: null,
            __typename: 'Link'
          },
          __typename: 'Client'
        },
        __typename: 'CallbackRequest'
      },
      __typename: 'Query'
    }
  }
})

export const createGetCallRequestFailedMock = ({ id }: { id: string }) => ({
  request: { query: GetCallRequestDocument, variables: { id } },
  error: new Error('Network error occurred')
})
