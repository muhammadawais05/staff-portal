import React, { ComponentProps } from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import TwitterLink from './TwitterLink'

const arrangeTest = (props: ComponentProps<typeof TwitterLink>) =>
  render(
    <TestWrapper>
      <TwitterLink {...props} />
    </TestWrapper>
  )

describe('TwitterLink', () => {
  it('renders default', () => {
    const url = 'url'
    const text = 'text'

    arrangeTest({
      url,
      text
    })

    expect(screen.getByTestId('twitter-link-text').innerHTML).toEqual(text)
    expect(screen.getByTestId('twitter-link-link')).toHaveAttribute('href', url)
  })
})
