import React, { ComponentProps, FC } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { CommercialDocumentType } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import MemorandumAddModal from '.'
import { useGetMemorandumCategoriesQuery } from '../../../../../memorandum/data'

const MockDocument = jest.fn()

jest.mock('../ModalForm')
jest.mock('../ModalFormRoleContext', () => ({ children }: { children: FC }) => (
  <div id='ModalFormRoleContext'>{children({})}</div>
))
jest.mock(
  '../ModalFormCommercialDocumentContext',
  () =>
    ({ children }: { children: FC<{ document: unknown }> }) =>
      (
        <div id='ModalFormCommercialDocumentContext'>
          {children({
            document: MockDocument()
          })}
        </div>
      )
)
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
jest.mock('../../../../../memorandum/data')

const render = (
  props: Omit<ComponentProps<typeof MemorandumAddModal>, 'nodeId'>
) => renderComponent(<MemorandumAddModal {...props} />)

const mockGetMemorandumCategoriesQuery =
  useGetMemorandumCategoriesQuery as jest.Mock

describe('MemorandumAddModal', () => {
  beforeEach(() => {
    mockGetMemorandumCategoriesQuery.mockReturnValue({
      data: { memorandumCategories: fixtures.MockMemorandumCategories },
      error: null,
      loading: false
    })
  })

  it('invoice render', () => {
    MockDocument.mockReturnValue(fixtures.MockInvoice)

    const { queryByTestId } = render({
      options: {
        nodeId: 'test',
        nodeType: CommercialDocumentType.invoice
      }
    })

    const form = queryByTestId('MemorandumAddModalForm')

    expect(form).toContainHTML('"nodeType":"invoice"')
    expect(form).toContainHTML('"documentNumber":377249')
  })

  it('payment render', () => {
    MockDocument.mockReturnValue(fixtures.MockPayment)

    const { queryByTestId } = render({
      options: {
        nodeId: 'test',
        nodeType: CommercialDocumentType.payment
      }
    })

    const form = queryByTestId('MemorandumAddModalForm')

    expect(form).toContainHTML('"nodeType":"payment"')
    expect(form).toContainHTML('"documentNumber":1104428')
  })

  it('role render', () => {
    const { queryByTestId } = render({
      options: {
        nodeId: undefined,
        nodeType: undefined
      }
    })

    expect(queryByTestId('MemorandumAddModalForm')).toContainHTML(
      '"document":{}'
    )
  })
})
