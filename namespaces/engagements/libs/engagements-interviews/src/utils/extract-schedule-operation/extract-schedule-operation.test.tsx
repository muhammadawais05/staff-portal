import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { OperationFragment } from '@staff-portal/operations'

import { extractScheduleOperation } from './extract-schedule-operation'

const ENABLED_OPERATION: OperationFragment = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

const DISABLED_OPERATION: OperationFragment = {
  callable: OperationCallableTypes.DISABLED,
  messages: []
}

const HIDDEN_OPERATION: OperationFragment = {
  callable: OperationCallableTypes.HIDDEN,
  messages: []
}

describe('extractScheduleOperation', () => {
  describe('when passing an empty array', () => {
    it('returns undefined', () => {
      expect(extractScheduleOperation([])).toBeUndefined()
    })
  })

  describe('when one ore more operations are enabled', () => {
    it('returns the first enabled operation', () => {
      expect(
        extractScheduleOperation([ENABLED_OPERATION, ENABLED_OPERATION])
      ).toBe(ENABLED_OPERATION)

      expect(
        extractScheduleOperation([ENABLED_OPERATION, DISABLED_OPERATION])
      ).toBe(ENABLED_OPERATION)

      expect(
        extractScheduleOperation([DISABLED_OPERATION, ENABLED_OPERATION])
      ).toBe(ENABLED_OPERATION)

      expect(
        extractScheduleOperation([ENABLED_OPERATION, HIDDEN_OPERATION])
      ).toBe(ENABLED_OPERATION)

      expect(
        extractScheduleOperation([HIDDEN_OPERATION, ENABLED_OPERATION])
      ).toBe(ENABLED_OPERATION)
    })
  })

  describe('when there are no enabled operations', () => {
    it('returns the first disabled operation', () => {
      expect(
        extractScheduleOperation([DISABLED_OPERATION, HIDDEN_OPERATION])
      ).toBe(DISABLED_OPERATION)

      expect(
        extractScheduleOperation([HIDDEN_OPERATION, DISABLED_OPERATION])
      ).toBe(DISABLED_OPERATION)
    })
  })
})
