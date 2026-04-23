import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { TalentPartnerFragment } from '@staff-portal/talents'

import { createTalentForCoachingEngagementFragmentMock } from '../../../../data/talent-for-coaching-engagement-fragment/mocks'
import CoachingHeader from './CoachingHeader'

jest.mock('../Flags', () => () => <div data-testid='flags' />)

const arrangeTest = (props: ComponentProps<typeof CoachingHeader>) =>
  render(
    <TestWrapper>
      <CoachingHeader {...props} />
    </TestWrapper>
  )

describe('TalentHeader', () => {
  it('displays all information', () => {
    const fullName = 'John'
    const photoUrl = 'small_avatar_url'
    const countryName = 'UA'
    const talentLinkUrl = 'http://link.com'
    const talentType = 'Core Developer'
    const timeZoneName = 'UTC'
    const talentPartner: TalentPartnerFragment['talentPartner'] = {
      id: '123',
      webResource: { text: 'Tom Doe', url: 'https://partner-url.net/1' }
    }

    arrangeTest({
      talent: createTalentForCoachingEngagementFragmentMock({
        fullName,
        locationV2: {
          countryName: countryName
        },
        photo: {
          small: photoUrl
        },
        talentType,
        timeZone: {
          name: timeZoneName
        },
        webResource: {
          text: fullName,
          url: talentLinkUrl
        },
        talentPartner
      }),
      actions: <div data-testid='actions' />
    })

    const talentLink = screen.getByTestId('talent-link')

    expect(talentLink.textContent).toEqual(fullName)
    expect(talentLink.getAttribute('href')).toEqual(talentLinkUrl)

    const avatar = screen.getByTestId('avatar')
    const partnerLink = screen.getByRole('link', { name: 'P' })

    expect(avatar).toBeInTheDocument()
    expect(partnerLink).toBeInTheDocument()
    expect(partnerLink).toHaveAttribute('href', talentPartner.webResource.url)
    expect(screen.getByTestId('actions')).toBeInTheDocument()
    expect(screen.getByTestId('flags')).toBeInTheDocument()

    expect(
      screen.getByText(`${talentType} • ${countryName}`)
    ).toBeInTheDocument()

    expect(screen.getByText('UTC')).toBeInTheDocument()
  })
})
