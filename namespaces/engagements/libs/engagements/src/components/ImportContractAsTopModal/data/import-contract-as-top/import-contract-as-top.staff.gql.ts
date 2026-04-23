import { gql } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

export const IMPORT_CONTRACT_AS_TOP = gql`
  mutation ImportContractAsTop($input: ImportContractAsTopInput!) {
    importContractAsTop(input: $input) {
      ...MutationResultFragment
      engagement {
        id
        job {
          id
        }
      }
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`
