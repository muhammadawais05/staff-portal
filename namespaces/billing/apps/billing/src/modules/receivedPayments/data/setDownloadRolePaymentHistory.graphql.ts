import { gql } from '@apollo/client'

export default gql`
  mutation DownloadRolePaymentHistory(
    $input: DownloadRolePaymentHistoryInput!
  ) {
    downloadRolePaymentHistory(input: $input) {
      downloadUrl
      errors {
        ...UserErrorFragment
      }
      notice
      success
    }
  }
`
