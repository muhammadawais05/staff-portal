import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import ReferringSteps from './ReferringSteps'

jest.mock(
  '../../services/get-referral-rewards-description/get-referral-rewards-description',
  () => ({
    getReferralRewardsDescription: () => ''
  })
)

jest.mock('../SocialButtons/SocialButtons', () => ({
  __esModule: true,
  default: () => <>SocialButtons</>
}))

describe('ReferringSteps', () => {
  const SHARE_URL = 'test.url#abc'
  const SHARE_SLUG = 'abc'

  beforeEach(() => {
    render(
      <TestWrapper>
        <ReferringSteps
          referralSlug={SHARE_SLUG}
          referralUrl={SHARE_URL}
          companySourcingCommission={{ commission: '1' }}
          talentSourcingCommission={{ commission: '1' }}
        />
      </TestWrapper>
    )
  })

  it('renders correctly and can copy to url to clipboard', () => {
    expect(screen.getByDisplayValue(SHARE_URL)).toBeInTheDocument()
    expect(screen.getByText(`#${SHARE_SLUG}`)).toBeInTheDocument()
    expect(screen.getByText('SocialButtons')).toBeInTheDocument()
  })

  it('copies share url to clipboard', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {}
      }
    })
    jest.spyOn(navigator.clipboard, 'writeText')

    fireEvent.click(screen.getByText('Copy Link'))

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(SHARE_URL)
    expect(
      await screen.findByText('Your referral link was copied to clipboard.')
    ).toBeInTheDocument()
  })
})
