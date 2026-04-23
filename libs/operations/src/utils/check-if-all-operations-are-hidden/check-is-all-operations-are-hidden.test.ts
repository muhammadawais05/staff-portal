import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import checkIfAllOperationsAreHidden from './check-is-all-operations-are-hidden'

const createOperation = (callableType: OperationCallableTypes) => ({
  callable: callableType,
  messages: [],
  __typename: 'Operation'
})

describe('Check if all operations are hidden', () => {
  it('all operations are hidden', () => {
    const hiddenOperations = {
      updateOperation: createOperation(OperationCallableTypes.HIDDEN),
      someOtherOperation: createOperation(OperationCallableTypes.HIDDEN),
      updateSomethingOperation: createOperation(OperationCallableTypes.HIDDEN)
    }

    expect(checkIfAllOperationsAreHidden(hiddenOperations)).toBeTruthy()
  })

  it('some of the operations are active', () => {
    const mixedOperation = {
      updateOperation: createOperation(OperationCallableTypes.HIDDEN),
      someOtherOperation: createOperation(OperationCallableTypes.HIDDEN),
      updateSomethingOperation: createOperation(OperationCallableTypes.ENABLED)
    }

    expect(checkIfAllOperationsAreHidden(mixedOperation)).toBeFalsy()
  })
})
