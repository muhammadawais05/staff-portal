import { createMutationMocks } from '@staff-portal/test-utils'

import {
  CreateSourcingRequestMutationVariables,
  CreateSourcingRequestMutation,
  CreateSourcingRequestDocument
} from './create-sourcing-request.staff.gql.types'

export const {
  success: createSuccessfulCreateSourcingRequestMock,
  invalid: createInvalidCreateSourcingRequestMock,
  failed: createFailedCreateSourcingRequestMock
} = createMutationMocks<
  Partial<CreateSourcingRequestMutationVariables['input']>,
  CreateSourcingRequestMutation
>({
  options: {
    query: CreateSourcingRequestDocument,
    key: 'createSourcingRequest',
    keyTypename: 'CreateSourcingRequestPayload'
  }
})
