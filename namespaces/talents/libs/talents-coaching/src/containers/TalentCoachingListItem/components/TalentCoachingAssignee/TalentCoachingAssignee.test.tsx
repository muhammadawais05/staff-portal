import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import TalentCoachingAssignee from '.'

jest.unmock('@staff-portal/editable')

jest.mock('./data', () => ({
  useAssignCoachMutation: () => [jest.fn()]
}))
jest.mock('../../../../data', () => ({
  useGetCoachingAssignees: () => ({ assignees: [] }),
  getTalentCoachingEngagementHook: () => () => ({ request: jest.fn() })
}))

const arrangeTest = (
  props: Partial<ComponentProps<typeof TalentCoachingAssignee>> = {}
) => {
  return render(
    <TestWrapper>
      <TalentCoachingAssignee
        coachingEngagementId='123'
        coach={{
          id: '234',
          fullName: 'John Doe',
          webResource: { text: 'John Doe', url: 'url' }
        }}
        editingDisabled={props.editingDisabled ?? false}
      />
    </TestWrapper>
  )
}

describe('TalentCoachingAssignee', () => {
  describe('when operation is disabled', () => {
    it('renders non-editable value', () => {
      arrangeTest({ editingDisabled: true })

      expect(screen.queryByText('John Doe')).toBeInTheDocument()
      expect(
        screen.queryByTestId('EditableField-toggle-button-coachId')
      ).not.toBeInTheDocument()
    })
  })

  describe('when operation is enabled', () => {
    it('renders editable value', () => {
      arrangeTest({ editingDisabled: false })

      expect(screen.queryByText('John Doe')).toBeInTheDocument()
      expect(
        screen.getByTestId('EditableField-toggle-button-coachId')
      ).toBeEnabled()
    })
  })
})
