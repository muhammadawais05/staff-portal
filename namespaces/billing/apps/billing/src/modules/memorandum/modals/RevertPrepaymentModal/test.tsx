import React from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import RevertPrepaymentModal from '.'
import { useGetMemorandum } from '../../data'

const mockedHandleOnRootLevelError = jest.fn()
const mockedHandleOnSuccess = jest.fn()
const mockedHandleOnCloseModal = jest.fn()

jest.mock('../../data')
jest.mock('../RevertPrepaymentModalForm')
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

jest.mock('./data/revertInvoicePrepayments.graphql.types', () => ({
  useRevertInvoicePrepaymentsMutation: jest.fn(() => ['exampleSubmit'])
}))

const render = () =>
  renderComponent(
    <RevertPrepaymentModal
      options={{
        nodeId: fixtures.MockMemorandum.number.toString(),
        nodeType: 'memorandum'
      }}
    />
  )

const mockGetMemorandum = useGetMemorandum as jest.Mock

describe('RevertPrepaymentModal', () => {
  describe('`loading` is `true`', () => {
    beforeEach(() => {
      mockGetMemorandum.mockReturnValue({
        data: {},
        loading: true
      })
    })

    it('default render', () => {
      const { queryByTestId } = render()

      expect(queryByTestId('ModalSkeleton')).not.toBeNull()
      expect(queryByTestId('RevertPrepaymentModalForm')).toBeNull()
    })
  })

  describe('`loading` is `false`', () => {
    describe('when `Operation` enabled', () => {
      it('Form rendered', () => {
        mockGetMemorandum.mockReturnValue({
          data: fixtures.MockMemorandum,
          loading: false
        })
        const { queryByTestId } = render()

        expect(queryByTestId('RevertPrepaymentModalForm')).toContainHTML(
          '414280'
        )
      })
    })

    describe('when `Operation` disabled', () => {
      it('modal closed', () => {
        mockGetMemorandum.mockReturnValue({
          data: {
            ...fixtures.MockMemorandum,
            operations: {
              ...fixtures.MockMemorandum.operations,
              revertInvoicePrepayments: {
                __typename: 'Operation',
                callable: 'DISABLED',
                messages: []
              }
            }
          },
          loading: false
        })
        const { queryByTestId } = render()

        expect(mockedHandleOnCloseModal).toHaveBeenCalledTimes(1)
        expect(queryByTestId('RevertPrepaymentModalForm')).toBeNull()
      })
    })
  })
})
