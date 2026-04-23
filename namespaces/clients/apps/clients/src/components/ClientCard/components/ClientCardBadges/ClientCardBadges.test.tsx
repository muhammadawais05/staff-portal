import { render, screen } from '@testing-library/react'
import React from 'react'
import { OfacStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { ClientFragment } from '@staff-portal/clients'

import { ClientCardBadges } from './ClientCardBadges'

const arrangeTest = (companyApplicant: Partial<ClientFragment>) =>
  render(
    <TestWrapper>
      <ClientCardBadges client={companyApplicant as ClientFragment} />
    </TestWrapper>
  )

describe('CompanyApplicantBadges', () => {
  it('the new flag should not be visible', () => {
    arrangeTest({ isNew: false })

    expect(screen.queryByText('New')).not.toBeInTheDocument()
  })

  it('the new flag should be visible', () => {
    arrangeTest({ isNew: true })

    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('the Not claimed yet flag should NOT be visible when there is a claimer', () => {
    arrangeTest({
      claimer: { id: '1', fullName: 'fullName', webResource: { text: 'text' } }
    })

    expect(screen.queryByText('Not claimed yet')).not.toBeInTheDocument()
  })

  it('the Not claimed yet flag should be visible when there is NO claimer', () => {
    arrangeTest({ claimer: null })

    expect(screen.getByText('Not claimed yet')).toBeInTheDocument()
  })

  it('the OFAC Investigation flag should be visible', () => {
    arrangeTest({
      claimer: null,
      ofacProhibitedCumulative: true,
      ofacStatus: OfacStatus.INVESTIGATION,
      ofacStatusComment: 'test comment'
    })

    expect(screen.getByText('OFAC Investigation')).toBeInTheDocument()
  })

  it('the OFAC Restricted flag should be visible', () => {
    arrangeTest({
      claimer: null,
      ofacProhibitedCumulative: true,
      ofacStatus: OfacStatus.RESTRICTED,
      ofacStatusComment: 'test comment'
    })

    expect(screen.getByText('OFAC Restricted')).toBeInTheDocument()
  })

  it("the OFAC Restricted flag shouldn't be visible", () => {
    arrangeTest({
      claimer: null,
      ofacProhibitedCumulative: false,
      ofacStatus: OfacStatus.NORMAL,
      ofacStatusComment: 'test comment'
    })

    expect(screen.queryByText('OFAC Restricted')).not.toBeInTheDocument()
    expect(screen.queryByText('OFAC Investigation')).not.toBeInTheDocument()
  })
})
