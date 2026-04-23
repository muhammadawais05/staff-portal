import React, { ReactNode } from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import TalentTaskCardActions from './TalentTaskCardActions'

jest.mock('@staff-portal/tasks', () => ({
  TaskCardLayout: {
    Actions: ({ children }: { children: ReactNode }) => children
  },
  TimelineButton: () => <div data-testid='timeline-button' />
}))

jest.mock('@staff-portal/communication-send-email', () => ({
  ...jest.requireActual('@staff-portal/communication-send-email'),
  SendEmailActionItem: () => <div data-testid='send-email-button' />
}))

const arrangeTest = () =>
  render(
    <TestWrapper>
      <TalentTaskCardActions talentId='1' />
    </TestWrapper>
  )

describe('TalentTaskCardActions', () => {
  it('renders', () => {
    arrangeTest()

    expect(screen.getByTestId('timeline-button')).toBeInTheDocument()
    expect(screen.getByTestId('send-email-button')).toBeInTheDocument()
  })
})
