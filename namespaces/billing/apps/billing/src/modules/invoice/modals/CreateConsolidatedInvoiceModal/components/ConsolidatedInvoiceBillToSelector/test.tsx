import React, { ComponentProps } from 'react'
import { Form } from '@toptal/picasso-forms'
import { times, noop } from 'lodash-es'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import ConsolidatedInvoiceBillToSelector from '.'

const { displayName } = ConsolidatedInvoiceBillToSelector
const mockCompanies = times(3, index => ({
  ...fixtures.MockClient,
  id: `${fixtures.MockClient}${index}`
}))

const render = (
  props: Partial<ComponentProps<typeof ConsolidatedInvoiceBillToSelector>>
) =>
  renderComponent(
    <Form onSubmit={noop} initialValues={{ billTo: mockCompanies[0].id }}>
      <ConsolidatedInvoiceBillToSelector
        clients={props.clients || mockCompanies}
      />
    </Form>
  )

describe('ConsolidatedInvoiceBillToSelector', () => {
  it('renders a select from passed props with a default value', () => {
    const { getByTestId } = render({})

    expect(getByTestId(`${displayName}`)).toHaveTextContent('Bill To:')
    expect(getByTestId(`${displayName}`).querySelector('input')).toHaveValue(
      mockCompanies[0].fullName
    )
  })
  describe.each`
    clients               | amount
    ${[mockCompanies[0]]} | ${'only one'}
    ${[]}                 | ${'no'}
  `('when there is $amount company supplied', ({ clients }) => {
    it('does not render', () => {
      const { queryByTestId } = render({
        clients
      })

      expect(queryByTestId(`${displayName}`)).not.toBeInTheDocument()
    })
  })
})
