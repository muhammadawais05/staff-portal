import {
  ApolloError,
  ServerError,
  HttpErrorStatusCode
} from '@staff-portal/data-layer-service'

const isInternalServerError = (error: Error | ApolloError) => {
  if (!(error instanceof ApolloError)) {
    return false
  }

  const { networkError } = error

  if (!networkError) {
    return false
  }

  const statusCode = (networkError as ServerError).statusCode

  return statusCode === HttpErrorStatusCode.INTERNAL_SERVER_ERROR
}

export default isInternalServerError
