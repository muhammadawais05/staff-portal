import { MockedResponse } from '@staff-portal/data-layer-service'
import { Link } from '@staff-portal/graphql/staff'

import { GetAgreementAcceptancesQuery } from './get-acceptances.staff.gql.types'
import { GET_AGREEMENT_ACCEPTANCES_LINKS } from './get-acceptances.staff.gql'

export const createGetAgreementAcceptancesQueryMock = (
  agreementAcceptancesLinks: Link[] = [],
  clientId = 'mock-id'
): GetAgreementAcceptancesQuery => {
  const client = {
    id: clientId,
    agreementAcceptancesLinks
  }

  return {
    staffNode: { ...client }
  }
}

export const createGetAgreementAcceptancesLinksMock = (
  agreementAcceptancesLinks: Link[] = [],
  clientId = 'mock-id'
) => ({
  request: {
    query: GET_AGREEMENT_ACCEPTANCES_LINKS,
    variables: { clientId }
  },
  result: {
    data: createGetAgreementAcceptancesQueryMock(
      agreementAcceptancesLinks,
      clientId
    )
  }
})

export const createGetAgreementAcceptancesLinksFailedMock = (
  clientId = 'mock-id',
  errorMessage?: string
): MockedResponse => ({
  request: {
    query: GET_AGREEMENT_ACCEPTANCES_LINKS,
    variables: { clientId }
  },
  error: new Error(errorMessage)
})
