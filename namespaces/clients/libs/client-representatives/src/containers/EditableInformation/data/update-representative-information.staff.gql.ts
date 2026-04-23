import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export default gql`
  mutation UpdateCompanyRepresentativeInformation(
    $input: UpdateCompanyRepresentativeProfileInput!
  ) {
    updateCompanyRepresentativeProfile(input: $input) {
      companyRepresentative {
        id
        information
      }
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
