import React, { ComponentProps } from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { Tooltip, Typography } from '@toptal/picasso'
import { getNameInitials } from '@toptal/picasso/utils'
import { Link } from '@staff-portal/navigation'
import { NO_VALUE } from '@staff-portal/config'

jest.mock('@toptal/picasso', () => ({
  Typography: jest.fn(),
  Tooltip: jest.fn()
}))
jest.mock('@toptal/picasso/utils', () => ({
  getNameInitials: jest.fn()
}))
jest.mock('@staff-portal/navigation', () => ({
  Link: jest.fn()
}))

const TooltipMock = Tooltip as unknown as jest.Mock
const TypographyMock = Typography as unknown as jest.Mock
const LinkMock = Link as unknown as jest.Mock
const getNameInitialsMock = getNameInitials as jest.Mock

import { ClientCardMatcher } from './ClientCardMatcher'

const renderComponent = (props?: ComponentProps<typeof ClientCardMatcher>) =>
  render(<ClientCardMatcher {...props} />)

describe('ClientCardMatcher', () => {
  beforeEach(() => {
    TypographyMock.mockImplementation(({ children }) => <>{children}</>)
    TooltipMock.mockImplementation(({ children }) => <>{children}</>)
    LinkMock.mockImplementation(({ children }) => <>{children}</>)
    getNameInitialsMock.mockImplementation(() => 'INITIALS')
  })

  describe('when user is not supplied', () => {
    it('renders NO_VALUE', () => {
      renderComponent()

      expect(screen.getByText(NO_VALUE)).toBeInTheDocument()

      expect(TypographyMock).not.toHaveBeenCalled()
    })
  })

  describe('when url is not supplied', () => {
    it('renders a link with a tooltip', () => {
      renderComponent({
        fullName: 'Client Matcher'
      })

      expect(TooltipMock).not.toHaveBeenCalled()
      expect(LinkMock).not.toHaveBeenCalled()
      expect(getNameInitialsMock).toHaveBeenCalledWith('Client Matcher')
    })
  })

  describe('when url is supplied', () => {
    it('renders a link with a tooltip', () => {
      renderComponent({
        fullName: 'Client Matcher',
        url: 'https://toptal.com'
      })

      expect(TooltipMock).toHaveBeenCalledWith(
        expect.objectContaining({
          content: 'Client Matcher'
        }),
        {}
      )
      expect(LinkMock).toHaveBeenCalledWith(
        expect.objectContaining({
          href: 'https://toptal.com',
          children: 'INITIALS'
        }),
        {}
      )
    })

    it('adds vertical name to the tooltip when vertical is supplied', () => {
      renderComponent({
        fullName: 'Client Matcher',
        url: 'https://toptal.com',
        verticalName: 'Vertical Mock'
      })

      expect(TooltipMock).toHaveBeenCalledWith(
        expect.objectContaining({
          content: 'Client Matcher (Vertical Mock)'
        }),
        {}
      )
    })
  })
})
