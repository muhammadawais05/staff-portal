import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper, assertOnTooltipText } from '@staff-portal/test-utils'

import TalentHeader from './TalentHeader'

const TALENT_NAME = 'John'

const defaultProps = {
  fullName: TALENT_NAME
}

const arrangeTest = (props: ComponentProps<typeof TalentHeader>) =>
  render(
    <TestWrapper>
      <TalentHeader {...props} />
    </TestWrapper>
  )

describe('TalentHeader', () => {
  it('displays avatar', () => {
    const photo = 'https://talent-avatar-url.net/1.png'

    arrangeTest({ ...defaultProps, photo })

    expect(screen.getByAltText(TALENT_NAME)).toHaveAttribute('src', photo)
  })

  it('displays avatar with talent partner badge', () => {
    const photo = 'https://talent-avatar-url.net/1.png'
    const talentPartnerName = 'Tom Doe'
    const talentPartnerUrl = 'https://partner-url.net/1'

    arrangeTest({ ...defaultProps, photo, talentPartnerName, talentPartnerUrl })

    const partnerLink = screen.getByRole('link', { name: 'P' })

    expect(screen.getByAltText(TALENT_NAME)).toHaveAttribute('src', photo)
    expect(partnerLink).toBeInTheDocument()
    expect(partnerLink).toHaveAttribute('href', talentPartnerUrl)
    assertOnTooltipText(partnerLink, `Talent Partner: ${talentPartnerName}`)
  })

  it('displays actions', () => {
    const ACTIONS_TESTID = 'actions'
    const actions = <div data-testid={ACTIONS_TESTID} />

    arrangeTest({ ...defaultProps, actions })

    expect(screen.getByTestId(ACTIONS_TESTID)).toBeInTheDocument()
  })

  it('displays flags', () => {
    const FLAGS_TESTID = 'flags'
    const flags = <div data-testid={FLAGS_TESTID} />

    arrangeTest({ ...defaultProps, flags })

    expect(screen.getByTestId(FLAGS_TESTID)).toBeInTheDocument()
  })
})
