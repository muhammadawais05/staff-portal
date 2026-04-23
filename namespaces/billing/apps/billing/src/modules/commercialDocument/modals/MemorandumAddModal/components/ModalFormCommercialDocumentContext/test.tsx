import React, { ComponentProps } from 'react'
import { InvoiceKind, DocumentStatus } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { CommercialDocumentType } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import ModalFormCommercialDocumentContext from '.'
import { useGetAddMemorandumQuery } from '../../data'

jest.mock('@staff-portal/billing/src/_lib/form/handlers', () => ({
  handleOnSubmissionError: jest.fn(),
  handleSubmit: jest.fn(() => jest.fn())
}))
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)
jest.mock('../../data')
jest.mock('../../../../data', () => ({
  ...(jest.requireActual('../../../../data') as object),
  useSetAddMemorandumToCommercialDocumentMutation: jest.fn(() => [
    'useSetAddMemorandumToCommercialDocumentMutation'
  ])
}))

const render = (
  props: Omit<
    ComponentProps<typeof ModalFormCommercialDocumentContext>,
    'nodeId' | 'children'
  > = {}
) =>
  renderComponent(
    <ModalFormCommercialDocumentContext nodeId='' {...props}>
      {({
        document,
        loading,
        initialLoading,
        handleOnSubmit,
        showReceiverField
      }) => (
        <div data-testid='example-children'>
          <span data-testid='example-children-document'>{document?.id}</span>
          <span data-testid='example-children-loading'>
            {JSON.stringify(loading)}
          </span>
          <span data-testid='example-children-initialLoading'>
            {JSON.stringify(initialLoading)}
          </span>
          <span data-testid='example-children-handleOnSubmit'>
            {JSON.stringify(handleOnSubmit)}
          </span>
          <span data-testid='example-children-showReceiverField'>
            {showReceiverField}
          </span>
        </div>
      )}
    </ModalFormCommercialDocumentContext>
  )

describe('ModalFormCommercialDocumentContext', () => {
  it('invoice render', () => {
    useGetAddMemorandumQuery.mockReturnValue({
      data: { node: fixtures.MockInvoice },
      error: null,
      loading: false
    })
    const { getByTestId } = render({
      nodeType: CommercialDocumentType.invoice
    })

    expect(
      getByTestId('MemorandumAddModalFormCommercialDocumentContext')
    ).toBeInTheDocument()
    expect(getByTestId('example-children-document')).toContainHTML(
      'VjEtSW52b2ljZS0zNzcyNDk'
    )
    expect(getByTestId('example-children-loading')).toContainHTML('false')
  })

  it('pending status render', () => {
    useGetAddMemorandumQuery.mockReturnValue({
      data: {
        node: {
          ...fixtures.MockInvoice,
          status: DocumentStatus.OVERDUE
        }
      },
      error: null,
      loading: false
    })
    const { getByTestId } = render({
      nodeType: CommercialDocumentType.invoice
    })

    expect(
      getByTestId('MemorandumAddModalFormCommercialDocumentContext')
    ).toBeInTheDocument()
    expect(getByTestId('example-children-document')).toContainHTML(
      'VjEtSW52b2ljZS0zNzcyNDk'
    )
    expect(getByTestId('example-children-loading')).toContainHTML('false')
  })

  it('payment render', () => {
    useGetAddMemorandumQuery.mockReturnValue({
      data: { node: fixtures.MockPayment },
      error: null,
      loading: false
    })
    const { getByTestId } = render({
      nodeType: CommercialDocumentType.invoice
    })

    expect(
      getByTestId('MemorandumAddModalFormCommercialDocumentContext')
    ).toBeInTheDocument()
    expect(getByTestId('example-children-document')).toContainHTML(
      'VjEtUGF5bWVudC0xMTA0NDI4'
    )
    expect(getByTestId('example-children-loading')).toContainHTML('false')
  })

  it('not commissionable invoice', () => {
    useGetAddMemorandumQuery.mockReturnValue({
      data: {
        node: {
          ...fixtures.MockInvoice,
          commissionable: false
        }
      },
      error: null,
      loading: false
    })
    const { getByTestId } = render({
      nodeType: CommercialDocumentType.invoice
    })

    expect(
      getByTestId('MemorandumAddModalFormCommercialDocumentContext')
    ).toBeInTheDocument()
    expect(getByTestId('example-children-document')).toContainHTML(
      'VjEtSW52b2ljZS0zNzcyNDk'
    )
    expect(getByTestId('example-children-loading')).toContainHTML('false')
  })

  it('consolidated invoice', () => {
    useGetAddMemorandumQuery.mockReturnValue({
      data: {
        node: {
          ...fixtures.MockInvoice,
          invoiceKind: InvoiceKind.CONSOLIDATED
        }
      },
      error: null,
      loading: false
    })
    const { getByTestId } = render({
      nodeType: CommercialDocumentType.invoice
    })

    expect(
      getByTestId('MemorandumAddModalFormCommercialDocumentContext')
    ).toBeInTheDocument()
    expect(getByTestId('example-children-document')).toContainHTML(
      'VjEtSW52b2ljZS0zNzcyNDk'
    )
    expect(getByTestId('example-children-loading')).toContainHTML('false')
  })
})
