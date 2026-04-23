import { renderHook } from '@testing-library/react-hooks'
import { ModalKey } from '@staff-portal/billing/src/@types/types'

import { useBillingOptionUpdateActions } from './useBillingOptionUpdateActions'

const mockedHandleOnOpenModal = jest.fn()

jest.mock('@staff-portal/billing/src/_lib/customHooks/useModals', () => ({
  useModals: () => ({
    handleOnOpenModal: mockedHandleOnOpenModal
  })
}))

const billingOptionId = 'billingOptionId'
const clientId = 'clientId'

describe('useBillingOptionUpdateActions', () => {
  afterEach(jest.clearAllMocks)

  describe('handleOnUpdateBillingOption', () => {
    it('opens a modal to update a billing option', () => {
      const { result } = renderHook(useBillingOptionUpdateActions)

      result.current.handleOnUpdateBillingOption(billingOptionId, clientId)

      expect(mockedHandleOnOpenModal).toHaveBeenCalledTimes(1)
      expect(mockedHandleOnOpenModal).toHaveBeenCalledWith(
        ModalKey.billingOptionUpdate,
        {
          nodeId: billingOptionId,
          clientId
        }
      )
    })
  })
})
