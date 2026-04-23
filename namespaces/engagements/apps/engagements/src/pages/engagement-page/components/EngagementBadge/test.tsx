import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import EngagementBadge, {
  Props as EngagementBadgeProps
} from './EngagementBadge'

const arrangeTest = (props: EngagementBadgeProps) =>
  render(
    <TestWrapper>
      <EngagementBadge {...props} />
    </TestWrapper>
  )

describe('EngagementBadge', () => {
  it('shows proper name', () => {
    arrangeTest({
      profileLink: {},
      fullName: 'Name',
      defaultAvatar: <div />
    })

    expect(screen.getByText('Name')).toBeInTheDocument()
  })

  it('shows default avatar', () => {
    arrangeTest({
      profileLink: {},
      fullName: 'Name',
      defaultAvatar: <span>default avatar</span>
    })

    expect(screen.queryByText('default avatar')).toBeInTheDocument()
  })

  it('shows default photo avatar', () => {
    arrangeTest({
      photo: { default: 'some-url.jng' },
      profileLink: {},
      fullName: 'Name',
      defaultAvatar: <span>default avatar</span>
    })

    expect(screen.queryByAltText('Name')).toHaveAttribute('src', 'some-url.jng')
  })

  describe('when `profileLink` field is set', () => {
    const profileUrl =
      'https://staging.toptal.net/resume/obfuscated_slug_000000'
    const linkClassName = 'EngagementBadge-link'

    describe('when `profileLink.url` field is set', () => {
      it('shows profile link url with target `_self`', () => {
        arrangeTest({
          photo: { default: 'some-url.jng' },
          profileLink: {
            url: profileUrl
          },
          fullName: 'Name',
          defaultAvatar: <span>default avatar</span>
        })

        const link = screen.getByTestId(linkClassName)

        expect(link).toHaveAttribute('href', profileUrl)
        expect(link).toHaveAttribute('target', '_self')
      })
    })

    describe('when `profileLink.newTab` field is set', () => {
      it('shows profile link url with target `_blank', () => {
        arrangeTest({
          photo: { default: 'some-url.jng' },
          profileLink: {
            url: profileUrl,
            newTab: true
          },
          fullName: 'Name',
          defaultAvatar: <span>default avatar</span>
        })

        const link = screen.getByTestId(linkClassName)

        expect(link).toHaveAttribute('href', profileUrl)
        expect(link).toHaveAttribute('target', '_blank')
      })
    })
  })
})
