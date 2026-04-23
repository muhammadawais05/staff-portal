import { createMutationMocks } from '@staff-portal/test-utils'

import {
  ConvertToSourcingFlowMutation,
  ConvertToSourcingFlowMutationVariables
} from './use-convert-to-sourcing-flow.staff.gql.types'
import { CONVERT_TO_SOURCING_FLOW } from '.'

export const {
  success: createConvertToSourcingFlowMock,
  failed: createConvertToSourcingFlowFailedMock,
  invalid: createConvertToSourcingFlowInvalidMock
} = createMutationMocks<
  ConvertToSourcingFlowMutationVariables['input'],
  ConvertToSourcingFlowMutation
>({
  options: {
    query: CONVERT_TO_SOURCING_FLOW,
    key: 'convertToSourcingFlow',
    keyTypename: 'ConvertTalentToSourcingFlowPayload'
  }
})
