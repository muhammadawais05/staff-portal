import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  MeetingStatus,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import MeetingActions from './MeetingActions'
import { MeetingFragment } from '../../data'

jest.mock('./components/MeetingDeleteButton', () => ({
  __esModule: true,
  default: () => <div data-testid='meeting-delete-button' />
}))

jest.mock('./components/MeetingCancelButton', () => ({
  __esModule: true,
  default: () => <div data-testid='meeting-cancel-button' />
}))

jest.mock('./components/MeetingMarkAsCompletedButton', () => ({
  __esModule: true,
  default: () => <div data-testid='meeting-completed-button' />
}))

jest.mock('./components/MeetingMarkAsCompletedWithSurveyButton', () => ({
  __esModule: true,
  default: () => <div data-testid='meeting-completed-with-survey-button' />
}))

jest.mock('./components/MeetingMarkAsNotCompletedButton', () => ({
  __esModule: true,
  default: () => <div data-testid='meeting-not-completed-button' />
}))

jest.mock('@staff-portal/ui', () => ({
  ActionLoader: () => <div data-testid='action-loader' />
}))

const OPERATION = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

const testMeeting = (
  meetingOperations?: Partial<MeetingFragment['operations']>
): MeetingFragment => {
  return {
    id: 'test',
    status: MeetingStatus.STARTED,
    operations: {
      failMeeting: OPERATION,
      completeMeeting: OPERATION,
      completeMeetingWithSurvey: OPERATION,
      cancelMeeting: OPERATION,
      removeMeeting: OPERATION,
      ...meetingOperations
    }
  } as unknown as MeetingFragment
}

const renderComponent = (meeting?: MeetingFragment, loading = false) =>
  render(
    <TestWrapper>
      <MeetingActions meeting={meeting} loading={loading} />
    </TestWrapper>
  )

describe('MeetingActions', () => {
  describe('when meeting is missing', () => {
    describe('when is not loading', () => {
      it('returns null', () => {
        renderComponent()

        expect(
          screen.queryByTestId('meeting-delete-button')
        ).not.toBeInTheDocument()
        expect(
          screen.queryByTestId('meeting-cancel-button')
        ).not.toBeInTheDocument()
        expect(
          screen.queryByTestId('meeting-completed-button')
        ).not.toBeInTheDocument()
        expect(
          screen.queryByTestId('meeting-completed-with-survey-button')
        ).not.toBeInTheDocument()
        expect(
          screen.queryByTestId('meeting-not-completed-button')
        ).not.toBeInTheDocument()
        expect(screen.queryByTestId('action-loader')).not.toBeInTheDocument()
      })
    })

    describe('when is loading', () => {
      it('shows the action loader', () => {
        renderComponent(undefined, true)

        expect(
          screen.queryByTestId('meeting-delete-button')
        ).not.toBeInTheDocument()
        expect(
          screen.queryByTestId('meeting-cancel-button')
        ).not.toBeInTheDocument()
        expect(
          screen.queryByTestId('meeting-completed-button')
        ).not.toBeInTheDocument()
        expect(
          screen.queryByTestId('meeting-completed-with-survey-button')
        ).not.toBeInTheDocument()
        expect(
          screen.queryByTestId('meeting-not-completed-button')
        ).not.toBeInTheDocument()

        expect(screen.getByTestId('action-loader')).toBeInTheDocument()
      })
    })
  })

  describe('when completeMeetingWithSurvey operation is not enabled', () => {
    it('renders correct actions included MeetingMarkAsCompletedButton', () => {
      renderComponent(
        testMeeting({
          completeMeetingWithSurvey: {
            callable: OperationCallableTypes.DISABLED,
            messages: []
          }
        })
      )

      expect(screen.getByTestId('meeting-delete-button')).toBeInTheDocument()
      expect(screen.getByTestId('meeting-cancel-button')).toBeInTheDocument()
      expect(screen.getByTestId('meeting-completed-button')).toBeInTheDocument()
      expect(
        screen.queryByTestId('meeting-completed-with-survey-button')
      ).not.toBeInTheDocument()
      expect(
        screen.getByTestId('meeting-not-completed-button')
      ).toBeInTheDocument()
    })
  })

  describe('when completeMeetingWithSurvey operation is enabled', () => {
    it('renders correct actions included MeetingMarkAsCompletedWithSurveyButton', () => {
      renderComponent(testMeeting())

      expect(screen.getByTestId('meeting-delete-button')).toBeInTheDocument()
      expect(screen.getByTestId('meeting-cancel-button')).toBeInTheDocument()
      expect(
        screen.queryByTestId('meeting-completed-button')
      ).not.toBeInTheDocument()
      expect(
        screen.getByTestId('meeting-completed-with-survey-button')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('meeting-not-completed-button')
      ).toBeInTheDocument()
    })
  })
})
