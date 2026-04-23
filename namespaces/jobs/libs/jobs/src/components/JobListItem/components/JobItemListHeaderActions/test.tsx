import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import { JobListItemFragment } from '../../data/job-list-item-fragment'
import { createJobListItemFragment } from '../../data/job-list-item-fragment/mocks'
import JobItemListHeaderActions from './JobItemListHeaderActions'

const CLAIM_AND_APPROVE_ID = 'CLAIM_AND_APPROVE_ID'
const SEARCH_CANDIDATE_ID = 'SEARCH_CANDIDATE_ID'

jest.mock('../../../SearchCandidatesButton', () => ({
  __esModule: true,
  default: () => <div data-testid={SEARCH_CANDIDATE_ID} />
}))

jest.mock(
  '../../../../containers/ClaimAndApproveJobButton/ClaimAndApproveJobButton',
  () => ({
    __esModule: true,
    default: () => <div data-testid={CLAIM_AND_APPROVE_ID} />
  })
)

const arrangeTest = (job: JobListItemFragment) =>
  render(
    <TestWrapper>
      <JobItemListHeaderActions job={job} />
    </TestWrapper>
  )

describe('JobItemListHeaderActions', () => {
  describe('when `sendCandidateUrl` is missing', () => {
    it('does not render Send Candidate button', () => {
      const { queryByTestId } = arrangeTest(createJobListItemFragment())

      expect(queryByTestId('send-candidate-link')).not.toBeInTheDocument()
    })
  })

  describe('when `sendCandidateUrl` is present', () => {
    it('renders Send Candidate button', () => {
      const SEND_CANDIDATE_URL = 'sendCandidateUrl'
      const { getByTestId } = arrangeTest(
        createJobListItemFragment({
          sendCandidateUrl: SEND_CANDIDATE_URL
        })
      )

      expect(getByTestId('send-candidate-link')).toBeInTheDocument()
      expect(getByTestId('send-candidate-link').getAttribute('href')).toEqual(
        SEND_CANDIDATE_URL
      )
    })
  })

  describe('when `searchCandidatesUrl` is missing', () => {
    it('does not render Search Candidates button', () => {
      const { queryByTestId } = arrangeTest(createJobListItemFragment())

      expect(queryByTestId(SEARCH_CANDIDATE_ID)).not.toBeInTheDocument()
    })
  })

  describe('when `searchCandidatesUrl` is present', () => {
    it('renders Search Candidates button', () => {
      const { getByTestId } = arrangeTest(
        createJobListItemFragment({ searchCandidatesUrl: 'test_url' })
      )

      expect(getByTestId(SEARCH_CANDIDATE_ID)).toBeInTheDocument()
    })
  })

  describe('when `approveJob` operation is hidden', () => {
    it('does not render Claim and approve button', () => {
      const { queryByTestId } = arrangeTest(
        createJobListItemFragment({
          operations: {
            editJobInvoiceNote: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            },
            approveJob: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            }
          }
        })
      )

      expect(queryByTestId(CLAIM_AND_APPROVE_ID)).not.toBeInTheDocument()
    })
  })

  describe('when `approveJob` operation is enabled', () => {
    it('renders claim and approve button', () => {
      const { getByTestId } = arrangeTest(
        createJobListItemFragment({
          operations: {
            editJobInvoiceNote: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            },
            approveJob: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            }
          }
        })
      )

      expect(getByTestId(CLAIM_AND_APPROVE_ID)).toBeInTheDocument()
    })
  })
})
