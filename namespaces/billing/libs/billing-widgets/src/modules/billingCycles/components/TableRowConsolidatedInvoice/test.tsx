import React, { ComponentProps, ReactNode } from 'react'
import { pick } from 'lodash-es'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TableRowConsolidatedInvoice from '.'

const render = (
  children: ReactNode,
  props: ComponentProps<typeof TableRowConsolidatedInvoice>
) =>
  renderComponent(
    <TableRowConsolidatedInvoice {...props}>
      {children}
    </TableRowConsolidatedInvoice>
  )

describe('TableRowConsolidatedInvoice', () => {
  it('default render', () => {
    const { queryByTestId } = render(null, {
      invoice: pick(fixtures.MockInvoice.consolidatedDocument, [
        'documentNumber'
      ])
    })

    expect(queryByTestId('consolidated-icon')).toBeInTheDocument()
    expect(queryByTestId('consolidated-link')).not.toBeInTheDocument()
    expect(queryByTestId('consolidated-document-number')).toContainHTML(
      '#380600'
    )
  })

  it('render with a link', () => {
    const { queryByTestId } = render(null, {
      invoice: pick(fixtures.MockInvoice.consolidatedDocument, ['webResource'])
    })

    expect(queryByTestId('consolidated-icon')).toBeInTheDocument()
    expect(queryByTestId('consolidated-link')).toBeInTheDocument()
    expect(queryByTestId('consolidated-document-number')).toContainHTML(
      '#380600'
    )
  })

  it('empty render', () => {
    const { queryByTestId } = render(null, {})

    expect(queryByTestId('consolidated-icon')).not.toBeInTheDocument()
  })
})
