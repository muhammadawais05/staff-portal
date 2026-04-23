import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  CommunityLeaderApplicationStatus,
  CommunityLeaderRecordStatus,
  CommunityLeaderStatus,
  CommunityLeaderType
} from '@staff-portal/graphql/staff'
import { DEFAULT_FULL_DATE_FORMAT } from '@staff-portal/date-time-utils'
import * as currentUser from '@staff-portal/current-user'

import CommunityLeaderApplicantContent from './CommunityLeaderApplicantContent'
import { CommunityLeader } from '../../types'

const mockDate = '2022-02-15'

const mockCommunityLeader: CommunityLeader = {
  id: '1',
  node: {
    id: '1',
    featuredOrder: 1,
    createdAt: mockDate,
    requestedAt: mockDate,
    reviewedAt: mockDate,
    type: CommunityLeaderType.COMMUNITY_LEADER,
    leaderStatus: CommunityLeaderRecordStatus.ACTIVE
  },
  status: CommunityLeaderStatus.APPROVED,
  type: CommunityLeaderType.COMMUNITY_LEADER,
  application: {
    id: '456',
    status: CommunityLeaderApplicationStatus.APPLIED,
    createdAt: mockDate,
    updatedAt: mockDate,
    commitment: true,
    type: CommunityLeaderType.COMMUNITY_LEADER,
    initialIdeas: 'I want to talk about Ruby',
    slackChannel: 'ruby'
  },
  appliedStaffRole: {
    id: '1',
    email: 'alex.casillas@toptal.com',
    fullName: 'Alex Casillas',
    photo: {
      default: ''
    },
    location: {
      country: {
        id: '1',
        name: 'Spain'
      },
      cityName: 'Córdoba',
      stateName: 'Andalucía'
    },
    webResource: {
      text: 'Name',
      url: null
    }
  }
}

describe('CommunityLeaderApplicantContent', () => {
  it('renders the component properly', () => {
    const userDateFormatter = jest.fn()

    jest
      .spyOn(currentUser, 'useUserDateFormatter')
      .mockImplementation(() => userDateFormatter)

    render(
      <TestWrapper>
        <CommunityLeaderApplicantContent
          communityLeader={mockCommunityLeader}
        />
      </TestWrapper>
    )

    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('alex.casillas@toptal.com')).toBeInTheDocument()
    expect(screen.getByText('Country')).toBeInTheDocument()
    expect(screen.getByText('Spain')).toBeInTheDocument()
    expect(screen.getByText('State')).toBeInTheDocument()
    expect(screen.getByText('Andalucía')).toBeInTheDocument()
    expect(screen.getByText('City')).toBeInTheDocument()
    expect(screen.getByText('Córdoba')).toBeInTheDocument()
    expect(screen.getByText('Community Leader Status')).toBeInTheDocument()
    expect(screen.getByText('Approved')).toBeInTheDocument()
    expect(screen.getByText('Is Committed?')).toBeInTheDocument()
    expect(screen.getByText('Yes')).toBeInTheDocument()
    expect(screen.getByText('Community Leader Type')).toBeInTheDocument()
    expect(screen.getByText('Full Leader')).toBeInTheDocument()
    expect(screen.getByText('Initial Ideas')).toBeInTheDocument()
    expect(screen.getByText('I want to talk about Ruby')).toBeInTheDocument()
    expect(screen.getByText('Slack Channel of Interest')).toBeInTheDocument()
    expect(screen.getByText(/ruby/)).toBeInTheDocument()
    expect(screen.getByText('Application Created At')).toBeInTheDocument()
    expect(userDateFormatter).toHaveBeenCalledTimes(2)
    expect(userDateFormatter).toHaveBeenCalledWith(
      '2022-02-15',
      DEFAULT_FULL_DATE_FORMAT
    )
  })
})
