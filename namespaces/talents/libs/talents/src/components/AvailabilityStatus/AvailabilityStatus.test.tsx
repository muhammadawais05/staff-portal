import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { createTalentAvailabilityFragmentMock } from '../../data/talent-availability-fragment/mocks'
import AvailabilityStatus from './AvailabilityStatus'

const arrangeTest = (props: ComponentProps<typeof AvailabilityStatus>) =>
  render(
    <TestWrapper>
      <AvailabilityStatus {...props} />
    </TestWrapper>
  )

const talentAvailability = createTalentAvailabilityFragmentMock({
  type: 'Developer'
})
const associatedRoles = [
  createTalentAvailabilityFragmentMock({ type: 'Designer' }),
  createTalentAvailabilityFragmentMock({ type: 'Project Manager' })
]

describe('AvailabilityStatus', () => {
  it('shows status for talent and associated roles', () => {
    arrangeTest({
      talentAvailability,
      associatedRoles
    })

    expect(
      screen.getByTestId('availability-status-developer')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('availability-status-designer')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('availability-status-project-manager')
    ).toBeInTheDocument()
  })

  it('render compact availability status for compact mode', () => {
    arrangeTest({
      talentAvailability,
      associatedRoles,
      mode: 'compact'
    })

    expect(
      screen.getByTestId('compact-availability-status')
    ).toBeInTheDocument()
  })
})
