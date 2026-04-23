import { gql } from '@apollo/client'

import { commercialDocumentMutationFragment } from '../../../../__fragments__/commercialDocumentMutationFragment.graphql'

export default gql`
  mutation SetUpdateCommercialDocumentDueDate(
    $input: UpdateCommercialDocumentDueDateInput!
  ) {
    updateCommercialDocumentDueDate(input: $input) {
      commercialDocument {
        ...CommercialDocumentMutationFragment
      }
      notice
      success
      errors {
        key
        message
        code
      }
    }
  }

  ${commercialDocumentMutationFragment}
`
