import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { PublicationGigStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { createGetGigMock } from '@staff-portal/talents-gigs/src/mocks'
import { GigFragment } from '@staff-portal/talents-gigs'

import RequestActions from './RequestActions'

jest.mock('../../components', () => ({
  ApproveRequest: () => <div data-testid='approveButton' />,
  ClaimRequest: () => <div data-testid='claimButton' />,
  CloseRequest: () => <div data-testid='closeButton' />,
  CompleteRequest: () => <div data-testid='completeButton' />,
  SearchCandidates: () => <div data-testid='searchCandidates' />,
  RequestModal: ({ open }: { open: boolean }) =>
    open ? <div data-testid='requestModal' /> : null
}))

const SLACK_CONVERSATIONS = {
  slackConversations: {
    nodes: [
      {
        channelUrl: 'https://link',
        id: 'slackid',
        participations: {
          nodes: []
        }
      }
    ],
    totalCount: 1
  }
}

const CLAIMED_BY = {
  claimedBy: {
    id: 'pid',
    role: {
      id: '123',
      fullName: 'Requests Moderator',
      webResource: {
        url: '',
        text: 'Requests Moderator'
      }
    }
  }
}

const createGetGigMockEnhanced = (gig?: Partial<GigFragment>) =>
  createGetGigMock({
    status: PublicationGigStatus.CLAIMED,
    ...CLAIMED_BY,
    ...SLACK_CONVERSATIONS,
    ...gig
  })

describe('RequestsActions', () => {
  describe('pending requests', () => {
    it('renders correctly for pending requests', () => {
      const request = createGetGigMock({
        status: PublicationGigStatus.PENDING
      }).gig

      render(
        <TestWrapper>
          <RequestActions request={request} />
        </TestWrapper>
      )

      expect(screen.queryByTestId('claimButton')).toBeInTheDocument()
      expect(screen.queryByTestId('approveButton')).not.toBeInTheDocument()
      expect(screen.queryByTestId('searchCandidates')).toBeInTheDocument()
      expect(screen.queryByTestId('showMoreOptions')).toBeInTheDocument()
    })
  })

  describe('claimed requests', () => {
    describe('when viewer is the claimer', () => {
      it('renders correctly for requests in a list', () => {
        const request = createGetGigMockEnhanced({
          status: PublicationGigStatus.CLAIMED
        }).gig

        render(
          <TestWrapper>
            <RequestActions request={request} currentUserId='123' />
          </TestWrapper>
        )

        expect(screen.queryByTestId('claimButton')).not.toBeInTheDocument()
        expect(screen.queryByTestId('approveButton')).toBeInTheDocument()
        expect(screen.queryByTestId('closeButton')).not.toBeInTheDocument()
        expect(screen.queryByTestId('completeButton')).not.toBeInTheDocument()
        expect(screen.queryByTestId('editButton')).not.toBeInTheDocument()
        expect(screen.queryByTestId('showMoreOptions')).toBeInTheDocument()
      })

      it('renders correctly for requests in page view', () => {
        const request = createGetGigMockEnhanced({
          status: PublicationGigStatus.CLAIMED
        }).gig

        render(
          <TestWrapper>
            <RequestActions
              request={request}
              currentUserId='123'
              viewType='page'
            />
          </TestWrapper>
        )

        expect(screen.queryByTestId('claimButton')).not.toBeInTheDocument()
        expect(screen.queryByTestId('approveButton')).toBeInTheDocument()
        expect(screen.queryByTestId('completeButton')).not.toBeInTheDocument()
        expect(screen.queryByTestId('showMoreOptions')).toBeInTheDocument()
      })
    })

    describe('when viewer is not the claimer', () => {
      it('renders correctly for requests claimed by another user', () => {
        const request = createGetGigMock({
          status: PublicationGigStatus.CLAIMED
        }).gig

        render(
          <TestWrapper>
            <RequestActions
              request={request}
              currentUserId='123'
              viewType='page'
            />
          </TestWrapper>
        )

        expect(screen.queryByTestId('claimButton')).not.toBeInTheDocument()
        expect(screen.queryByTestId('approveButton')).not.toBeInTheDocument()
        expect(screen.queryByTestId('closeButton')).not.toBeInTheDocument()
        expect(screen.queryByTestId('completeButton')).not.toBeInTheDocument()
        expect(screen.queryByTestId('showMoreOptions')).not.toBeInTheDocument()
      })
    })
  })

  describe('approved requests', () => {
    describe('when viewer is the claimer', () => {
      it('renders correctly', () => {
        const request = createGetGigMockEnhanced({
          status: PublicationGigStatus.APPROVED
        }).gig

        render(
          <TestWrapper>
            <RequestActions
              request={request}
              currentUserId='123'
              viewType='page'
            />
          </TestWrapper>
        )

        expect(screen.queryByTestId('claimButton')).not.toBeInTheDocument()
        expect(screen.queryByTestId('approveButton')).not.toBeInTheDocument()
        expect(screen.queryByTestId('closeButton')).not.toBeInTheDocument()
        expect(screen.queryByTestId('completeButton')).not.toBeInTheDocument()
        expect(screen.queryByTestId('showMoreOptions')).toBeInTheDocument()
      })
    })

    describe('when viewer is not the claimer', () => {
      it('renders correctly', () => {
        const request = createGetGigMockEnhanced({
          status: PublicationGigStatus.APPROVED
        }).gig

        render(
          <TestWrapper>
            <RequestActions
              request={request}
              currentUserId='456'
              viewType='page'
            />
          </TestWrapper>
        )

        expect(screen.queryByTestId('claimButton')).not.toBeInTheDocument()
        expect(screen.queryByTestId('approveButton')).not.toBeInTheDocument()
        expect(screen.queryByTestId('closeButton')).not.toBeInTheDocument()
        expect(screen.queryByTestId('completeButton')).not.toBeInTheDocument()
        expect(screen.queryByTestId('showMoreOptions')).not.toBeInTheDocument()
      })
    })
  })

  describe('matched requests', () => {
    describe('when viewer is the claimer', () => {
      it('renders correctly', () => {
        const request = createGetGigMockEnhanced({
          status: PublicationGigStatus.MATCHED
        }).gig

        render(
          <TestWrapper>
            <RequestActions
              request={request}
              currentUserId='123'
              viewType='page'
            />
          </TestWrapper>
        )

        expect(screen.queryByTestId('claimButton')).not.toBeInTheDocument()
        expect(screen.queryByTestId('approveButton')).not.toBeInTheDocument()
        expect(screen.queryByTestId('closeButton')).not.toBeInTheDocument()
        expect(screen.queryByTestId('showMoreOptions')).toBeInTheDocument()
      })

      it('renders edit request component on menu click', async () => {
        const request = createGetGigMockEnhanced({
          status: PublicationGigStatus.MATCHED
        }).gig

        render(
          <TestWrapper>
            <RequestActions
              request={request}
              currentUserId='123'
              viewType='page'
            />
          </TestWrapper>
        )

        const showMoreButton = screen.getByTestId('showMoreOptions')

        expect(showMoreButton).toBeInTheDocument()
        expect(screen.queryByTestId('requestModal')).not.toBeInTheDocument()

        fireEvent.click(showMoreButton)
        const editRequestButton = screen.getByTestId('openEditRequestButton')

        expect(editRequestButton).toBeInTheDocument()
        expect(screen.queryByTestId('requestModal')).not.toBeInTheDocument()

        act(() => {
          fireEvent.click(editRequestButton)
        })

        expect(screen.queryByTestId('requestModal')).toBeInTheDocument()
      })

      it('renders complete request component on menu click', async () => {
        const request = createGetGigMockEnhanced({
          status: PublicationGigStatus.MATCHED
        }).gig

        render(
          <TestWrapper>
            <RequestActions
              request={request}
              currentUserId='123'
              viewType='page'
            />
          </TestWrapper>
        )

        const showMoreButton = screen.getByTestId('showMoreOptions')

        expect(showMoreButton).toBeInTheDocument()
        fireEvent.click(showMoreButton)
        expect(screen.queryByTestId('completeButton')).toBeInTheDocument()
        expect(screen.queryByTestId('closeButton')).toBeInTheDocument()
      })
    })

    describe('when viewer is not the claimer', () => {
      it('renders correctly', () => {
        const request = createGetGigMockEnhanced({
          status: PublicationGigStatus.MATCHED
        }).gig

        render(
          <TestWrapper>
            <RequestActions
              request={request}
              currentUserId='456'
              viewType='page'
            />
          </TestWrapper>
        )

        expect(screen.queryByTestId('claimButton')).not.toBeInTheDocument()
        expect(screen.queryByTestId('approveButton')).not.toBeInTheDocument()
        expect(screen.queryByTestId('searchCandidates')).toBeInTheDocument()
        expect(screen.queryByTestId('showMoreOptions')).not.toBeInTheDocument()
      })
    })
  })
})
