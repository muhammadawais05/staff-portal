import React from 'react'
import { render } from '@testing-library/react'
import { Link } from '@staff-portal/navigation'

import SlackField, { Props } from './SlackField'

jest.mock('@staff-portal/navigation', () => ({
  Link: jest.fn()
}))

const arrangeTest = (props: Props) => render(<SlackField {...props} />)

describe('SlackField', () => {
  beforeEach(() => {
    const LinkMock = Link as unknown as jest.Mock

    LinkMock.mockReturnValue(null)
  })

  it('does not render when there is no contact', () => {
    arrangeTest({
      slackContacts: { nodes: [] }
    })

    expect(Link).toHaveBeenCalledTimes(0)
  })

  it('renders Link', () => {
    arrangeTest({
      slackContacts: {
        nodes: [{ id: 'phoneid', webResource: { url: 'url', text: 'text' } }]
      }
    })

    expect(Link).toHaveBeenCalledWith(
      expect.objectContaining({
        href: 'url',
        target: '_blank',
        children: 'text'
      }),
      {}
    )
  })
})
