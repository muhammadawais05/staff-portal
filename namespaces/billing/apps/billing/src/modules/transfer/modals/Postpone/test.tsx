import MockDate from 'mockdate'
import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PayTransferModal from '.'
import { useGetTransfer } from '../../data'
import adjustValues from './adjustValues'

const mockedHandleOnRootLevelError = jest.fn()
const mockedHandleOnSuccess = jest.fn()
const mockedHandleOnCloseModal = jest.fn()
const transferNodeId = '589030'

jest.mock('../../data')
jest.mock('../../components/PostponeForm')
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

jest.mock('./data/setPostponeInvoiceTransfer.graphql.types', () => ({
  useSetPostponeTransferMutation: jest.fn(() => ['exampleSubmit'])
}))

const render = (props: ComponentProps<typeof PayTransferModal>) =>
  renderComponent(<PayTransferModal {...props} />)

const mockGetTransfer = useGetTransfer as jest.Mock

describe('PayTransferModal', () => {
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

      expect(queryByTestId('ModalSkeleton')).not.toBeNull()
      expect(queryByTestId('ModalSkeleton')).toContainHTML('Postpone Payment')
      expect(queryByTestId('PostponeForm')).toBeNull()
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

        expect(queryByTestId('PostponeForm')).not.toBeNull()
        expect(queryByTestId('PostponeForm')).toContainHTML(
          '"invoiceId":"VjEtSW52b2ljZS0zNzcyNDk"'
        )
        expect(queryByTestId('PostponeForm')).toContainHTML(
          '"pendingReceiptOn":"2020-02-05T00:00:00.000Z"'
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
              postponeTransfer: {
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
        expect(queryByTestId('PostponeForm')).toBeNull()
      })
    })
  })
})

describe('#adjustValues', () => {
  beforeAll(() => MockDate.set('2020-06-11T00:00:00.000+00:00'))

  it('returns values with normalized date', () => {
    const actual = adjustValues({
      foo: 'bar',
      pendingReceiptOn: new Date('2020-11-06T00:00:00.000Z')
    })

    const expected = { foo: 'bar', pendingReceiptOn: '2020-11-06' }

    expect(actual).toEqual(expected)
  })
})
