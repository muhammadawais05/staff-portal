import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from '@staff-portal/navigation'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { ActivityTabs } from '../TalentCoachingActivities/TalentCoachingActivities'
import { useTalentCoachingActivitiesContext } from '../TalentCoachingActivities/TalentCoachingActivitiesContext'
import AddNoteButton, { Props } from '../AddNoteButton/AddNoteButton'

jest.mock(
  '../TalentCoachingActivities/TalentCoachingActivitiesContext',
  () => ({
    __esModule: true,
    useTalentCoachingActivitiesContext: jest.fn()
  })
)

const mockUseTalentCoachingActivitiesContext =
  useTalentCoachingActivitiesContext as jest.Mock

const arrangeTest = (props: Props) =>
  render(
    <MemoryRouter>
      <TestWrapper>
        <AddNoteButton {...props} />
      </TestWrapper>
    </MemoryRouter>
  )

describe('AddNoteButton', () => {
  beforeEach(() => {
    mockUseTalentCoachingActivitiesContext.mockReturnValue({
      tabIndex: ActivityTabs.NOTES,
      setTabIndex: () => null,
      showCreateNoteForm: false,
      showCreateCoachingEngagementNoteForm: true,
      setShowCreateNoteForm: () => null,
      setIsExpanded: () => null,
      isExpanded: false
    })
  })

  describe('when createNoteOperation is hidden', () => {
    it('does not render "Add Note" button', () => {
      arrangeTest({
        createNoteOperation: {
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        }
      })
      expect(screen.queryByTestId('addNoteButton')).not.toBeInTheDocument()
    })
  })

  describe('when createNoteOperation is enabled', () => {
    it('renders "Add Note" button', () => {
      const createNoteOperation = {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }

      arrangeTest({ createNoteOperation })
      expect(screen.getByTestId('addNoteButton')).toBeInTheDocument()
    })
  })

  describe('when createNoteOperation is disabled', () => {
    const createNoteOperation = {
      callable: OperationCallableTypes.DISABLED,
      messages: []
    }

    it('renders "Add Note" button but with disabled class', () => {
      arrangeTest({ createNoteOperation })
      expect(screen.getByTestId('addNoteButton')).toBeDisabled()
    })
  })

  describe('when create note form is showed', () => {
    it('renders disabled button', () => {
      arrangeTest({
        createNoteOperation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      })

      expect(screen.getByTestId('addNoteButton')).toBeDisabled()
    })
  })
})
