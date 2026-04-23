import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { Link } from '@staff-portal/navigation'

import ExternalLink from './ExternalLink'
import TypographyOverflowLink from '../TypographyOverflowLink'

jest.mock('@staff-portal/navigation', () => ({
  Link: jest.fn()
}))
jest.mock('../TypographyOverflowLink', () => ({
  __esModule: true,
  default: jest.fn()
}))

const arrangeTest = (props: ComponentProps<typeof ExternalLink>) =>
  render(<ExternalLink {...props} />)

const MockLink = Link as unknown as jest.Mock
const MockTypographyOverflowLink = TypographyOverflowLink as jest.Mock

describe('ExternalLink', () => {
  beforeEach(() => {
    MockLink.mockReturnValueOnce(null)
    MockTypographyOverflowLink.mockImplementationOnce(({ children }) => (
      <>{children}</>
    ))
  })

  describe('when text is not passed', () => {
    it('renders a link with the href', () => {
      const href = Symbol('href') as unknown as string

      arrangeTest({
        href
      })

      expect(MockLink).toHaveBeenCalledTimes(1)
      expect(MockLink).toHaveBeenCalledWith(
        {
          href,
          target: '_blank',
          children: href
        },
        {}
      )
    })
  })
})
