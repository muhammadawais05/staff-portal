import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'

import PublicationItemPreview from '.'
import getProfilePublicationMock from '../../mocks/get-profile-publication-mock/get-profile-publication-mock'

describe('PublicationItem', () => {
  it('renders item', () => {
    render(
      <PublicationItemPreview
        item={getProfilePublicationMock({
          title: 'Blog post title',
          url: 'https://blog.post.url'
        })}
      />
    )

    expect(screen.getByText(/Blog post title/)).toBeInTheDocument()
    expect(screen.getByText('https://blog.post.url')).toBeInTheDocument()
  })
})
