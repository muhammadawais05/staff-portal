import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation ConvertClientToTalent($input: ConvertClientToTalentInput!) {
    convertClientToTalent(input: $input) {
      ...MutationResultFragment
      talent {
        id
        fullName
        type
      }
    }
  }
  ${MUTATION_RESULT_FRAGMENT}
`
