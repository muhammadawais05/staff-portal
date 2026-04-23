import { UserError } from '@staff-portal/graphql/staff'
import { DocumentNode } from '@staff-portal/data-layer-service'

interface Params<Mutation> {
  options: BaseOptions<Mutation>
  successOptions?: SuccessOptions
  errorOptions?: ErrorOptions
}

interface BaseOptions<Mutation> {
  query: DocumentNode
  key: keyof Mutation
  keyTypename: string
}

interface SuccessOptions {
  additionalResponse: Record<string, unknown>
}

interface ErrorOptions {
  additionalResponse: Record<string, unknown>
}

const createMutationMocks = <Input, Mutation>({
  options: { query, key, keyTypename },
  successOptions,
  errorOptions
}: Params<Mutation>) => {
  const success = (inputData: Input) => ({
    request: {
      query,
      variables: {
        input: inputData
      }
    },
    result: {
      data: {
        [key]: {
          success: true,
          errors: [],
          __typename: keyTypename,
          ...successOptions?.additionalResponse
        }
      }
    }
  })

  const failed = (inputData: Input) => ({
    request: {
      query,
      variables: {
        input: inputData
      }
    },
    error: new Error('Failed request')
  })

  const invalid = (inputData: Input, errors: Partial<UserError>[] = []) => ({
    request: {
      query,
      variables: {
        input: inputData
      }
    },
    result: {
      data: {
        [key]: {
          success: false,
          errors: errors.map(error => ({
            code: 'base',
            key: 'base',
            message: 'Default user error',
            __typename: 'UserError',
            ...error
          })),
          __typename: keyTypename,
          ...errorOptions?.additionalResponse
        }
      }
    }
  })

  return { success, failed, invalid }
}

export default createMutationMocks
