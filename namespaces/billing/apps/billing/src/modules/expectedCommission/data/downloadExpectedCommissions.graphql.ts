import { gql } from '@apollo/client'

export default gql`
  mutation DownloadExpectedCommissions(
    $input: DownloadExpectedCommissionsInput!
  ) {
    downloadExpectedCommissions(input: $input) {
      success
      downloadUrl
      errors {
        ...UserErrorFragment
      }
    }
  }
`
