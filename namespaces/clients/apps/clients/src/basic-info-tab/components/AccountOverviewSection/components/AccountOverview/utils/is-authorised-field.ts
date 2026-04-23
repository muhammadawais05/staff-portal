import { ApolloError, checkIfFieldIsForbidden } from '@staff-portal/data-layer-service'

export const isAuthorisedField = (
  error: ApolloError | undefined,
  fieldName: string
): boolean => !checkIfFieldIsForbidden(fieldName, error)
