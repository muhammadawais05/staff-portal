import { MutationResult } from '@staff-portal/graphql/staff'

export const successMutationMock = <
  TAdditionalFields extends Record<string, unknown> = {}
>(
  additionalFields: TAdditionalFields = {} as TAdditionalFields
): MutationResult & TAdditionalFields => ({
  success: true,
  errors: [],
  ...additionalFields
})
