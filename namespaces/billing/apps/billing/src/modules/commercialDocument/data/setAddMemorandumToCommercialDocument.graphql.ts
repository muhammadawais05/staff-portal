import { gql } from '@apollo/client'

export default gql`
  mutation SetAddMemorandumToCommercialDocument(
    $input: AddMemorandumToCommercialDocumentInput!
  ) {
    addMemorandumToCommercialDocument(input: $input) {
      success
      errors {
        code
        key
        message
      }
    }
  }
`
