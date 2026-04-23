import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'

import EmailIcon from '../EmailIcon/EmailIcon'
import TalentSent from './TalentSent'

jest.mock('../EmailIcon/EmailIcon')
const mockEmailIcon = EmailIcon as jest.Mock

const renderComponent = () => {
  mockEmailIcon.mockImplementation(() => null)

  return render(
    <TestWrapper>
      <TalentSent
        talentType='developer'
        talentLink={{ text: 'Talent Name' }}
        jobLink={{ text: 'Job Title' }}
      />
    </TestWrapper>
  )
}

describe('TalentAssigned', () => {
  it('shows talent sent details', () => {
    renderComponent()

    expect(mockEmailIcon).toHaveBeenCalled()

    expect(screen.getByTestId('talent-sent-header')).toHaveTextContent(
      "you've just sent a developer to a job!"
    )

    expect(screen.getByTestId('talent-sent-success-message')).toHaveTextContent(
      'You have successfully sent Talent Name to the job Job Title.'
    )

    expect(
      screen.getByTestId('talent-sent-schedule-message')
    ).toHaveTextContent(
      'The company now has 3 days to either reject the profile or schedule an interview.'
    )
  })
})
