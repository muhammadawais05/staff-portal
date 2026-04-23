import { gql } from '@apollo/client'

import { commercialDocumentFragment } from '../../../../__fragments__/commercialDocumentFragment.graphql'

export default gql`
  mutation SetResolveDisputeResolution(
    $input: ResolveDisputeOfCommercialDocumentInput!
  ) {
    resolveDisputeOfCommercialDocument(input: $input) {
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

  ${commercialDocumentFragment}
`
