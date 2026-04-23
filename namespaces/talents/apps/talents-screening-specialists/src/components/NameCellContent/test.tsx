import React from 'react'
import { render, screen } from '@testing-library/react'
import { RouteType, RouteContext } from '@staff-portal/navigation'
import { TestWrapper } from '@staff-portal/test-utils'
import { Talent } from '@staff-portal/talents-screening-specialists'
import { createTalentMock } from '@staff-portal/talents-screening-specialists/src/mocks'

import NameCellContent from './NameCellContent'
const route: RouteType = path => ({ url: path })

const defaultTalent = createTalentMock({
  fullName: 'John Doe',
  webResource: { url: 'http://talent/123' },
  talentType: 'Designer',
  specializationApplications: {
    nodes: [
      {
        id: 'test-id',
        specialization: { id: 'test-id', title: 'UX' }
      }
    ]
  }
})

const talentWithPartner = createTalentMock({
  fullName: 'John Doe',
  webResource: { url: 'http://talent/123' },
  talentType: 'Designer',
  specializationApplications: {
    nodes: [
      {
        id: 'test-id',
        specialization: { id: 'test-id', title: 'UX' }
      }
    ]
  },
  talentPartner: {
    id: '123',
    webResource: { text: 'Tom Doe', url: 'https://partner-url.net/1' }
  }
})

const arrangeTest = (talent: Talent) =>
  render(
    <RouteContext.Provider value={route}>
      <TestWrapper>
        <NameCellContent talent={talent} />
      </TestWrapper>
    </RouteContext.Provider>
  )

describe('NameCell', () => {
  it('shows talent link on talent name', () => {
    arrangeTest(defaultTalent)

    const talentName = screen.getByText('John Doe')

    expect(talentName.closest('a')?.href).toBe('http://talent/123')
  })

  it('shows talent avatar with talent partner badge', () => {
    arrangeTest(talentWithPartner)

    const talentName = screen.getByText('John Doe')
    const partnerLink = screen.getByText('P')
    const partnerUrl = talentWithPartner.talentPartner?.webResource?.url

    expect(partnerLink).toBeInTheDocument()
    expect(partnerLink).toHaveAttribute('href', partnerUrl)
    expect(talentName.closest('a')?.href).toBe('http://talent/123')
  })
})
