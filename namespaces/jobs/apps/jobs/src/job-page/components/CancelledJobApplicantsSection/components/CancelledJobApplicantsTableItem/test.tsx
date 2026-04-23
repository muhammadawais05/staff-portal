import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { CancelledJobApplicantFragment } from '../../data/get-cancelled-job-applicants/get-cancelled-job-applicants.staff.gql.types'
import { createCancelledJobApplicantsMock } from '../../data/get-cancelled-job-applicants/mocks'
import CancelledJobApplicantsTableItem from './CancelledJobApplicantsTableItem'

jest.mock(
  '@staff-portal/jobs/src/components/ApproveApplicationButton/ApproveApplicationButton',
  () => ({
    __esModule: true,
    default: () => <div data-testid='ApproveApplicationButton' />
  })
)

jest.mock('@staff-portal/operations', () => ({
  ...jest.requireActual('@staff-portal/operations'),
  useRenderLazyOperation: jest.fn()
}))

jest.mock('@staff-portal/communication-send-email', () => ({
  ...jest.requireActual('@staff-portal/communication-send-email'),
  useSendEmailModal: () => ({
    showModal: () => {}
  }),
  SendEmailActionItem: () => <div data-testid='send-email-action-item' />
}))

const arrangeTest = (cancelledJobApplicant: CancelledJobApplicantFragment) =>
  render(
    <TestWrapper>
      <table>
        <tbody>
          <CancelledJobApplicantsTableItem
            cancelledJobApplicant={cancelledJobApplicant}
          />
        </tbody>
      </table>
    </TestWrapper>
  )

describe('CancelledJobApplicantsTableItem', () => {
  it('renders row and actions', () => {
    const talentName = 'John Doe'
    const talentType = 'FinanceExpert'

    const cancelledJobApplicant = createCancelledJobApplicantsMock({
      talentName,
      talentType
    })

    arrangeTest(cancelledJobApplicant)

    expect(screen.getByText(talentName, { exact: false })).toBeInTheDocument()
    expect(screen.getByTestId('ApproveApplicationButton')).toBeInTheDocument()
  })

  it('shows email button', async () => {
    const jobId = 'job-id'
    const operation = {
      callable: OperationCallableTypes.HIDDEN,
      messages: []
    }
    const cancelledJobApplicant = createCancelledJobApplicantsMock({
      jobId,
      operation
    })

    arrangeTest(cancelledJobApplicant)

    expect(screen.getByTestId('send-email-action-item')).toBeInTheDocument()
  })
})
