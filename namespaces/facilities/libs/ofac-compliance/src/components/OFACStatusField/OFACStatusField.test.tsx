import React from 'react'
import { render, screen } from '@testing-library/react'
import { VisualComplianceStatus, OfacStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import OFACStatusField, { Props } from './OFACStatusField'

const arrangeTest = ({ ofacStatus, visualComplianceStatus }: Props) => {
  render(
    <TestWrapper>
      <OFACStatusField
        ofacStatus={ofacStatus}
        visualComplianceStatus={visualComplianceStatus}
      />
    </TestWrapper>
  )
}

describe('OfacStatusField', () => {
  it('renders OFAC status and visual compliance status', () => {
    const OFAC_STATUS = {
      value: OfacStatus.NORMAL,
      text: 'Normal'
    }
    const VISUAL_COMPLIANCE_STATUS = {
      value: VisualComplianceStatus.FULLY_CHECKED,
      text: 'verified via Visual Compliance'
    }

    arrangeTest({
      ofacStatus: OFAC_STATUS.value,
      visualComplianceStatus: VISUAL_COMPLIANCE_STATUS.value
    })

    expect(screen.getByTestId(/ofac-status-field/i)).toHaveTextContent(
      new RegExp(
        `${OFAC_STATUS.text} \\(${VISUAL_COMPLIANCE_STATUS.text}\\)`,
        'i'
      )
    )
  })
})
