import { renderHook } from '@testing-library/react-hooks'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { useMutation } from '@staff-portal/data-layer-service'
import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'

import getIsFormDirty from '../get-is-form-dirty/get-is-form-dirty'
import useHandleSubmit from './use-handle-submit'
import { useCandidateSendingContext } from '../../../../hooks'
import { FormValues } from '../../CandidateSendingFeedbackStepForm'

jest.mock('@staff-portal/mutation-result-handlers/src/form-error-handler')
jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/error-handling', () => ({
  ...jest.requireActual('@staff-portal/error-handling'),
  useNotifications: () => ({ showError: jest.fn() })
}))
jest.mock('../../../../hooks', () => ({
  useCandidateSendingContext: jest.fn()
}))
jest.mock('../get-is-form-dirty/get-is-form-dirty', () => ({
  __esModule: true,
  default: jest.fn()
}))

const useMutationMock = useMutation as jest.Mock
const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock
const useHandleMutationResultMock = useHandleMutationResult as jest.Mock
const getIsFormDirtyMock = getIsFormDirty as jest.Mock

describe('useHandleSubmit', () => {
  describe('when form is dirty', () => {
    it('handleMutationResult is called', async () => {
      getIsFormDirtyMock.mockImplementation(() => true)

      useMutationMock.mockImplementation(() => [
        () =>
          Promise.resolve({
            data: {
              createTalentRejectionFeedback: 'createTalentRejectionFeedback'
            }
          })
      ])
      const handleMutationResultMock = jest.fn()
      const goToNextStepMock = jest.fn()

      useCandidateSendingContextMock.mockReturnValue({
        goToNextStep: goToNextStepMock
      })
      useHandleMutationResultMock.mockReturnValue({
        handleMutationResult: handleMutationResultMock
      })

      const { result } = renderHook(() => useHandleSubmit())

      await result.current.handleSubmit({
        rejectedApplications: []
      } as FormValues)

      expect(handleMutationResultMock).toHaveBeenCalledTimes(1)
      expect(handleMutationResultMock).toHaveBeenCalledWith(
        expect.objectContaining({
          mutationResult: 'createTalentRejectionFeedback'
        })
      )
      expect(goToNextStepMock).not.toHaveBeenCalled()
    })
  })

  describe('when form is not dirty', () => {
    it('handleMutationResult is not called', async () => {
      getIsFormDirtyMock.mockImplementation(() => false)

      useMutationMock.mockImplementation(() => [() => {}])
      const handleMutationResultMock = jest.fn()
      const goToNextStepMock = jest.fn()

      useCandidateSendingContextMock.mockReturnValue({
        goToNextStep: goToNextStepMock
      })
      useHandleMutationResultMock.mockReturnValue({
        handleMutationResult: handleMutationResultMock
      })

      const { result } = renderHook(() => useHandleSubmit())

      await result.current.handleSubmit({
        rejectedApplications: []
      } as FormValues)

      expect(handleMutationResultMock).not.toHaveBeenCalled()
      expect(goToNextStepMock).toHaveBeenCalledTimes(1)
      expect(goToNextStepMock).toHaveBeenCalledWith([
        NewEngagementWizardStep.NEXT
      ])
    })
  })
})
