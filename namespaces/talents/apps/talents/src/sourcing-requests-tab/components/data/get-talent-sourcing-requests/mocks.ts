import { SourcingRequestStatus } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import {
  SourcingRequestFragment,
  GetTalentSourcingRequestsQueryVariables
} from './get-talent-sourcing-requests.staff.gql.types'
import { GET_TALENT_SOURCING_REQUESTS } from './get-talent-sourcing-requests.staff.gql'

export const createSourcingRequestMock = () => {
  return {
    id: encodeEntityId('1001', 'Test'),
    status: SourcingRequestStatus.ACTIVE_SOURCING,
    webResource: {
      text: 'Lead Program Developer (1002)',
      url: 'http://localhost:3000/platform/staff/jobs/1002#sourcing_request',
      __typename: 'Link'
    },
    job: {
      id: encodeEntityId('1002', 'Test'),
      __typename: 'Job',
      client: {
        id: encodeEntityId('1003', 'Test'),
        webResource: {
          text: 'Sneak Oil Co.',
          url: 'http://localhost:3000/platform/staff/companies/1003',
          __typename: 'Link'
        },
        __typename: 'Client'
      }
    },
    __typename: 'SourcingRequest'
  } as SourcingRequestFragment
}

export const createGetTalentSourcingRequestsLoadingMock = {}

export const createGetTalentSourcingRequestsFailedMock = (
  variables: GetTalentSourcingRequestsQueryVariables,
  errorMessage = 'fake error message.'
) => ({
  request: { query: GET_TALENT_SOURCING_REQUESTS, variables },
  error: new Error(errorMessage)
})
