import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import CommitmentChangeRequestSection from './CommitmentChangeRequestSection'
import { useGetJobCommitmentChangeRequest } from './data'
import { createCommitmentChangeRequestMock } from './data/get-job-commitment-change-request/mocks'

jest.mock('@staff-portal/engagements', () => ({
  CompanyRateField: () => <div />
}))
jest.mock('./data')
jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  useLocation: () => ({
    location: jest.fn()
  })
}))
jest.mock(
  './components/CommitmentChangeRequestActions/CommitmentChangeRequestActions',
  () => ({
    __esModule: true,
    default: () => <div data-testid='CommitmentChangeRequestActions' />
  })
)

const useGetJobCommitmentChangeRequestMock =
  useGetJobCommitmentChangeRequest as jest.Mock

const JOB_ID = 'job-123'

const arrangeTest = (
  result: Partial<ReturnType<typeof useGetJobCommitmentChangeRequest>> = {}
) => {
  useGetJobCommitmentChangeRequestMock.mockReturnValue({
    data: undefined,
    loading: false,
    initialLoading: false,
    ...result
  } as ReturnType<typeof useGetJobCommitmentChangeRequest>)

  render(
    <TestWrapper>
      <CommitmentChangeRequestSection jobId={JOB_ID} />
    </TestWrapper>
  )
}

describe('CommitmentChangeRequestSection', () => {
  describe('Loading and initialization', () => {
    describe('when initially loading', () => {
      it('displays section with skeleton loader only', () => {
        arrangeTest({
          data: undefined,
          loading: true,
          initialLoading: true
        })

        expect(
          screen.getByText('Commitment Change Request')
        ).toBeInTheDocument()
        expect(screen.getByTestId('SectionSkeletonLoader')).toBeInTheDocument()
        expect(
          screen.getByTestId('CommitmentChangeRequestActions')
        ).toBeInTheDocument()
        expect(
          screen.queryByTestId('CommitmentChangeRequestList')
        ).not.toBeInTheDocument()
      })
    })

    describe('when updating', () => {
      it('displays section with data list and without skeleton loader', () => {
        arrangeTest({
          data: undefined,
          loading: true,
          initialLoading: false
        })

        expect(
          screen.getByText('Commitment Change Request')
        ).toBeInTheDocument()
        expect(
          screen.queryByTestId('SectionSkeletonLoader')
        ).not.toBeInTheDocument()
        expect(
          screen.getByTestId('CommitmentChangeRequestActions')
        ).toBeInTheDocument()
      })
    })

    describe('when `pendingCommitmentChangeRequest` data is empty`', () => {
      it('does not display section at all', () => {
        arrangeTest({
          data: null
        })

        expect(
          screen.queryByText('Commitment Change Request')
        ).not.toBeInTheDocument()
        expect(
          screen.queryByTestId('SectionSkeletonLoader')
        ).not.toBeInTheDocument()
        expect(
          screen.queryByTestId('CommitmentChangeRequestList')
        ).not.toBeInTheDocument()
        expect(
          screen.queryByTestId('CommitmentChangeRequestActions')
        ).not.toBeInTheDocument()
      })
    })

    describe('when `pendingCommitmentChangeRequest` is not empty', () => {
      it('displays section with data list', () => {
        arrangeTest({
          data: {
            id: '123',
            title: 'some-title',
            client: {
              id: 'client-id'
            },
            pendingCommitmentChangeRequest: createCommitmentChangeRequestMock()
          }
        })

        expect(
          screen.getByText('Commitment Change Request')
        ).toBeInTheDocument()
        expect(
          screen.queryByTestId('SectionSkeletonLoader')
        ).not.toBeInTheDocument()
        expect(
          screen.getByTestId('CommitmentChangeRequestList')
        ).toBeInTheDocument()
        expect(
          screen.getByTestId('CommitmentChangeRequestActions')
        ).toBeInTheDocument()
      })
    })
  })
})
