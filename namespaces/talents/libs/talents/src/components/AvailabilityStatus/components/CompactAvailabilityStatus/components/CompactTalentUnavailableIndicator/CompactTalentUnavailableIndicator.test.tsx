import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import CompactTalentUnavailableIndicator from './CompactTalentUnavailableIndicator'

const arrangeTest = (
  props: ComponentProps<typeof CompactTalentUnavailableIndicator>
) =>
  render(
    <TestWrapper>
      <CompactTalentUnavailableIndicator {...props} />
    </TestWrapper>
  )

describe('CompactTalentUnavailableIndicator', () => {
  it('renders question icon and indicator with future availability', () => {
    arrangeTest({
      unavailableAllocatedHoursChangeRequest: {
        id: '1',
        futureCommitment: 40,
        rejectReason: 'not_working',
        returnInDate: '2022-02-10'
      }
    })

    expect(screen.getByTestId('question-icon')).toBeInTheDocument()
    expect(screen.getByTestId('indicator-green')).toBeInTheDocument()
  })
})
