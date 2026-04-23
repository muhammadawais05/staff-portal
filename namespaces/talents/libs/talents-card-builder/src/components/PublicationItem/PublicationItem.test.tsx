import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import PublicationItem, { PublicationItemProps } from './PublicationItem'
import getProfilePublicationMock from '../../mocks/get-profile-publication-mock/get-profile-publication-mock'

const renderComponent = (
  props: Pick<PublicationItemProps, 'item' | 'toggle'>
) =>
  render(
    <TestWrapper>
      <PublicationItem highlighted={false} {...props} />
    </TestWrapper>
  )

describe('PublicationItem', () => {
  it('renders item', () => {
    renderComponent({
      item: getProfilePublicationMock({
        title: 'Blog post title',
        url: 'https://blog.post.url'
      }),
      toggle: jest.fn()
    })

    expect(screen.getByText(/Blog post title/)).toBeInTheDocument()
    expect(screen.getByText('https://blog.post.url')).toBeInTheDocument()
  })

  it('toggles item on click', () => {
    const handleClick = jest.fn()

    renderComponent({
      item: getProfilePublicationMock({
        id: 'item-id',
        title: 'Blog post title'
      }),
      toggle: handleClick
    })

    fireEvent.click(screen.getByText(/Blog post title/))

    expect(handleClick).toHaveBeenCalledWith('item-id')
  })
})
