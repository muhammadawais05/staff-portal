import { useState } from 'react'

export const useHandleOperationClick = (initialState = false) => {
  const [operationIsLoading, setOperationIsLoading] = useState(initialState)

  const handleOperationClick = (checkOperation: () => void) => () => {
    setOperationIsLoading(true)
    checkOperation()
  }

  return {
    operationIsLoading,
    setOperationIsLoading,
    handleOperationClick
  }
}
