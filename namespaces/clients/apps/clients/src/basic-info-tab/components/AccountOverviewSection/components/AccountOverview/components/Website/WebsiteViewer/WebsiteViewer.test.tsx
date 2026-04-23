import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { TestWrapper } from '@staff-portal/test-utils'
import { NO_VALUE } from '@staff-portal/config'

import WebsiteViewer from './WebsiteViewer'

jest.mock('@staff-portal/ui/src/components/TypographyOverflowLink')
jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  Link: jest.fn()
}))
jest.mock('@toptal/picasso/Typography', () => jest.fn())

const LinkMock = Link as unknown as jest.Mock
const TypographyMock = Typography as unknown as jest.Mock

describe('useRenderWebsite', () => {
  it('renders link for website', () => {
    const url = 'http://test.url'

    LinkMock.mockImplementation(() => 'link')

    render(
      <TestWrapper>
        <WebsiteViewer website={url} />
      </TestWrapper>
    )

    expect(screen.getByText('link')).toBeInTheDocument()
    expect(LinkMock).toHaveBeenCalledTimes(1)
    expect(LinkMock).toHaveBeenCalledWith(
      {
        href: url,
        children: url,
        target: '_blank',
        rel: 'noopener noreferrer'
      },
      {}
    )
  })

  it.each([undefined, ''])('returns dash for empty url', url => {
    TypographyMock.mockReturnValue(null)

    render(
      <TestWrapper>
        <WebsiteViewer website={url} />
      </TestWrapper>
    )

    expect(Typography).toHaveBeenCalledTimes(1)
    expect(Typography).toHaveBeenCalledWith(
      {
        size: 'medium',
        children: NO_VALUE
      },
      expect.anything()
    )
  })
})
