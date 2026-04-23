import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'

import TalentAssigned from './TalentAssigned'

const renderComponent = () =>
  render(
    <TestWrapper>
      <TalentAssigned
        talentType='developer'
        talentLink={{ text: 'Talent Name' }}
        jobLink={{ text: 'Job Title' }}
      />
    </TestWrapper>
  )

describe('TalentAssigned', () => {
  it('shows talent assigned details', () => {
    renderComponent()

    expect(screen.getByTestId('talent-assigned-header')).toHaveTextContent(
      "Congratulations — you've just assigned a developer to a job!"
    )

    expect(screen.getByTestId('talent-assigned-content')).toHaveTextContent(
      'You have successfully assigned Talent Name to the job Job Title.'
    )
  })
})
