import { gql } from '@apollo/client'

export default gql`
  mutation SetCreateEngagementPlacementFee(
    $input: CreateEngagementPlacementFeeInput!
  ) {
    createEngagementPlacementFee(input: $input) {
      placementFees {
        nodes {
          invoice {
            description
            amount
            id
          }
        }
      }
      success
      errors {
        code
        key
        message
      }
    }
  }
`
