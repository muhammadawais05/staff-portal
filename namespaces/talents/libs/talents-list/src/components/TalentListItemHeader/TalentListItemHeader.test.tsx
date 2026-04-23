import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper, assertOnTooltipText } from '@staff-portal/test-utils'

import TalentListItemHeader from './TalentListItemHeader'
import { createTalentsListItemFragmentMock } from '../../data/talents-list-item-fragment/mocks'
import { TalentsListItemFragment } from '../../data'

jest.mock('@staff-portal/role-flags', () => ({
  ...jest.requireActual('@staff-portal/role-flags'),
  RoleFlags: ({ roleId }: { roleId: string }) => (
    <div data-testid='role-flags-id'>{roleId}</div>
  )
}))

const arrangeTest = ({ talent }: { talent: TalentsListItemFragment }) =>
  render(
    <TestWrapper>
      <TalentListItemHeader
        talentId={talent.id}
        talentName={talent.fullName}
        talentPhoto={talent.photo?.small}
        talentUrl={talent.webResource.url}
        talentPartnerName={talent.talentPartner?.webResource?.text}
        talentPartnerUrl={talent.talentPartner?.webResource?.url}
        ofacStatus={talent.ofacStatus}
        ofacStatusComment={talent.ofacStatusComment}
      />
    </TestWrapper>
  )

describe('TalentListItemHeader', () => {
  it('displays avatar', () => {
    const talentName = 'Test Name akc82d'
    const talentPhoto = 'https://example.com/akdj82'

    arrangeTest({
      talent: createTalentsListItemFragmentMock({
        fullName: talentName,
        photo: {
          small: talentPhoto
        }
      })
    })

    expect(screen.getByAltText(talentName)).toHaveAttribute('src', talentPhoto)
  })

  it('displays avatar with talent partner badge', () => {
    const talentName = 'Test Name akc82d'
    const talentPhoto = 'https://example.com/akdj82'
    const talentPartnerName = 'Tom Doe'
    const talentPartnerUrl = 'https://partner-url.net/1'

    arrangeTest({
      talent: createTalentsListItemFragmentMock({
        fullName: talentName,
        photo: {
          small: talentPhoto
        },
        talentPartner: {
          id: '123',
          webResource: {
            text: talentPartnerName,
            url: talentPartnerUrl
          }
        }
      })
    })

    const partnerLink = screen.getByRole('link', { name: 'P' })

    expect(screen.getByAltText(talentName)).toHaveAttribute('src', talentPhoto)
    expect(partnerLink).toBeInTheDocument()
    expect(partnerLink).toHaveAttribute('href', talentPartnerUrl)

    assertOnTooltipText(partnerLink, `Talent Partner: ${talentPartnerName}`)
  })

  it('displays role flags', () => {
    const TALENT_ID = 'acj82d'

    arrangeTest({
      talent: createTalentsListItemFragmentMock({
        id: TALENT_ID
      })
    })

    expect(screen.getByTestId('role-flags-id').textContent).toEqual(TALENT_ID)
  })
})
