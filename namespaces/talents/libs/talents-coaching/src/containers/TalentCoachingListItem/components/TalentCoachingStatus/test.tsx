import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TalentCoachingEngagementStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import TalentCoachingStatus from '.'

jest.unmock('@staff-portal/editable')

jest.mock('../../../../data', () => ({
  getTalentCoachingEngagementHook: () => () => ({ request: jest.fn() })
}))
jest.mock('./data', () => ({
  useChangeCoachingStatusMutation: () => [jest.fn()]
}))

const arrangeTest = (
  props: Partial<ComponentProps<typeof TalentCoachingStatus>> = {}
) => {
  return render(
    <TestWrapper>
      <TalentCoachingStatus
        coachingEngagementId='123'
        status={TalentCoachingEngagementStatus.PENDING_CLAIM}
        operationDisabled={props.operationDisabled ?? false}
      />
    </TestWrapper>
  )
}

describe('TalentCoachingStatus', () => {
  describe('when operation is disabled', () => {
    it('renders non-editable value', () => {
      arrangeTest({ operationDisabled: true })

      expect(screen.queryByText('Pending claim')).toBeInTheDocument()
      expect(
        screen.queryByTestId('EditableField-toggle-button-status')
      ).not.toBeInTheDocument()
    })
  })

  describe('when operation is enabled', () => {
    it('renders editable value', () => {
      arrangeTest({ operationDisabled: false })

      expect(screen.queryByText('Pending claim')).toBeInTheDocument()
      expect(
        screen.getByTestId('EditableField-toggle-button-status')
      ).toBeEnabled()
    })
  })
})
