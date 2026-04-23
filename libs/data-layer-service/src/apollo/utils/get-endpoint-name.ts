import { Operation } from '@apollo/client'

export const getEndpointName = (operation: Operation) => {
  const { type } = operation.getContext()

  return type
}
