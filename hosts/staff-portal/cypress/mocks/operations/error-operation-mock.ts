import { StandardUserError } from '@staff-portal/graphql/staff'

export const errorOperationMock = (errors: StandardUserError[] = []) => ({
  success: false,
  errors,
  client: null
})
