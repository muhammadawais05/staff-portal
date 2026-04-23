import { gql } from '@apollo/client'

import { userErrorFragment } from '../../__fragments__/userErrorFragment.graphql'

export default gql`
  mutation SetUpdateClientInvestmentGrade(
    $input: UpdateClientInvestmentGradeInput!
  ) {
    updateClientInvestmentGrade(input: $input) {
      errors {
        ...UserErrorFragment
      }
      success
      client {
        id
        investmentGrade
      }
    }
  }

  ${userErrorFragment}
`
