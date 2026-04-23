import { gql } from '@apollo/client'

export default gql`
  mutation DownloadPaymentsFromSearch(
    $input: DownloadPaymentsFromSearchInput!
  ) {
    downloadPaymentsFromSearch(input: $input) {
      reportUrl
      reportGenerationScheduled

      notice
      success
      errors {
        message
        code
        key
      }
    }
  }
`
