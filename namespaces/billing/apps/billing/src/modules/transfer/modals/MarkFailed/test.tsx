import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import MarkFailedTransferModal from '.'
import { useGetTransfer } from '../../data'

const mockedHandleOnRootLevelError = jest.fn()
const mockedHandleOnSuccess = jest.fn()
const mockedHandleOnCloseModal = jest.fn()
const transferNodeId = '589030'

jest.mock('../../data')
jest.mock('../../components/MarkFailedForm')
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

jest.mock('./data/setFailInvoiceTransfer.graphql.types', () => ({
  useSetMarkFailedInvoiceTransferMutation: jest.fn(() => ['exampleSubmit'])
}))

const render = (props: ComponentProps<typeof MarkFailedTransferModal>) =>
  renderComponent(<MarkFailedTransferModal {...props} />)

const mockGetTransfer = useGetTransfer as jest.Mock

describe('MarkFailedTransferModal', () => {
  describe('`loading` is `true`', () => {
    beforeEach(() => {
      mockGetTransfer.mockReturnValue({
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

      expect(queryByTestId('ModalSkeleton')).toContainHTML(
        'Mark Payment Failed'
      )
      expect(queryByTestId('MarkFailedForm')).toBeNull()
    })
  })

  describe('`loading` is `false`', () => {
    describe('when `Operation` enabled', () => {
      it('Form rendered', () => {
        mockGetTransfer.mockReturnValue({
          data: fixtures.MockTransfer,
          loading: false
        })
        const { queryByTestId } = render({
          options: {
            nodeId: transferNodeId
          }
        })

        expect(queryByTestId('MarkFailedForm')).toContainHTML(
          '"invoiceId":"VjEtSW52b2ljZS0zNzcyNDk"'
        )
      })
    })

    describe('when `Operation` disabled', () => {
      it('modal closed', () => {
        mockGetTransfer.mockReturnValue({
          data: {
            ...fixtures.MockTransfer,
            operations: {
              ...fixtures.MockTransfer.operations,
              failTransfer: {
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
        expect(queryByTestId('MarkFailedForm')).toBeNull()
      })
    })
  })
})
