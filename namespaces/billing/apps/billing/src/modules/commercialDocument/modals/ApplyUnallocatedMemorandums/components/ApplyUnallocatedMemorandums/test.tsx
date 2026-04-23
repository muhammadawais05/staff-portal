import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import CommercialDocumentApplyMemos from '../../index'
import { useGetApplyUnallocatedMemorandumsToCommercialDocumentQuery } from '../../data'

jest.mock('../../data', () => ({
  ...(jest.requireActual('../../data') as object),
  useSetApplyUnallocatedMemorandumsToCommercialDocumentMutation: jest.fn(() => [
    'useSetApplyUnallocatedMemorandumsToCommercialDocumentMutation'
  ]),
  useGetApplyUnallocatedMemorandumsToCommercialDocumentQuery: jest.fn()
}))
jest.mock('../ApplyUnallocatedMemorandumsContent')
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)

const render = (props: ComponentProps<typeof CommercialDocumentApplyMemos>) =>
  renderComponent(<CommercialDocumentApplyMemos {...props} />)

describe('CommercialDocumentApplyMemos', () => {
  it('renders a modal', () => {
    ;(
      useGetApplyUnallocatedMemorandumsToCommercialDocumentQuery as jest.Mock
    ).mockReturnValue({
      data: {
        initialLoading: false,
        loading: false,
        node: {
          documentNumber: 123456,
          nodeId: 'VjEtVGFsZW50LTI4MDc1OQ',
          subjectObject: {
            availablePrepaymentBalance: '100.0',
            unallocatedMemorandums: {
              __typename: 'MemorandumConnection',
              nodes: []
            }
          }
        }
      }
    })

    const { queryByTestId } = render({
      options: {
        nodeId: fixtures.MockClient.id,
        nodeType: 'invoice'
      }
    })

    expect(
      queryByTestId('ApplyUnallocatedMemorandumsContent')
    ).toBeInTheDocument()
  })

  describe('when data is loading', () => {
    it('renders a skeleton loader', () => {
      ;(
        useGetApplyUnallocatedMemorandumsToCommercialDocumentQuery as jest.Mock
      ).mockReturnValue({
        data: undefined,
        loading: true,
        initialLoading: true
      })

      const { queryByTestId } = render({
        options: {
          nodeId: fixtures.MockClient.id,
          nodeType: 'invoice'
        }
      })

      expect(queryByTestId('ModalSkeleton')).toBeInTheDocument()
      expect(queryByTestId('InvoicePayModalContent')).not.toBeInTheDocument()
    })
  })
})
