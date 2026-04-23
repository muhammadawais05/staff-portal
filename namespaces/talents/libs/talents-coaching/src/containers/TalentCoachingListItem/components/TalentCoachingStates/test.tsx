import React from 'react'
import { render, screen } from '@testing-library/react'
import { TalentCoachingEngagementState } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import TalentCoachingStates from './'

const arrangeTest = (states: TalentCoachingEngagementState[]) => {
  render(
    <TestWrapper>
      <TalentCoachingStates states={states} />
    </TestWrapper>
  )
}

describe('TalentCoachingStates', () => {
  describe('when array of states presented', () => {
    it('renders talent states', () => {
      arrangeTest([{ id: '1', color: 'red', label: 'Not on Slack' }])

      expect(screen.getByText('Not on Slack')).toBeInTheDocument()
    })
  })

  describe('when array of states empty', () => {
    it('renders empty indicator', () => {
      arrangeTest([])

      expect(screen.getByText('—')).toBeInTheDocument()
    })
  })
})
