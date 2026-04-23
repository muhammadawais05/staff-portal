import { renderHook } from '@testing-library/react-hooks'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import useDeleteDuplicateSubmit from './use-delete-duplicate-submit'

const hideModal = () => {}
const companyId = 'companyId'

jest.mock('@staff-portal/mutation-result-handlers/src/form-error-handler')
jest.mock('@staff-portal/data-layer-service')
jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: () => ({ showError: jest.fn() })
}))

const mockedHandleMutationResult = jest.fn()
const mockedUseMutation = useMutation as jest.Mock
const mockedUseHandleMutationResult = useHandleMutationResult as jest.Mock

describe('useDeleteDuplicateSubmit', () => {
  beforeEach(() => {
    mockedUseMutation.mockImplementation(() => [
      () =>
        Promise.resolve({
          data: { deleteDuplicateClient: 'deleteDuplicateClient' }
        }),
      { loading: true }
    ])
    mockedUseHandleMutationResult.mockReturnValue({
      handleMutationResult: mockedHandleMutationResult
    })
  })

  it('returns a function to handle submit and loading state', async () => {
    const {
      result: {
        current: { handleSubmit, loading }
      }
    } = renderHook(() => useDeleteDuplicateSubmit({ hideModal, companyId }))

    await handleSubmit({
      transferJobs: true,
      originalClientUrl: 'https://toptal.com',
      comment: 'comment'
    })

    expect(mockedHandleMutationResult).toHaveBeenCalledWith(
      expect.objectContaining({
        mutationResult: 'deleteDuplicateClient',
        successNotificationMessage: 'The company was successfully deleted.'
      })
    )
    expect(loading).toBe(true)
  })
})
