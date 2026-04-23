import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { COMPANY_OVERVIEW_FRAGMENT } from '../../../../../data/company-overview-fragment.staff.gql'
import { SetPushClientToSalesforceDocument } from './push-client-to-salesforce.staff.gql.types'

export const PUSH_TO_SALESFORCE = gql`
  mutation SetPushClientToSalesforce($input: PushClientToSalesforceInput!) {
    pushClientToSalesforce(input: $input) {
      client {
        id
        ...CompanyOverviewFragment
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
  ${COMPANY_OVERVIEW_FRAGMENT}
`

export const usePushClientToSalesforce = () =>
  useMutation(SetPushClientToSalesforceDocument)
