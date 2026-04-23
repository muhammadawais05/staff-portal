import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceDisputeTalentModal from '.'

jest.mock('../DisputeTalentModalForm')
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
jest.mock('../../data/setDisputeTalentPayments.graphql.types', () => ({
  ...(jest.requireActual(
    '../../data/setDisputeTalentPayments.graphql.types'
  ) as object),
  useSetDisputeTalentPaymentsMutation: jest.fn(() => [
    'useSetDisputeTalentPaymentsMutation'
  ])
}))

const render = (props: ComponentProps<typeof InvoiceDisputeTalentModal>) =>
  renderComponent(<InvoiceDisputeTalentModal {...props} />)

describe('InvoiceDisputeTalentModal', () => {
  it('default render', () => {
    const { queryByTestId } = render({
      options: { nodeId: '377249' }
    })

    expect(queryByTestId('InvoiceDisputeTalentModalForm')).toContainHTML(
      '377249'
    )
  })
})
