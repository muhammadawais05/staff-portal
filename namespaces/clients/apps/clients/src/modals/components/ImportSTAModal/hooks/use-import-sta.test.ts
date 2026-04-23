import { renderHook } from '@testing-library/react-hooks'
import { useNotifications } from '@toptal/picasso/utils'
import { useMutation } from '@staff-portal/data-layer-service'
import { ImportStaInput } from '@staff-portal/graphql/staff'
import { waitFor } from '@testing-library/react'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useImportSTA } from './use-import-sta'
import { ImportStaDocument } from '../data'

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/mutation-result-handlers/src/form-error-handler')

const useNotificationsMock = useNotifications as jest.Mock
const useMutationMock = useMutation as jest.Mock
const useHandleMutationResultMock = useHandleMutationResult as jest.Mock

const handleMutationResult = jest.fn()
const importSTA = jest.fn()
const hideModal = jest.fn()

describe('useUpdateLeadStatus', () => {
  beforeEach(() => {
    useNotificationsMock.mockReturnValue({ showError: () => {} })
    useMutationMock.mockReturnValue([importSTA, { loading: 'loading' }])
    useHandleMutationResultMock.mockReturnValue({ handleMutationResult })
    handleMutationResult.mockReturnValue({})
  })

  describe('when handleSubmit is called', () => {
    it('invokes inner functions with correct params', async () => {
      const data = {
        importSTA: {}
      }

      importSTA.mockReturnValue({ data })

      //Act
      const {
        result: {
          current: { handleSubmit }
        }
      } = renderHook(() => useImportSTA(hideModal))

      await waitFor(() => handleSubmit({} as ImportStaInput))

      //Assert
      expect(useHandleMutationResultMock).toHaveBeenCalledTimes(1)
      expect(useMutationMock).toHaveBeenCalledTimes(1)
      expect(useMutationMock).toHaveBeenCalledWith(ImportStaDocument, {
        onError: expect.any(Function)
      })
      expect(importSTA).toHaveBeenCalledTimes(1)
      expect(handleMutationResult).toHaveBeenCalledTimes(1)
      expect(handleMutationResult).toHaveBeenCalledWith({
        mutationResult: data.importSTA,
        successNotificationMessage:
          'The Company STA was successfully imported.',
        onSuccessAction: expect.any(Function),
        isFormSubmit: true
      })
    })
  })

  describe('when noEffectiveDateFound error is returned from mutation', () => {
    it('sets contractEffectiveDateEnabled as true', async () => {
      const data = {
        importSTA: {
          errors: [{ code: 'noEffectiveDateFound' }]
        }
      }

      importSTA.mockReturnValue({ data })

      //Act
      const { result, waitForNextUpdate } = renderHook(() =>
        useImportSTA(hideModal)
      )

      result.current.handleSubmit({} as ImportStaInput)
      await waitForNextUpdate()

      //Assert
      expect(result.current).toEqual({
        contractEffectiveDateEnabled: true,
        handleSubmit: expect.any(Function),
        loading: 'loading'
      })
    })
  })

  describe('when first invoked', () => {
    it('returns expected data', () => {
      const {
        result: { current }
      } = renderHook(() => useImportSTA(() => {}))

      expect(current).toEqual({
        contractEffectiveDateEnabled: false,
        handleSubmit: expect.any(Function),
        loading: 'loading'
      })
    })
  })
})
