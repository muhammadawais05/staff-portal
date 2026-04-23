import { gql, useMutation } from '@staff-portal/data-layer-service'
import { MUTATION_RESULT_FRAGMENT } from '@staff-portal/mutation-result-handlers'

import {
  ConvertToSourcingFlowDocument,
  ConvertToSourcingFlowMutation
} from './use-convert-to-sourcing-flow.staff.gql.types'

export const CONVERT_TO_SOURCING_FLOW: typeof ConvertToSourcingFlowDocument = gql`
  mutation ConvertToSourcingFlow($input: ConvertTalentToSourcingFlowInput!) {
    convertToSourcingFlow(input: $input) {
      ...MutationResultFragment
    }
  }

  ${MUTATION_RESULT_FRAGMENT}
`

export const useConvertToSourcingFlow = ({
  onError,
  onCompleted
}: {
  onError: (error: Error) => void
  onCompleted: (data: ConvertToSourcingFlowMutation) => void
}) =>
  useMutation(CONVERT_TO_SOURCING_FLOW, {
    onError,
    onCompleted
  })
