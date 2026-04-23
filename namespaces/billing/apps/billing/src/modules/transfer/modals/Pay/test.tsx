import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PayTransferModal from '.'
import { useGetTransfer } from '../../data'

const mockedHandleOnRootLevelError = jest.fn()
const mockedHandleOnSuccess = jest.fn()
const mockedHandleOnCloseModal = jest.fn()
const transferNodeId = '589030'

jest.mock('../../data')
jest.mock('../../components/PayForm')
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

jest.mock('./data/setPayTransfer.graphql.types', () => ({
  useSetPayTransferMutation: jest.fn(() => ['exampleSubmit'])
}))

const render = (props: ComponentProps<typeof PayTransferModal>) =>
  renderComponent(<PayTransferModal {...props} />)

describe('PayTransferModal', () => {
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

      expect(queryByTestId('ModalSkeleton')).toContainHTML('Mark Payment Paid')
      expect(queryByTestId('PayForm')).toBeNull()
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

        expect(queryByTestId('PayForm')).toContainHTML(
          'VjEtVHJhbnNmZXItNTg5MDMw'
        )
      })
    })

    describe('when `Operation` disabled', () => {
      it('modal closed', () => {
        ;(useGetTransfer as jest.Mock).mockReturnValue({
          data: {
            ...fixtures.MockTransfer,
            operations: {
              ...fixtures.MockTransfer.operations,
              payTransfer: {
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
        expect(queryByTestId('PayForm')).toBeNull()
      })
    })
  })
})
