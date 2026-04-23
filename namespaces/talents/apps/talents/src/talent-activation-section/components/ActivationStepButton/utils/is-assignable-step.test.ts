import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { StepOperation } from '../../../types'
import { isAssignableStep } from './is-assignable-step'
import { createStep } from '../../../test-utils'

const ASSIGNABLE_OPERATIONS = [
  StepOperation.Assign,
  StepOperation.Reassign,
  StepOperation.Unassign
]
const NON_ASSIGNABLE_OPERATIONS = Object.keys(StepOperation).filter(
  type => !ASSIGNABLE_OPERATIONS.includes(type as StepOperation)
) as StepOperation[]

const createStepsFromOperationTypes = (
  operationTypes: StepOperation[],
  enabled = true
) =>
  operationTypes.map(operation =>
    createStep({
      operations: {
        [operation]: {
          callable: enabled
            ? OperationCallableTypes.ENABLED
            : OperationCallableTypes.DISABLED,
          messages: []
        }
      }
    })
  )

const arrangeTest = () => ({
  stepsWithAssignableOperationsEnabled: createStepsFromOperationTypes(
    ASSIGNABLE_OPERATIONS
  ),
  stepsWithAssignableOperationsDisabled: createStepsFromOperationTypes(
    NON_ASSIGNABLE_OPERATIONS
  ).concat(createStepsFromOperationTypes(ASSIGNABLE_OPERATIONS, false)),
  stepsWithAssignableOperationsHidden: createStepsFromOperationTypes(
    NON_ASSIGNABLE_OPERATIONS
  )
})

describe('isAssignableStep', () => {
  it('steps with assignable operations enabled are assignable', () => {
    const { stepsWithAssignableOperationsEnabled } = arrangeTest()

    stepsWithAssignableOperationsEnabled.forEach(step =>
      expect(isAssignableStep(step)).toBeTruthy()
    )
  })

  it('steps with assignable operations disabled are not assignable', () => {
    const { stepsWithAssignableOperationsDisabled } = arrangeTest()

    stepsWithAssignableOperationsDisabled.forEach(step =>
      expect(isAssignableStep(step)).toBeFalsy()
    )
  })

  it('steps with assignable operations hidden are not assignable', () => {
    const { stepsWithAssignableOperationsHidden } = arrangeTest()

    stepsWithAssignableOperationsHidden.forEach(step =>
      expect(isAssignableStep(step)).toBeFalsy()
    )
  })
})
