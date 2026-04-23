import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { DEFAULT_FULL_DATE_FORMAT } from '@staff-portal/date-time-utils'
import * as currentUser from '@staff-portal/current-user'

import { useGetCommunityLeaderApplicationsHistory } from '../../data/get-community-leader-applications-history/get-community-leader-applications-history.staff.gql'
import CommunityLeaderApplicationsHistory from './CommunityLeaderApplicationsHistory'

jest.mock(
  '../../data/get-community-leader-applications-history/get-community-leader-applications-history.staff.gql'
)
const mockUseGetCommunityLeaderApplicationsHistory =
  useGetCommunityLeaderApplicationsHistory as jest.Mock

describe('CommunityLeaderApplicationsHistory', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('when data is loading', () => {
    it('renders loader', () => {
      mockUseGetCommunityLeaderApplicationsHistory.mockReturnValue({
        loading: true
      })

      render(
        <TestWrapper>
          <CommunityLeaderApplicationsHistory communityLeaderId='leader-id' />
        </TestWrapper>
      )

      expect(screen.getByTestId('applicationHistoryLoader')).toBeInTheDocument()
      expect(
        screen.queryByTestId('applicationsHistoryContent')
      ).not.toBeInTheDocument()
    })
  })

  describe('when application history is empty', () => {
    it('renders informative text', () => {
      mockUseGetCommunityLeaderApplicationsHistory.mockReturnValue({
        loading: false,
        data: []
      })

      render(
        <TestWrapper>
          <CommunityLeaderApplicationsHistory communityLeaderId='leader-id' />
        </TestWrapper>
      )

      expect(
        screen.queryByTestId('applicationHistoryLoader')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('applicationsHistoryContent')
      ).not.toBeInTheDocument()
      expect(
        screen.getByText('Could not find application history.')
      ).toBeInTheDocument()
    })
  })

  describe('when application history is present', () => {
    it('renders application history', () => {
      const userDateFormatter = jest.fn()

      jest
        .spyOn(currentUser, 'useUserDateFormatter')
        .mockImplementation(() => userDateFormatter)

      mockUseGetCommunityLeaderApplicationsHistory.mockReturnValue({
        loading: false,
        data: [
          {
            id: 'application-2',
            createdAt: '2022-02-15T19:23:57-05:00',
            updatedAt: '2022-02-15T19:24:19-05:00',
            commitment: true,
            initialIdeas: 'second idea',
            slackChannel: 'core-channel',
            type: 'COMMUNITY_LEADER',
            performerComment: 'Approving because...',
            status: 'APPROVED'
          },
          {
            id: 'application-1',
            createdAt: '2022-02-15T19:23:15-05:00',
            updatedAt: '2022-02-15T19:23:39-05:00',
            commitment: true,
            initialIdeas: 'first idea',
            slackChannel: 'core-channel',
            type: 'COMMUNITY_LEADER',
            performerComment: 'Rejecting because...',
            status: 'REJECTED'
          }
        ]
      })

      render(
        <TestWrapper>
          <CommunityLeaderApplicationsHistory communityLeaderId='leader-id' />
        </TestWrapper>
      )

      expect(
        screen.queryByTestId('applicationHistoryLoader')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByText('Could not find application history.')
      ).not.toBeInTheDocument()
      expect(
        screen.getByTestId('applicationsHistoryContent')
      ).toBeInTheDocument()
      expect(screen.getByText('APPROVED')).toBeInTheDocument()
      expect(screen.getByText('REJECTED')).toBeInTheDocument()
      expect(screen.getAllByText('Full Leader')).toHaveLength(2)
      expect(screen.getAllByText('Yes')).toHaveLength(2)
      expect(screen.getAllByText('core-channel')).toHaveLength(2)
      expect(screen.getByText('second idea')).toBeInTheDocument()
      expect(screen.getByText('first idea')).toBeInTheDocument()
      expect(screen.getByText('Approving because...')).toBeInTheDocument()
      expect(screen.getByText('Rejecting because...')).toBeInTheDocument()
      expect(userDateFormatter).toHaveBeenCalledTimes(4)
      expect(userDateFormatter).toHaveBeenCalledWith(
        '2022-02-15T19:23:57-05:00',
        DEFAULT_FULL_DATE_FORMAT
      )
      expect(userDateFormatter).toHaveBeenCalledWith(
        '2022-02-15T19:24:19-05:00',
        DEFAULT_FULL_DATE_FORMAT
      )
      expect(userDateFormatter).toHaveBeenCalledWith(
        '2022-02-15T19:23:15-05:00',
        DEFAULT_FULL_DATE_FORMAT
      )
      expect(userDateFormatter).toHaveBeenCalledWith(
        '2022-02-15T19:23:39-05:00',
        DEFAULT_FULL_DATE_FORMAT
      )
    })
  })
})
