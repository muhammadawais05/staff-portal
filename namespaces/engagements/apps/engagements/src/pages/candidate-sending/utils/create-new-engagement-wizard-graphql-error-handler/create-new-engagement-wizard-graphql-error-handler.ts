import { GraphQLError } from 'graphql'
import {
  GraphQLErrorCode,
  isInvalidArgumentGqlError,
  ErrorHandler
} from '@staff-portal/data-layer-service'
import { NewEngagementWizardAttributes } from '@staff-portal/graphql/staff'

const missingEntityIdArgumentNames: (keyof NewEngagementWizardAttributes)[] = [
  'jobId',
  'talentId',
  'engagementId'
]

const isMissingEntityIdError = (error: GraphQLError) => {
  return (
    isInvalidArgumentGqlError(error) &&
    error.path?.includes('newEngagementWizard') &&
    missingEntityIdArgumentNames.includes(error.extensions.argument)
  )
}

const transformErrorToEmptyError = (error: GraphQLError): void => {
  error.extensions.code = GraphQLErrorCode.EMPTY
}

const createNewEngagementWizardGraphqlErrorHandler =
  (): ErrorHandler =>
  ({ graphQLErrors }) => {
    graphQLErrors?.forEach(error => {
      if (!isMissingEntityIdError(error)) {
        return
      }

      transformErrorToEmptyError(error)
    })
  }

export default createNewEngagementWizardGraphqlErrorHandler
