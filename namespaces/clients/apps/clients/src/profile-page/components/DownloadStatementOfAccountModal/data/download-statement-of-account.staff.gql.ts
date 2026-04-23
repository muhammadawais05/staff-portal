import { useMutation } from '@staff-portal/data-layer-service'
import gql from 'graphql-tag'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import { DownloadStatementsOfAccountDocument } from './download-statement-of-account.staff.gql.types'

export default gql`
  mutation DownloadStatementsOfAccount(
    $input: DownloadStatementOfAccountInput!
  ) {
    downloadStatementOfAccount(input: $input) {
      notice
      downloadUrl
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useDownloadStatementsOfAccount = () =>
  useMutation(DownloadStatementsOfAccountDocument)
