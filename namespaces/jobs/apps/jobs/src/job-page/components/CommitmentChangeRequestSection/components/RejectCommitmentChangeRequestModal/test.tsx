import React from 'react'
import { render, screen } from '@testing-library/react'
import { useMutation } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { useGetOperation } from '@staff-portal/operations'

import RejectCommitmentChangeRequestModal from '.'

jest.mock('@staff-portal/operations', () => ({
  __esModule: true,
  ...jest.requireActual('@staff-portal/operations'),
  useGetOperation: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/mutation-result-handlers/src/form-error-handler')

const useMutationMock = useMutation as jest.Mock
const useHandleMutationResultMock = useHandleMutationResult as jest.Mock
const useGetOperationMock = useGetOperation as jest.Mock

const JOB_TITLE = 'Principal Brand Developer (12345)'

const arrangeTest = () =>
  render(
    <TestWrapper>
      <RejectCommitmentChangeRequestModal
        jobId='123'
        jobTitle={JOB_TITLE}
        commitmentChangeRequestId='commitment-id'
        hideModal={jest.fn()}
      />
    </TestWrapper>
  )

describe('RejectCommitmentChangeRequestModal', () => {
  it('has required copies and buttons', () => {
    useMutationMock.mockReturnValue([() => {}, { loading: false }])
    useGetOperationMock.mockReturnValue({ enabled: true, loading: false })
    useHandleMutationResultMock.mockReturnValue({})

    arrangeTest()

    expect(
      screen.getByText('Reject Commitment Change Request')
    ).toBeInTheDocument()

    expect(screen.getByText(JOB_TITLE)).toBeInTheDocument()

    expect(
      screen.getByText(
        'What is your reason for rejecting the commitment change request?'
      )
    ).toBeInTheDocument()

    expect(screen.getByText('Cancel')).toBeInTheDocument()

    expect(screen.getByText('Reject Request')).toBeInTheDocument()
  })
})
