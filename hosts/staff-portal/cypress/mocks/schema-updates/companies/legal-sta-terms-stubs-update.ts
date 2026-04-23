import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Contract } from '@staff-portal/graphql/staff'

import { companiesBasicTabStubs } from '~integration/mocks/request-stubs/companies/tabs'

const updateLegalStaTermsStubs = () =>
  cy.stubGraphQLRequests({
    ...companiesBasicTabStubs({
      activeStaContract: {
        id: encodeEntityId('123', 'Contract'),
        signatureReceivedAt: '2019-11-05T23:43:40+03:00',
        webResource: {
          url: 'https://staging.toptal.net/platform/staff/contracts/192000',
          text: 'tribe Client STA',
          __typename: 'Link'
        },
        staTerms: {
          standard: true,
          terminationPeriodInDays: 3,
          terminationPeriodApplicable: true,
          __typename: 'STATerms'
        },
        __typename: 'Contract'
      } as unknown as Contract
    })
  })

export default updateLegalStaTermsStubs
