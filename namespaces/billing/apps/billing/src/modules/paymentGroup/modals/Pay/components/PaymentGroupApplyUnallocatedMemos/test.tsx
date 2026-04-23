import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PaymentGroupApplyUnallocatedMemos from './PaymentGroupApplyUnallocatedMemos'
import { useGetApplyUnallocatedMemorandumsToPaymentGroupQuery } from '../../data'

jest.mock('../../data', () => ({
  useGetApplyUnallocatedMemorandumsToPaymentGroupQuery: jest.fn()
}))
jest.mock('../PaymentGroupApplyUnallocatedMemosContent')
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)

const render = (
  props: ComponentProps<typeof PaymentGroupApplyUnallocatedMemos>
) => renderComponent(<PaymentGroupApplyUnallocatedMemos {...props} />)
const mockedQuery =
  useGetApplyUnallocatedMemorandumsToPaymentGroupQuery as jest.Mock

describe('PaymentGroupApplyMemos', () => {
  it('renders a modal', () => {
    mockedQuery.mockReturnValue({
      data: {
        initialLoading: false,
        loading: false,
        node: {
          id: 'VjEtVGFsZW50LTI4MDc1OQ',
          number: 123456,
          subject: {
            id: '12345',
            unallocatedMemorandums: {
              __typename: 'MemorandumConnection',
              nodes: [fixtures.MockMemorandum]
            }
          }
        }
      }
    })

    const { queryByTestId } = render({
      nodeId: fixtures.MockPaymentGroup.id,
      onStepCompleted: jest.fn()
    })

    expect(
      queryByTestId('PaymentGroupApplyUnallocatedMemosContent')
    ).toBeInTheDocument()
  })

  describe('when data is loading', () => {
    it('renders a skeleton loader', () => {
      mockedQuery.mockReturnValue({
        data: undefined,
        loading: true,
        initialLoading: true
      })

      const { queryByTestId } = render({
        nodeId: fixtures.MockPaymentGroup.id,
        onStepCompleted: jest.fn()
      })

      expect(queryByTestId('ModalSkeleton')).toBeInTheDocument()
      expect(
        queryByTestId('PaymentGroupPayModalContent')
      ).not.toBeInTheDocument()
    })
  })
})
