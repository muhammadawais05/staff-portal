import { OperationValue, RequestOperation } from '~integration/types'

const getSingleOperationResponse = (
  fetchOperations: { [key: string]: OperationValue },
  { operationName, query, variables }: RequestOperation
) => {
  const operationResult = fetchOperations[operationName]

  if (!operationResult) {
    return
  }

  if (typeof operationResult === 'function') {
    return operationResult({ variables, query })
  }

  return operationResult
}

export default getSingleOperationResponse
