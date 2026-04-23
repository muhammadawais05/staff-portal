import React from 'react'
import { render } from '@testing-library/react'
import { TypographyOverflowLink } from '@staff-portal/ui'
import { Link } from '@staff-portal/navigation'

import SkypeLink from './SkypeLink'

jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  TypographyOverflowLink: jest.fn()
}))

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  Link: jest.fn()
}))

const LinkMock = Link as unknown as jest.Mock
const TypographyOverflowLinkMock = TypographyOverflowLink as jest.Mock

describe('SkypeLink', () => {
  beforeEach(() => {
    TypographyOverflowLinkMock.mockImplementation(({ children }) => (
      <>{children}</>
    ))
    LinkMock.mockReturnValue(null)
  })

  it('renders link with expected props passed', () => {
    const skypeId = 'TEST_SKYPE_ID'

    render(<SkypeLink skypeId={skypeId} />)

    expect(TypographyOverflowLinkMock).toHaveBeenCalledTimes(1)
    expect(TypographyOverflowLinkMock).toHaveBeenCalledWith(
      expect.objectContaining({
        tooltipContent: skypeId
      }),
      {}
    )

    expect(LinkMock).toHaveBeenCalledTimes(1)
    expect(LinkMock).toHaveBeenCalledWith(
      expect.objectContaining({
        href: `skype:${skypeId}`,
        children: skypeId
      }),
      {}
    )
  })
})
