import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper, assertOnTooltipText } from '@staff-portal/test-utils'

import TalentAvatar, { Props } from './TalentAvatar'

const defaultProps: Props = {
  fullName: 'John Doe',
  photo: 'https://talent-avatar-url.net/1.png'
}

const arrangeTest = (props = defaultProps) =>
  render(
    <TestWrapper>
      <TalentAvatar {...props} data-testid='test-talent-avatar' />
    </TestWrapper>
  )

describe('TalentAvatar', () => {
  const { fullName, photo } = defaultProps

  it('shows the talent avatar', () => {
    arrangeTest(defaultProps)

    expect(screen.getByAltText(fullName)).toHaveAttribute('src', photo)
    expect(screen.queryByRole('link', { name: 'P' })).not.toBeInTheDocument()
  })

  describe('when the talent partner url does not exist (lack of permission)', () => {
    it('does not show talent partner link', () => {
      const props = { talentPartnerName: 'Tom Doe' }

      arrangeTest({ ...defaultProps, ...props })

      assertOnTooltipText(
        screen.getByText('P'),
        `Talent Partner: ${props.talentPartnerName}`
      )

      expect(screen.getByAltText(fullName)).toHaveAttribute('src', photo)
      expect(screen.queryByRole('link', { name: 'P' })).not.toBeInTheDocument()
    })
  })

  describe('when the talent does not have photo', () => {
    it('shows avatar alternative', () => {
      const props = { fullName: 'John Doe' }

      arrangeTest(props)

      expect(screen.getByText('JD')).toBeInTheDocument()
    })
  })

  describe('when a talent partner exists', () => {
    const props: Props = {
      ...defaultProps,
      talentPartnerName: 'Tom Doe',
      talentPartnerUrl: 'https://partner-url.net/1'
    }

    it('links to the partner', () => {
      arrangeTest(props)
      const partnerLink = screen.getByRole('link', { name: 'P' })

      expect(screen.getByAltText(fullName)).toHaveAttribute('src', photo)
      expect(partnerLink).toHaveAttribute('href', props.talentPartnerUrl)

      assertOnTooltipText(
        partnerLink,
        `Talent Partner: ${props.talentPartnerName}`
      )
    })

    describe('with size property', () => {
      it('shows the talent avatar in a small size container', () => {
        props.badgeSize = 'small'

        arrangeTest(props)

        expect(screen.getByTestId('talent-partner-badge')).toHaveAttribute(
          '_css',
          expect.stringContaining('width:0.75rem')
        )
      })

      it('shows the talent avatar in a large size container', () => {
        props.badgeSize = 'large'

        arrangeTest(props)

        expect(screen.getByTestId('talent-partner-badge')).toHaveAttribute(
          '_css',
          expect.stringContaining('width:1.5rem')
        )
      })
    })
  })

  // TODO: in the Picasso Avatar component, classes were updated
  // this test case, should be investigated for the correctness
  // https://toptal-core.atlassian.net/browse/SPB-2794
  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('with avatarSize property', () => {
    it('forwards the size to the Avatar component', () => {
      const props: Props = {
        ...defaultProps,
        avatarSize: 'xxsmall'
      }

      arrangeTest(props)
      const container = screen.getByTestId('test-talent-avatar')

      expect(container.firstChild).toHaveClass('PicassoAvatar-xxsmall-56')
    })
  })

  describe('with additional Picasso Container properties', () => {
    it('forwards props to the wrapper Container component', () => {
      const props: Props = {
        ...defaultProps,
        right: 'small',
        bordered: true
      }

      arrangeTest(props)
      const container = screen.getByTestId('test-talent-avatar')

      expect(container).toHaveClass('PicassoContainer-rightsmallMargin-36')
      expect(container).toHaveClass('PicassoContainer-bordered-4')
    })
  })
})
