import {
  BASE_ERROR_KEY,
  useHandleMutationResult
} from '@staff-portal/mutation-result-handlers'
import { renderHook } from '@testing-library/react-hooks'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'

import { createApproveCommitmentChangeRequestDataMock } from '../../../ApproveCommitmentChangeRequestModal/data/get-approve-commitment-change-request-data/mocks'
import { useApproveCommitmentChangeRequest } from '../../data'
import { ApproveCommitmentChangeRequestFormValues } from '../../types'
import useApproveCommitmentChangeRequestSubmit from './use-approve-commitment-change-request-submit'

const jobId = 'jobId'
const handleSubmitProps: ApproveCommitmentChangeRequestFormValues = {
  companyRate: '1000',
  talentRate: '500',
  changeDate: '2020-11-11'
}

jest.mock('@toptal/staff-portal-message-bus')
jest.mock('@staff-portal/mutation-result-handlers/src/form-error-handler')
jest.mock('../../data')

const emitMessageMock = jest.fn()
const useMessageEmitterMock = useMessageEmitter as jest.Mock
const handleMutationResultMock = jest.fn()
const useApproveCommitmentChangeRequestMock =
  useApproveCommitmentChangeRequest as jest.Mock
const useHandleMutationResultMock = useHandleMutationResult as jest.Mock

describe('useApproveCommitmentChangeRequestSubmit', () => {
  beforeEach(() => {
    useApproveCommitmentChangeRequestMock.mockReturnValue([
      () => ({
        data: {
          approveCommitmentChangeRequest: {
            success: true,
            errors: []
          }
        }
      })
    ])
    useHandleMutationResultMock.mockReturnValue({
      handleMutationResult: handleMutationResultMock
    })
    useMessageEmitterMock.mockReturnValue(emitMessageMock)
  })

  describe('when there is correct data', () => {
    it('returns mutation result with success', async () => {
      const {
        result: {
          current: { handleSubmit }
        }
      } = renderHook(() =>
        useApproveCommitmentChangeRequestSubmit({
          jobId,
          commitmentChangeRequest:
            createApproveCommitmentChangeRequestDataMock(),
          hideModal: jest.fn()
        })
      )

      await handleSubmit(handleSubmitProps)

      expect(useApproveCommitmentChangeRequestMock).toHaveBeenCalledTimes(1)
      expect(handleMutationResultMock).toHaveBeenCalledWith(
        expect.objectContaining({
          mutationResult: { errors: [], success: true },
          successNotificationMessage:
            'The Commitment Change Request was successfully approved.'
        })
      )
    })
  })

  describe('when there is base error', () => {
    it('returns proper mutation result', async () => {
      useApproveCommitmentChangeRequestMock.mockReturnValue([
        () => ({
          data: {
            approveCommitmentChangeRequest: {
              success: false,
              errors: [{ key: BASE_ERROR_KEY, message: 'Something went wrong' }]
            }
          }
        })
      ])

      const {
        result: {
          current: { handleSubmit }
        }
      } = renderHook(() =>
        useApproveCommitmentChangeRequestSubmit({
          jobId,
          commitmentChangeRequest:
            createApproveCommitmentChangeRequestDataMock(),
          hideModal: jest.fn()
        })
      )

      await handleSubmit(handleSubmitProps)

      expect(useApproveCommitmentChangeRequestMock).toHaveBeenCalledTimes(1)
      expect(handleMutationResultMock).toHaveBeenCalledWith(
        expect.objectContaining({
          mutationResult: {
            errors: [{ key: 'base', message: 'Something went wrong' }],
            success: false
          }
        })
      )
    })
  })
})
