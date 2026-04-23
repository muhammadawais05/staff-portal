import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { shouldShowJobBillingDefaultsActions } from '.'

const { ENABLED, HIDDEN } = OperationCallableTypes

const mockOperation = (callable: OperationCallableTypes) => ({
  callable,
  messages: []
})

describe('shouldShowJobBillingDefaultsActions', () => {
  describe('when job template is not available', () => {
    it('returns false when createJobTemplate operation is hidden', () => {
      expect(
        shouldShowJobBillingDefaultsActions(null, mockOperation(HIDDEN))
      ).toBe(false)
    })

    it('returns true when createJobTemplate operation is not hidden', () => {
      expect(
        shouldShowJobBillingDefaultsActions(null, mockOperation(ENABLED))
      ).toBe(true)
    })
  })

  describe('when job template is available', () => {
    it.each([
      ['operations are both hidden', HIDDEN, HIDDEN, false],
      ['operations are both not hidden', ENABLED, ENABLED, true],
      ['only update operation is hidden', HIDDEN, ENABLED, true],
      ['only delete operation is hidden', ENABLED, HIDDEN, true]
    ])('%s', (_, updateJobTemplate, deleteJobTemplate, expected) => {
      const jobTemplate = {
        id: 'id',
        operations: {
          updateJobTemplate: mockOperation(updateJobTemplate),
          deleteJobTemplate: mockOperation(deleteJobTemplate)
        }
      }

      expect(
        shouldShowJobBillingDefaultsActions(jobTemplate, mockOperation(HIDDEN))
      ).toBe(expected)
    })
  })
})
