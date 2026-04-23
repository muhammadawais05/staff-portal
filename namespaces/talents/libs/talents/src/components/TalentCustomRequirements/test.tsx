import React from 'react'
import { render, screen } from '@testing-library/react'
import { NO_VALUE } from '@staff-portal/config'
import { TestWrapper } from '@staff-portal/test-utils'

import TalentCustomRequirements, { Props } from './TalentCustomRequirements'

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <TalentCustomRequirements {...props} />
    </TestWrapper>
  )

describe('TalentCustomRequirements', () => {
  it('render all requrements', () => {
    arrangeTest({
      customRequirements: {
        backgroundCheck: true,
        drugTest: true,
        timeTrackingTools: true
      }
    })

    expect(
      screen.getByText('Background check / Drug test / Time tracking tools')
    ).toBeInTheDocument()
  })

  it('render empty value', () => {
    arrangeTest({
      customRequirements: {
        backgroundCheck: null,
        drugTest: null,
        timeTrackingTools: false
      }
    })

    expect(screen.getByText(NO_VALUE)).toBeInTheDocument()
  })

  it('properlly formats custom requirements', () => {
    arrangeTest({
      customRequirements: {
        backgroundCheck: false,
        drugTest: true,
        timeTrackingTools: true
      }
    })

    expect(
      screen.getByText('Drug test / Time tracking tools')
    ).toBeInTheDocument()
  })
})
