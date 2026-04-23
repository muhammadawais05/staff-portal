import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { DownloadRolePaymentHistoryDocument } from './download-role-payment-history.staff.gql.types'

export const DOWNLOAD_ROLE_PAYMENT_HISTORY: typeof DownloadRolePaymentHistoryDocument = gql`
  mutation DownloadRolePaymentHistory(
    $input: DownloadRolePaymentHistoryInput!
  ) {
    downloadRolePaymentHistory(input: $input) {
      ...MutationResultFragment
      downloadUrl
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
