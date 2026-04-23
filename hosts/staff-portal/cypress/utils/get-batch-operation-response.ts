import { OperationValue, RequestOperation } from '~integration/types'

const getBatchOperationResponse = (
  fetchOperations: { [key: string]: OperationValue },
  requestBody: RequestOperation[]
) => {
  const result: object[] = []

  requestBody.forEach(({ operationName, query, variables }) => {
    const operationResult = fetchOperations[operationName]

    if (typeof operationResult === 'function') {
      result.push(operationResult({ variables, query }))
    } else if (operationResult) {
      result.push(operationResult)
    }
  })

  return result
}

export default getBatchOperationResponse
