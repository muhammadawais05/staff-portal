import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceCollectBadDebtModal from '.'

jest.mock('./components/CollectBadDebtForm')
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
jest.mock('../../data/setCollectBadDebtInvoice.graphql.types', () => ({
  useSetCollectBadDebtInvoiceMutation: () => [jest.fn()]
}))

const render = (props: ComponentProps<typeof InvoiceCollectBadDebtModal>) =>
  renderComponent(<InvoiceCollectBadDebtModal {...props} />)

describe('InvoiceCollectBadDebtModal', () => {
  it('default render', () => {
    const { container } = render({
      invoiceId: fixtures.MockInvoice.id
    })

    expect(container).toMatchSnapshot()
  })
})
