import React from 'react'
import { render, screen } from '@testing-library/react'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { createApproveCommitmentChangeRequestDataMock } from '../ApproveCommitmentChangeRequestModal/data/get-approve-commitment-change-request-data/mocks'
import ApproveCommitmentChangeRequestForm from './ApproveCommitmentChangeRequestForm'

jest.mock('./data', () => ({
  useApproveCommitmentChangeRequest: () => [() => {}, { loading: false }]
}))

const JOB_TITLE = 'Principal Brand Developer (12345)'

const arrangeTest = () =>
  render(
    <TestWrapperWithMocks>
      <ApproveCommitmentChangeRequestForm
        jobTitle={JOB_TITLE}
        jobId='job-id'
        commitmentChangeRequest={createApproveCommitmentChangeRequestDataMock({
          originalCommitment: EngagementCommitmentEnum.PART_TIME,
          newExtraHoursEnabled: true
        })}
        hideModal={jest.fn()}
      />
    </TestWrapperWithMocks>
  )

describe('RejectCommitmentChangeRequestModal', () => {
  it('renders copies and buttons', () => {
    arrangeTest()

    expect(
      screen.getByText('Approve Commitment Change Request')
    ).toBeInTheDocument()

    expect(screen.getByText(JOB_TITLE)).toBeInTheDocument()

    expect(
      screen.getByText(
        'Are you sure you want to approve this commitment change request?'
      )
    ).toBeInTheDocument()

    expect(
      screen.getByTestId(
        'ApproveCommitmentChangeRequestForm-original-commitment'
      )
    ).toHaveTextContent(
      /Original commitment: Part-Time with Extra Hours Disabled/
    )

    expect(
      screen.getByTestId(
        'ApproveCommitmentChangeRequestForm-desired-commitment'
      )
    ).toHaveTextContent(
      /Desired commitment: Full-Time with Extra Hours Enabled/
    )

    expect(
      screen.getByTestId('ApproveCommitmentChangeRequestForm-change-date')
    ).toBeInTheDocument()

    expect(
      screen.getByTestId('ApproveCommitmentChangeRequestForm-talent-rate')
    ).toBeInTheDocument()

    expect(
      screen.getByTestId('ApproveCommitmentChangeRequestForm-company-rate')
    ).toBeInTheDocument()

    expect(
      screen.getByTestId('ApproveCommitmentChangeRequestForm-notify-talent')
    ).toBeInTheDocument()

    expect(
      screen.getByTestId('ApproveCommitmentChangeRequestForm-notify-company')
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        'Making changes to extra hours settings will send out notifications to both client and talent. Any extra hours changes will be applied to the current billing cycle.'
      )
    ).toBeInTheDocument()
  })
})
