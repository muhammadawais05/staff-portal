import { gql } from '@apollo/client'

export default gql`
  mutation DownloadCommissions($input: DownloadCommissionsInput!) {
    downloadCommissions(input: $input) {
      success
      downloadUrl
      errors {
        ...UserErrorFragment
      }
    }
  }
`
