import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { createOperation } from '@staff-portal/talents/src/mocks'

import { StepOperation } from '../../types'
import { createStep } from '../../test-utils'
import { getEnabledSecondaryOperations } from '../get-enabled-secondary-operations'

const arrangeTest = () => ({
  stepWithNoSecondaryOperations: createStep(),
  stepWithResetOperation: createStep({
    operations: {
      [StepOperation.Reset]: createOperation(OperationCallableTypes.ENABLED)
    }
  }),
  stepWithEmailOperations: createStep({
    operations: {
      [StepOperation.SendIntroductionEmail]: createOperation(
        OperationCallableTypes.ENABLED
      ),
      [StepOperation.SendRescheduleEmail]: createOperation(
        OperationCallableTypes.ENABLED
      ),
      [StepOperation.SendRestorationEmail]: createOperation(
        OperationCallableTypes.ENABLED
      )
    }
  }),
  stepWithAssignmentOperations: createStep({
    operations: {
      [StepOperation.Reassign]: createOperation(OperationCallableTypes.ENABLED),
      [StepOperation.Unassign]: createOperation(OperationCallableTypes.ENABLED)
    }
  })
})

describe('getEnabledSecondaryOperations', () => {
  it('returns no secondary operations when step has all operations invisible', () => {
    const { stepWithNoSecondaryOperations } = arrangeTest()
    const secondaryOperations = getEnabledSecondaryOperations(
      stepWithNoSecondaryOperations
    )

    expect(secondaryOperations).toEqual([])
  })

  it('returns reset operation', () => {
    const { stepWithResetOperation } = arrangeTest()
    const secondaryOperations = getEnabledSecondaryOperations(
      stepWithResetOperation
    )

    expect(secondaryOperations).toEqual([StepOperation.Reset])
  })

  it('returns sending email operations', () => {
    const { stepWithEmailOperations } = arrangeTest()
    const secondaryOperations = getEnabledSecondaryOperations(
      stepWithEmailOperations
    )

    expect(secondaryOperations).toEqual([
      StepOperation.SendIntroductionEmail,
      StepOperation.SendRestorationEmail,
      StepOperation.SendRescheduleEmail
    ])
  })

  it('returns assignment operations', () => {
    const { stepWithAssignmentOperations } = arrangeTest()
    const secondaryOperations = getEnabledSecondaryOperations(
      stepWithAssignmentOperations
    )

    expect(secondaryOperations).toEqual([
      StepOperation.Reassign,
      StepOperation.Unassign
    ])
  })
})
