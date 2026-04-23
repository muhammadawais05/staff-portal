import {
  TalentCoachingEngagementStatus,
  TaskPriorityLevel
} from '@staff-portal/graphql/staff'
import { MemoryRouter } from '@staff-portal/navigation'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { createNoteMock } from '@staff-portal/notes/src/mocks'
import { createTaskListItemMock } from '@staff-portal/tasks-list-item/src/mocks'

import { useTalentCoachingActivitiesContext } from '../TalentCoachingActivities/TalentCoachingActivitiesContext'
import { createTalentCoachingEngagementWithActivitiesFragmentMock } from '../../../../data/talent-coaching-engagement-with-activities-fragment/mocks'
import TalentCoachingActivities, {
  ActivityTabs,
  Props
} from '../TalentCoachingActivities/TalentCoachingActivities'

jest.unmock('@staff-portal/editable')

jest.mock(
  '../TalentCoachingActivities/TalentCoachingActivitiesContext',
  () => ({
    __esModule: true,
    useTalentCoachingActivitiesContext: jest.fn()
  })
)
// some dependencies must be unmocked due to tight coupling
jest.mock('@staff-portal/forms', () => ({
  usePersistentForm: () => null,
  usePersistentFormContext: () => ({
    getFormKeys: () => [],
    getForm: () => null,
    setForm: () => null
  })
}))

const mockSetIsExpanded = jest.fn()
const mockSetTabIndex = jest.fn()

const mockUseTalentCoachingActivitiesContext =
  useTalentCoachingActivitiesContext as jest.Mock

const arrangeTest = (props: Props) =>
  render(
    <TestWrapperWithMocks mocks={[]}>
      <MemoryRouter>
        <TalentCoachingActivities {...props} />
      </MemoryRouter>
    </TestWrapperWithMocks>
  )

const MOCKED_TASK_CONNECTION = {
  totalCount: 1,
  nodes: [createTaskListItemMock()]
}

const talentCoachingEngagement =
  createTalentCoachingEngagementWithActivitiesFragmentMock({
    notes: {
      totalCount: 1,
      nodes: [createNoteMock()]
    },
    tasks: MOCKED_TASK_CONNECTION
  })

const mockActivitiesContext = (mockData?: object) => {
  mockUseTalentCoachingActivitiesContext.mockReturnValue({
    tabIndex: ActivityTabs.NOTES,
    setTabIndex: mockSetTabIndex,
    showCreateNoteForm: false,
    setShowCreateNoteForm: () => null,
    setIsExpanded: mockSetIsExpanded,
    isExpanded: false,
    ...mockData
  })
}

