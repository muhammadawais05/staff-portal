import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from '@staff-portal/navigation'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { ActivityTabs } from '../TalentCoachingActivities/TalentCoachingActivities'
import { useTalentCoachingActivitiesContext } from '../TalentCoachingActivities/TalentCoachingActivitiesContext'
import AddCoachingEngagementNoteButton, {
  Props
} from './AddCoachingEngagementNoteButton'

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
        <AddCoachingEngagementNoteButton {...props} />
      </TestWrapper>
    </MemoryRouter>
  )

describe('AddCoachingEngagementNoteButton', () => {
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

  describe('when addCoachActionsNote operation is hidden', () => {
    it('does not render "Add Coaching Note" button', () => {
      arrangeTest({
        createCoachingNoteOperation: {
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        }
      })

      expect(
        screen.queryByTestId('add-coaching-engagement-note-button')
      ).not.toBeInTheDocument()
    })
  })

  describe('when addCoachActionsNote operation is enabled', () => {
    it('renders "Add Coaching Note" button', () => {
      arrangeTest({
        createCoachingNoteOperation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      })

      expect(
        screen.getByTestId('add-coaching-engagement-note-button')
      ).toBeInTheDocument()
    })
  })

  describe('when create note form is showed', () => {
    it('renders disabled button', () => {
      arrangeTest({
        createCoachingNoteOperation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      })

      expect(
        screen.getByTestId('add-coaching-engagement-note-button')
      ).toBeDisabled()
    })
  })

  describe('when addCoachActionsNote operation is disabled', () => {
    it('renders "Add Coaching Note" button as disabled', () => {
      arrangeTest({
        createCoachingNoteOperation: {
          callable: OperationCallableTypes.DISABLED,
          messages: []
        }
      })

      expect(
        screen.getByTestId('add-coaching-engagement-note-button')
      ).toBeDisabled()
    })
  })
})
