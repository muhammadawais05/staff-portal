import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  ImportTalentContractDocument,
  ImportTalentContractMutation
} from './import-talent-contract.staff.gql.types'

export const IMPORT_TALENT_CONTRACT: typeof ImportTalentContractDocument = gql`
  mutation ImportTalentContract($input: ImportTalentContractInput!) {
    importTalentContract(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useImportTalentContract = ({
  onCompleted,
  onError
}: {
  onCompleted?: (data: ImportTalentContractMutation) => void
  onError?: (error: Error) => void
}) =>
  useMutation(IMPORT_TALENT_CONTRACT, {
    onCompleted,
    onError
  })
