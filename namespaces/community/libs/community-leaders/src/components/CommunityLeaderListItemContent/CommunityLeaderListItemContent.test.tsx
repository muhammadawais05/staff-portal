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

import CommunityLeaderListItemContent from './CommunityLeaderListItemContent'
import { CommunityLeader } from '../../types'
import CommunityLeaderUpdateField from '../CommunityLeaderUpdateField'
jest.mock('../CommunityLeaderUpdateField')
const mockLeader: CommunityLeader = {
  id: '123456789',
  status: CommunityLeaderStatus.APPROVED,
  application: {
    id: '123',
    createdAt: '2022-02-15',
    updatedAt: '2022-02-15',
    type: CommunityLeaderType.COMMUNITY_LEADER,
    status: CommunityLeaderApplicationStatus.APPROVED
  },
  node: {
    requestedAt: '2022-02-15',
    createdAt: '2022-02-15',
    id: '123',
    type: CommunityLeaderType.COMMUNITY_LEADER,
    leaderStatus: CommunityLeaderRecordStatus.ACTIVE
  },
  appliedStaffRole: {
    id: '123465789',
    webResource: {
      text: 'Alex Casillas',
      url: 'http://staff-portal.toptal.net/talent/profile'
    },
    email: 'alex.casillas@toptal.com',
    fullName: 'Alex Casillas',
    photo: {
      default: ''
    },
    location: {
      country: { id: '1', name: 'Spain' },
      cityName: 'Córdoba',
      stateName: 'Andalucía'
    },
    roleFlags: {
      nodes: [
        {
          flag: {
            id: '1',
            title: 'High Quality Headshot'
          }
        },
        {
          flag: {
            id: '2',
            title: 'Community Leader'
          }
        },
        {
          flag: {
            id: '3',
            title: 'Milestone box survey sent'
          }
        }
      ]
    }
  }
}
const mockCommunityLeaderUpdateField = CommunityLeaderUpdateField as jest.Mock

const arrangeTest = (communityLeader: CommunityLeader) =>
  render(
    <TestWrapper>
      <CommunityLeaderListItemContent communityLeader={communityLeader} />
    </TestWrapper>
  )

describe('CommunityLeaderListItemContent', () => {
  beforeEach(() => {
    mockCommunityLeaderUpdateField.mockReturnValue(<div>Full Leader</div>)
  })

  it('renders the component', () => {
    const userDateFormatter = jest.fn()

    jest
      .spyOn(currentUser, 'useUserDateFormatter')
      .mockImplementation(() => userDateFormatter)

    arrangeTest(mockLeader)

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
    expect(screen.getByText('Application Created At')).toBeInTheDocument()
    expect(screen.getByText('Application Updated At')).toBeInTheDocument()
    expect(screen.getByText('Community Leader Type')).toBeInTheDocument()
    expect(screen.getByText('Full Leader')).toBeInTheDocument()
    expect(screen.getByText('CL Requested At')).toBeInTheDocument()
    expect(screen.getByText('CL Created At')).toBeInTheDocument()
    expect(userDateFormatter).toHaveBeenCalledTimes(4)
    expect(userDateFormatter).toHaveBeenCalledWith(
      '2022-02-15',
      DEFAULT_FULL_DATE_FORMAT
    )
  })
})
