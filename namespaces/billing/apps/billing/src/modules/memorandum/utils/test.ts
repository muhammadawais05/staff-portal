import { ModalKey } from '@staff-portal/billing/src/@types/types'

import { memorandumActionHandler } from './memorandumActionHandler'

const mockedHandleOnOpenModal = jest.fn()

describe('#memorandumActionHandler', () => {
  beforeEach(jest.resetAllMocks)

  describe('when the `actionName` is `revertInvoicePrepayments`', () => {
    it('handleOnOpenModal called with', () => {
      memorandumActionHandler({ handleOnOpenModal: mockedHandleOnOpenModal })({
        currentTarget: {
          dataset: {
            value: 'revertInvoicePrepayments',
            nodeId: 'VjEtTWVtb3JhbmR1bS0xMjM0NQ=='
          }
        }
      })

      expect(mockedHandleOnOpenModal).toHaveBeenCalledTimes(1)
      expect(mockedHandleOnOpenModal).toHaveBeenCalledWith(
        ModalKey.memorandumRevertPrepayment,
        {
          nodeId: 'VjEtTWVtb3JhbmR1bS0xMjM0NQ==',
          nodeType: 'memorandum'
        }
      )
    })
  })

  describe('when the `actionName` is `revertCommercialDocumentMemorandum`', () => {
    it('handleOnOpenModal called with', () => {
      memorandumActionHandler({ handleOnOpenModal: mockedHandleOnOpenModal })({
        currentTarget: {
          dataset: {
            value: 'revertCommercialDocumentMemorandum',
            nodeId: 'VjEtTWVtb3JhbmR1bS0xMjM0NQ==',
            nodeType: 'memorandum'
          }
        }
      })

      expect(mockedHandleOnOpenModal).toHaveBeenCalledTimes(1)
      expect(mockedHandleOnOpenModal).toHaveBeenCalledWith(
        ModalKey.revertCommercialDocumentMemorandum,
        {
          nodeId: 'VjEtTWVtb3JhbmR1bS0xMjM0NQ==',
          nodeType: 'memorandum'
        }
      )
    })
  })

  describe('when the `actionName` is `test`', () => {
    it('handleOnOpenModal called with', () => {
      memorandumActionHandler({ handleOnOpenModal: mockedHandleOnOpenModal })({
        currentTarget: {
          dataset: {
            value: 'test',
            nodeId: 'VjEtTWVtb3JhbmR1bS0xMjM0NQ==',
            nodeType: 'memorandum'
          }
        }
      })

      expect(mockedHandleOnOpenModal).toHaveBeenCalledTimes(1)
      expect(mockedHandleOnOpenModal).toHaveBeenCalledWith('memorandum-test', {
        nodeId: 'VjEtTWVtb3JhbmR1bS0xMjM0NQ==',
        nodeType: 'memorandum'
      })
    })
  })
})
