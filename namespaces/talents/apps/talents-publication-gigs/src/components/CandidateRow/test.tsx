import React from 'react'
import { render, screen } from '@testing-library/react'
import { Table } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { TalentAvatar } from '@staff-portal/talents'
import {
  GigReachOutStatus,
  GigParticipationType
} from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapper, TestWrapperWithMocks } from '@staff-portal/test-utils'
import {
  ReachOutFragment,
  SlackWorkspaceFragment
} from '@staff-portal/talents-gigs'
import {
  mockedReachOut,
  mockedTalent
} from '@staff-portal/talents-gigs/src/mocks'

import CandidateRow from './CandidateRow'

type Props = {
  reachOut: ReachOutFragment
  slackConversation?: SlackWorkspaceFragment
}

jest.mock('@staff-portal/talents', () => ({
  TalentAvatar: jest.fn()
}))

const TalentAvatarMock = TalentAvatar as jest.Mock

const TestComponent = ({ reachOut, slackConversation }: Props) => {
  return (
    <TestWrapper>
      <Table>
        <Table.Body>
          <CandidateRow
            reachOut={reachOut}
            slackConversation={slackConversation}
          />
        </Table.Body>
      </Table>
    </TestWrapper>
  )
}

const arrangeTest = (
  mocks: MockedResponse[] = [],
  { reachOut = mockedReachOut }: Partial<Props> = {},
  slackConversation?: SlackWorkspaceFragment
) => {
  TalentAvatarMock.mockImplementation(() => <div />)

  render(
    <TestWrapperWithMocks mocks={mocks}>
      <TestComponent
        reachOut={reachOut}
        slackConversation={slackConversation}
      />
    </TestWrapperWithMocks>
  )
}

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  Link: jest.fn()
}))

const mockedLink = Link as unknown as jest.Mock

describe('CandidateRow', () => {
  beforeEach(() => {
    mockedLink.mockImplementation(({ children }) => children)
  })

  it('renders candidate for reachout with sent status', () => {
    arrangeTest([], {
      reachOut: {
        ...mockedReachOut,
        rejectionReasonIdentifier: undefined,
        rejectionReasonComment: undefined
      }
    })

    expect(screen.getByText('Daniel Reid')).toBeInTheDocument()
    expect(screen.getByText('Sent')).toBeInTheDocument()
    expect(screen.queryByTestId('candidate-comment')).not.toBeInTheDocument()
    expect(screen.queryByText('Channel')).not.toBeInTheDocument()
    expect(screen.getByText('Direct')).toBeInTheDocument()
  })

  it('renders candidate for reachout with introduced status', () => {
    arrangeTest(
      [],
      {
        reachOut: {
          ...mockedReachOut,
          status: GigReachOutStatus.INTRODUCED
        }
      },
      {
        id: 'slack-workspace-1',
        channelUrl: 'slack://channel?team=T02856HKHFS&id=C03FRT6CSJ1',
        participations: {
          nodes: [
            {
              id: 'participation-1',
              participationType: GigParticipationType.FULFILLER,
              role: mockedTalent
            }
          ]
        }
      }
    )
    expect(screen.queryByText('Daniel Reid')).toBeInTheDocument()
    expect(screen.queryByText('Introduced')).toBeInTheDocument()
    expect(screen.queryByTestId('candidate-comment')).toBeInTheDocument()
    expect(screen.queryByText('Direct')).not.toBeInTheDocument()
    expect(screen.getByText('Channel')).toBeInTheDocument()
  })
})
