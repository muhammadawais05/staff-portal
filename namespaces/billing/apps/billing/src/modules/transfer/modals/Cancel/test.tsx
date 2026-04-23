import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import CancelTransferModal from '.'
import { useGetTransfer } from '../../data'

const mockedHandleOnRootLevelError = jest.fn()
const mockedHandleOnSuccess = jest.fn()
const mockedHandleOnCloseModal = jest.fn()
const transferNodeId = '589030'

jest.mock('../../data')
jest.mock('../../components/CancelForm')
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: mockedHandleOnRootLevelError,
    handleOnSuccess: mockedHandleOnSuccess
  })
)
jest.mock('@staff-portal/billing/src/_lib/customHooks/useModals', () => ({
  useModals: () => ({
    handleOnCloseModal: mockedHandleOnCloseModal
  })
}))
jest.mock('./data/setCancelTransfer.graphql.types', () => ({
  useSetCancelInvoiceTransferMutation: jest.fn(() => ['exampleSubmit'])
}))

const render = (props: ComponentProps<typeof CancelTransferModal>) =>
  renderComponent(<CancelTransferModal {...props} />)

describe('CancelTransferModal', () => {
  describe('`loading` is `true`', () => {
    beforeEach(() => {
      ;(useGetTransfer as jest.Mock).mockReturnValue({
        data: {},
        loading: true
      })
    })

    it('default render', () => {
      const { queryByTestId } = render({
        options: {
          nodeId: transferNodeId
        }
      })

      expect(queryByTestId('ModalSkeleton')).toContainHTML('Cancel Payment')
      expect(queryByTestId('CancelForm')).toBeNull()
    })
  })

  describe('`loading` is `false`', () => {
    describe('when `Operation` enabled', () => {
      it('Form rendered', () => {
        ;(useGetTransfer as jest.Mock).mockReturnValue({
          data: fixtures.MockTransfer,
          loading: false
        })
        const { queryByTestId } = render({
          options: {
            nodeId: transferNodeId
          }
        })

        const form = queryByTestId('CancelForm')

        expect(form).toContainHTML('"invoiceId":"VjEtSW52b2ljZS0zNzcyNDk"')
        expect(form).toContainHTML('"comment":""')
      })
    })

    describe('when `Operation` disabled', () => {
      it('modal closed', () => {
        ;(useGetTransfer as jest.Mock).mockReturnValue({
          data: {
            ...fixtures.MockTransfer,
            operations: {
              ...fixtures.MockTransfer.operations,
              cancelTransfer: {
                __typename: 'Operation',
                callable: 'DISABLED',
                messages: []
              }
            }
          },
          loading: false
        })
        const { queryByTestId } = render({
          options: {
            nodeId: transferNodeId
          }
        })

        expect(mockedHandleOnCloseModal).toHaveBeenCalledTimes(1)
        expect(queryByTestId('CancelForm')).toBeNull()
      })
    })
  })
})
