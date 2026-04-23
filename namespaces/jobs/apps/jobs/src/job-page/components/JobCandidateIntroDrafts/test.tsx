import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useMessageListener } from '@toptal/staff-portal-message-bus'

import JobCandidateIntroDrafts from './JobCandidateIntroDrafts'
import { createCandidateIntroDraftItem } from './data/get-candidate-intro-drafts/mocks'
import { useGetCandidateIntroDrafts } from './data'
import {
  CandidateIntroDraftsTable,
  ViewPitchSnippetsButton
} from './components'
import { getPitchSnippetEngagementIds } from './utils'

jest.mock('./data', () => ({
  useGetCandidateIntroDrafts: jest.fn()
}))
jest.mock('./components', () => ({
  CandidateIntroDraftsTable: jest.fn(),
  ViewPitchSnippetsButton: jest.fn()
}))
jest.mock('./utils')

jest.mock('@staff-portal/engagements', () => ({
  EngagementCumulativeStatus: {
    ACTIVE: 'ACTIVE'
  }
}))
jest.mock('@toptal/staff-portal-message-bus', () => ({
  ...jest.requireActual('@toptal/staff-portal-message-bus'),
  __esModule: true,
  useMessageListener: jest.fn()
}))

const useGetCandidateIntroDraftsMock = useGetCandidateIntroDrafts as jest.Mock
const CandidateIntroDraftsTableMock = CandidateIntroDraftsTable as jest.Mock
const ViewPitchSnippetButtonMock = ViewPitchSnippetsButton as jest.Mock
const getPitchSnippetEngagementIdsMock =
  getPitchSnippetEngagementIds as jest.Mock

const JOB_ID = 'job-123'

const arrangeTest = (
  result: Partial<ReturnType<typeof useGetCandidateIntroDrafts>> = {}
) => {
  useGetCandidateIntroDraftsMock.mockReturnValue({
    data: [],
    loading: false,
    initialLoading: false,
    ...result
  } as ReturnType<typeof useGetCandidateIntroDrafts>)

  render(
    <TestWrapper>
      <JobCandidateIntroDrafts jobId={JOB_ID} />
    </TestWrapper>
  )
}

describe('JobCandidateIntroDrafts', () => {
  beforeEach(() => {
    CandidateIntroDraftsTableMock.mockImplementation(() => <div />)
    ViewPitchSnippetButtonMock.mockImplementation(() => (
      <div data-testid='ViewPitchSnippetsButton' />
    ))
  })

  describe('Loading and initialization', () => {
    describe('when initially loading', () => {
      beforeEach(() => {
        arrangeTest({
          data: [],
          loading: true,
          initialLoading: true
        })
      })

      it('does not display table actions', () => {
        expect(
          screen.queryByTestId('ViewPitchSnippetsButton')
        ).not.toBeInTheDocument()
      })

      it('displays the skeleton loader', () => {
        expect(
          screen.queryByTestId('JobCandidateIntroDrafts-loader')
        ).toBeInTheDocument()
      })
    })

    describe('when updating', () => {
      beforeEach(() => {
        arrangeTest({
          data: [],
          loading: true,
          initialLoading: false
        })
      })

      it('does not display table actions', () => {
        expect(
          screen.queryByTestId('ViewPitchSnippetsButton')
        ).not.toBeInTheDocument()
      })

      it('does not display the skeleton loader', () => {
        expect(
          screen.queryByTestId('JobCandidateIntroDrafts-loader')
        ).not.toBeInTheDocument()
      })
    })

    describe('when draft engagements list is empty', () => {
      beforeEach(() => {
        arrangeTest({
          data: []
        })
      })

      it('does not display table actions', () => {
        expect(
          screen.queryByTestId('ViewPitchSnippetsButton')
        ).not.toBeInTheDocument()
      })

      it('does not display loader and table', () => {
        expect(
          screen.queryByTestId('JobCandidateIntroDrafts-loader')
        ).not.toBeInTheDocument()
        expect(screen.queryByText('Draft Engagements')).not.toBeInTheDocument()
      })
    })

    describe('when draft engagements list is not empty', () => {
      beforeEach(() => {
        arrangeTest({
          data: [createCandidateIntroDraftItem({ id: '1' })]
        })
      })

      it('displays table actions', () => {
        expect(
          screen.queryByTestId('ViewPitchSnippetsButton')
        ).toBeInTheDocument()
      })

      it('displays table', () => {
        expect(
          screen.queryByTestId('candidate-intro-drafts-loader')
        ).not.toBeInTheDocument()
        expect(screen.queryByText('Draft Engagements')).toBeInTheDocument()
      })
    })
  })

  describe('When `View Pitch Snippets` button is displayed', () => {
    beforeEach(() => {
      getPitchSnippetEngagementIdsMock.mockImplementation(() => ['1', '2', '3'])
    })

    it('passes pitch snippet engagement ids to the `View Pitch Snippets` button', () => {
      arrangeTest({
        data: [createCandidateIntroDraftItem({ id: '1' })]
      })

      expect(ViewPitchSnippetButtonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          engagementIds: ['1', '2', '3']
        }),
        expect.anything()
      )
    })
  })

  describe('when engagement updated event is triggered', () => {
    describe('when containing the engagement ID', () => {
      it('calls the refetch function', () => {
        const refetch = jest.fn()
        const mockUseMessageListener = useMessageListener as jest.Mock

        mockUseMessageListener.mockImplementation(
          (_, callback: (props: { engagementId: string }) => void) => {
            callback({ engagementId: '1' })
          }
        )

        arrangeTest({
          data: [
            createCandidateIntroDraftItem({ id: '1' }),
            createCandidateIntroDraftItem({ id: '2' })
          ],
          refetch
        })

        expect(refetch).toHaveBeenCalled()
      })
    })

    describe('when does not containing the engagement ID', () => {
      it("doesn't calls the refetch function", () => {
        const refetch = jest.fn()
        const mockUseMessageListener = useMessageListener as jest.Mock

        mockUseMessageListener.mockImplementation(
          (_, callback: (props: { engagementId: string }) => void) => {
            callback({ engagementId: '1' })
          }
        )

        arrangeTest({
          data: [createCandidateIntroDraftItem({ id: '3' })],
          refetch
        })

        expect(refetch).not.toHaveBeenCalled()
      })
    })
  })
})
