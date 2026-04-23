import gql from 'graphql-tag'

export default gql`
  mutation SetDownloadClientBillingReport(
    $input: DownloadClientBillingReportInput!
  ) {
    downloadClientBillingReport(input: $input) {
      success
      errors {
        key
        code
        message
      }
      downloadUrl
    }
  }
`
