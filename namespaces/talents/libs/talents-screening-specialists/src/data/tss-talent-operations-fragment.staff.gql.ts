import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

export const TSS_TALENT_OPERATIONS_FRAGMENT = gql`
  fragment TssTalentOperationsFragment on TalentOperations {
    assignScreeningSpecialistToTalent {
      ...OperationFragment
    }
  }

  ${OPERATION_FRAGMENT}
`
