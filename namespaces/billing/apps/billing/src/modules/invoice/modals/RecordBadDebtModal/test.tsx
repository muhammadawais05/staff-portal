import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceRecordBadDebtModal from '.'

jest.mock('../RecordBadDebtModalForm')
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
jest.mock('../../data/setRecordBadDebt.graphql.types', () => ({
  ...(jest.requireActual(
    '../../data/setRecordBadDebt.graphql.types'
  ) as object),
  useSetRecordBadDebtMutation: jest.fn(() => ['useSetRecordBadDebtMutation'])
}))

const render = (props: ComponentProps<typeof InvoiceRecordBadDebtModal>) =>
  renderComponent(<InvoiceRecordBadDebtModal {...props} />)

describe('InvoiceRecordBadDebtModal', () => {
  it('default render', () => {
    const { queryByTestId } = render({
      options: { nodeId: '377249' }
    })

    expect(queryByTestId('InvoiceRecordBadDebtModalForm')).toContainHTML(
      '377249'
    )
  })
})