describe('TalentCoachingActivities', () => {
  describe('when accordion is not expanded', () => {
    it('renders button with "Expand Activities" text', () => {
      mockActivitiesContext()

      arrangeTest({
        talentCoachingEngagement: {
          ...talentCoachingEngagement,
          tasks: {
            totalCount: 2,
            nodes: [
              createTaskListItemMock({ status: 'pending' }),
              createTaskListItemMock({ status: 'finished' })
            ]
          }
        },
        refetch: jest.fn()
      })

      expect(
        screen.getByText('Expand Activities (1 Note, 1 / 2 Tasks)', {
          exact: false
        })
      ).toBeInTheDocument()
      expect(screen.getByText('Notes (1)')).toBeInTheDocument()
      expect(screen.getByText('Tasks (2)')).toBeInTheDocument()
    })
  })

  describe('when accordion is expanded', () => {
    it('renders button with "Collapse activities" text and notes', () => {
      mockActivitiesContext({ isExpanded: true })

      arrangeTest({
        talentCoachingEngagement,
        refetch: jest.fn()
      })

      expect(
        screen.getByText('Collapse activities', { exact: false })
      ).toBeInTheDocument()
      expect(screen.getByText('Note title')).toBeInTheDocument()
      expect(screen.getByText('Test comment')).toBeInTheDocument()
      expect(screen.getByText('Juan Sanchez')).toBeInTheDocument()
      expect(screen.queryByText('DM')).not.toBeInTheDocument()
    })

    describe('when showCreateNoteForm is true', () => {
      it('renders "CreateNoteForm"', () => {
        mockActivitiesContext({ isExpanded: true, showCreateNoteForm: true })

        arrangeTest({
          talentCoachingEngagement,
          refetch: jest.fn()
        })

        expect(screen.getByText('Note title')).toBeInTheDocument()
        expect(screen.getByTestId('submit-note-button')).toBeInTheDocument()
      })
    })

    describe('when there are no activities', () => {
      it('does not renders "Expand activities" button', () => {
        mockActivitiesContext()

        const talentCoachingWithoutActivity =
          createTalentCoachingEngagementWithActivitiesFragmentMock()

        arrangeTest({
          talentCoachingEngagement: talentCoachingWithoutActivity,
          refetch: jest.fn()
        })

        expect(
          screen.queryByText('Expand activities', { exact: false })
        ).not.toBeInTheDocument()
      })
    })

    describe('when there is only one note', () => {
      it('renders "Expand activities" button', () => {
        mockActivitiesContext()

        const talentCoachingWithOneNote =
          createTalentCoachingEngagementWithActivitiesFragmentMock({
            notes: {
              totalCount: 1,
              nodes: [createNoteMock()]
            }
          })

        arrangeTest({
          talentCoachingEngagement: talentCoachingWithOneNote,
          refetch: jest.fn()
        })

        expect(
          screen.getByText('Expand activities', { exact: false })
        ).toBeInTheDocument()
      })
    })

    describe('when there is only one task', () => {
      it('renders "Expand Activities" button', () => {
        mockActivitiesContext()

        const talentCoachingWithOneTask =
          createTalentCoachingEngagementWithActivitiesFragmentMock({
            tasks: MOCKED_TASK_CONNECTION
          })

        arrangeTest({
          talentCoachingEngagement: talentCoachingWithOneTask,
          refetch: jest.fn()
        })

        expect(
          screen.getByText('Expand Activities', { exact: false })
        ).toBeInTheDocument()
      })
    })

    describe('when user clicks "Tasks" tab', () => {
      it('renders tasks table', () => {
        mockActivitiesContext({
          isExpanded: true,
          tabIndex: ActivityTabs.TASKS
        })

        arrangeTest({
          talentCoachingEngagement,
          refetch: jest.fn()
        })

        expect(screen.getByText('DM')).toBeInTheDocument()
        expect(screen.getByText('Task description')).toBeInTheDocument()
        expect(screen.getByTestId('complete-task')).toBeInTheDocument()
        expect(
          screen.getByTestId(`priority-${TaskPriorityLevel.HIGH.toLowerCase()}`)
        ).toBeInTheDocument()
      })
    })
  })

  describe('when there are tasks and coaching engagement is not completed', () => {
    it('calls "SetTabIndex" and "SetIsExpanded"', () => {
      mockActivitiesContext()

      arrangeTest({
        talentCoachingEngagement: {
          ...talentCoachingEngagement,
          tasks: {
            totalCount: 1,
            nodes: [createTaskListItemMock({ status: 'pending' })]
          }
        },
        expandTasks: true,
        refetch: jest.fn()
      })

      expect(mockSetTabIndex).toHaveBeenCalledWith(1)
      expect(mockSetIsExpanded).toHaveBeenCalledWith(true)
    })

    describe('when "expandTasks" is false', () => {
      it('calls "SetTabIndex" and "SetIsExpanded"', () => {
        mockActivitiesContext()

        arrangeTest({
          talentCoachingEngagement: {
            ...talentCoachingEngagement,
            tasks: {
              totalCount: 1,
              nodes: [createTaskListItemMock({ status: 'pending' })]
            }
          },
          expandTasks: false,
          refetch: jest.fn()
        })

        expect(mockSetTabIndex).not.toHaveBeenCalled()
        expect(mockSetIsExpanded).not.toHaveBeenCalled()
      })
    })
  })

  describe('when there are tasks and coaching engagement is completed', () => {
    it('does not call "SetTabIndex" and "SetIsExpanded"', () => {
      mockActivitiesContext()

      arrangeTest({
        talentCoachingEngagement: {
          ...talentCoachingEngagement,
          status: TalentCoachingEngagementStatus.COMPLETED,
          tasks: {
            totalCount: 1,
            nodes: [createTaskListItemMock({ status: 'pending' })]
          }
        },
        expandTasks: true,
        refetch: jest.fn()
      })

      expect(mockSetTabIndex).not.toHaveBeenCalled()
      expect(mockSetIsExpanded).not.toHaveBeenCalled()
    })
  })

  describe('when there are no tasks and coaching engagement is not completed', () => {
    it('does not call "SetTabIndex" and "SetIsExpanded"', () => {
      mockActivitiesContext()

      arrangeTest({
        talentCoachingEngagement: {
          ...talentCoachingEngagement,
          tasks: {
            totalCount: 0,
            nodes: []
          }
        },
        expandTasks: true,
        refetch: jest.fn()
      })

      expect(mockSetTabIndex).not.toHaveBeenCalled()
      expect(mockSetIsExpanded).not.toHaveBeenCalled()
    })
  })
})
