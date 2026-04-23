import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'

import PortfolioListPreview, {
  ProfilePortfolioListPreviewProps
} from './PortfolioListPreview'

const data = [
  {
    id: 'item1',
    title: 'This is item 1',
    coverImage: null
  },
  {
    id: 'item2',
    title: 'This is item 2',
    coverImage: null
  }
]

const renderComponent = (
  props: Pick<ProfilePortfolioListPreviewProps, 'data'>
) =>
  render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <PortfolioListPreview title='Portfolio' {...props} />
      </Form>
    </TestWrapper>
  )

describe('PortfolioListPreview', () => {
  it('renders the list of items', () => {
    renderComponent({ data })

    expect(screen.getByText('Portfolio')).toBeInTheDocument()
    expect(screen.getByText('This is item 1')).toBeInTheDocument()
    expect(screen.getByText('This is item 2')).toBeInTheDocument()
  })

  describe('when data is empty', () => {
    it('renders nothing', () => {
      renderComponent({ data: [] })

      expect(screen.queryByText('Portfolio')).not.toBeInTheDocument()
    })
  })
})
