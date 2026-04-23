import {
  Operation,
  OperationCallableTypes,
  StepStatus
} from '@staff-portal/graphql/staff'
import { StepIndicatorColor } from '@staff-portal/ui'

import { getIndicatorData } from './get-indicator-data'
import { createStep } from '../../../test-utils'

const defaultOperation = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
} as Operation

const defaultParams = {
  stepStatus: StepStatus.NEW,
  operation: defaultOperation,
  indicatorColor: StepIndicatorColor.Green,
  isAssignedToViewer: false,
  isCurrentStep: false,
  showCalendarIcon: false
}

describe('getIndicatorData', () => {
  describe('when it is the new step', () => {
    it('renders a %s step indicator with arrow', () => {
      const data = getIndicatorData({
        ...defaultParams,
        ...{
          step: createStep({
            status: StepStatus.NEW
          }),
          operation: defaultOperation
        }
      })

      expect(data).toEqual({
        color: 'light-grey',
        withArrow: true
      })
    })
  })

  describe('when it is the pending or finished step', () => {
    it.each([
      {
        status: StepStatus.PENDING_STAFF_ACTION,
        expectedColor: 'light-grey'
      },
      {
        status: StepStatus.FINISHED,
        expectedColor: 'green'
      }
    ])(
      'renders a %s step indicator without arrow',
      ({ status, expectedColor }) => {
        const data = getIndicatorData({
          ...defaultParams,
          ...{
            step: createStep({
              status
            }),
            operation: defaultOperation
          }
        })

        expect(data).toEqual({
          color: expectedColor,
          withArrow: false
        })
      }
    )
  })
})
