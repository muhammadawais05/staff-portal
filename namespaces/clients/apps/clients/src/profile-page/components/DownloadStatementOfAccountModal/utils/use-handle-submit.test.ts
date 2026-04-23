import { renderHook } from '@testing-library/react-hooks'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useHandleSubmit } from '.'

jest.mock('@staff-portal/mutation-result-handlers/src/form-error-handler')

const useHandleMutationResultMock = useHandleMutationResult as jest.Mock

describe('useHandleSubmit', () => {
  describe('it returns callback', () => {
    it('callback returns a promise with handleMutationResult() return value', async () => {
      const handleMutationResultMock = jest.fn(() => 'result')

      useHandleMutationResultMock.mockReturnValue({
        handleMutationResult: handleMutationResultMock
      })

      const downloadDocMock = jest.fn(() => ({
        data: 'data'
      })) as unknown as Parameters<typeof useHandleSubmit>[0]

      const { result } = renderHook(() =>
        useHandleSubmit(downloadDocMock, 'company-id', () => {})
      )

      expect(await (result.current as () => Promise<void>)()).toBe('result')
      expect(handleMutationResultMock).toHaveBeenCalledTimes(1)
    })
  })
})
