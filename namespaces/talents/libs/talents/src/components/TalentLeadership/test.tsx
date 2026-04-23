import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import TalentLeadership, { Props } from './TalentLeadership'

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <TalentLeadership {...props} />
    </TestWrapper>
  )

describe('TalentLeadership', () => {
  it('render talent experience in leadership', () => {
    arrangeTest({
      yearsOfManagementExperience: 3,
      cumulativeReportRange: {
        from: 2,
        to: 4
      }
    })

    expect(screen.getByText('3 years (2 to 4 reports)')).toBeInTheDocument()
  })

  it('renders if not complete data', () => {
    arrangeTest({
      yearsOfManagementExperience: 3,
      cumulativeReportRange: {
        from: null
      }
    })

    expect(screen.getByText('3 years')).toBeInTheDocument()
  })

  it('renders if talent has no experience in leadership', () => {
    arrangeTest({})

    expect(screen.getByText('No')).toBeInTheDocument()
  })
})
