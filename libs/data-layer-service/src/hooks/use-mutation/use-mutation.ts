import {
  ApolloError,
  OperationVariables,
  DocumentNode,
  useMutation as ApolloUseMutation
} from '@apollo/client'
import { TypedDocumentNode } from '@graphql-typed-document-node/core'

import {
  MutationTuple,
  MutationValidationError,
  MutationHookOptions
} from './types'
import useGetHandleMutationError from './utils/use-get-handle-mutation-error'

export const useMutation = <
  /* eslint-disable @typescript-eslint/no-explicit-any */
  TData extends Record<string, any>,
  TVariables = OperationVariables
>(
  mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
  {
    onError,
    onCompleted,
    onValidationError,
    onRootLevelError,
    ...rest
  }: MutationHookOptions<TData, TVariables> = {}
): MutationTuple<TData, TVariables> => {
  const handleMutationError = useGetHandleMutationError({
    onError,
    onRootLevelError
  })

  return ApolloUseMutation(mutation, {
    ...rest,
    onCompleted: (data: TData) => {
      // internal server errors can result in a 200 response without data
      // onError is not triggered in this case
      // so we throw an error manually here, which triggers onError
      if (data === null) {
        throw new ApolloError({
          errorMessage: 'Null mutation response'
        })
      }

      if (!onValidationError) {
        return onCompleted?.(data)
      }

      const validationErrors = data
        ? Object.keys(data).reduce((acc, key) => {
            const errors = data[key].errors

            if (errors) {
              return acc.concat(errors)
            }

            return acc
          }, [] as MutationValidationError[])
        : []

      if (validationErrors?.length) {
        onValidationError(validationErrors)
      } else {
        onCompleted?.(data)
      }
    },
    onError: handleMutationError
  })
}
