import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import EntOverviewExternalLink from '.'

const render = (props: ComponentProps<typeof EntOverviewExternalLink>) =>
  renderComponent(<EntOverviewExternalLink {...props} />)

describe('EntOverviewExternalLink', () => {
  it('default render', () => {
    const { queryByTestId } = render({
      webResource: {
        text: 'Invoice #377249',
        url: 'http://localhost:3000/platform/staff/invoices/377249'
      }
    })

    expect(queryByTestId('EntOverviewExternalLink-link')).toContainHTML(
      'Invoice #377249'
    )
  })

  it('renders nothing', () => {
    const { queryByTestId } = render({})

    expect(
      queryByTestId('EntOverviewExternalLink-link')
    ).not.toBeInTheDocument()
  })
})
