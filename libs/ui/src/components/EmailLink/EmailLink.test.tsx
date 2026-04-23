import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { Link } from '@staff-portal/navigation'

import EmailLink from './EmailLink'

jest.mock('@staff-portal/navigation', () => ({
  Link: jest.fn()
}))

const renderComponent = (props: ComponentProps<typeof EmailLink>) =>
  render(<EmailLink {...props} />)

const MockLink = Link as unknown as jest.Mock

describe('EmailLink', () => {
  it('renders link', () => {
    MockLink.mockReturnValueOnce(null)

    const email = 'email'

    renderComponent({
      email
    })

    expect(MockLink).toHaveBeenCalledTimes(1)
    expect(MockLink).toHaveBeenCalledWith(
      {
        href: `mailto:${email}`,
        children: email
      },
      {}
    )
  })
})
