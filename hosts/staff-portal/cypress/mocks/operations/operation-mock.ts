import { OperationCallableTypes } from '@staff-portal/graphql/staff'

type ReturnType<T extends string> = Record<
  T,
  () => {
    callable: OperationCallableTypes
    messages: string[]
  }
>

export const operationMock = <T extends string>(
  key: T,
  callable: OperationCallableTypes,
  messages: string[] = []
): ReturnType<T> =>
  ({
    [key]: () => ({
      callable,
      messages
    })
  } as ReturnType<T>)
