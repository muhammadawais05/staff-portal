import { render, screen } from '@toptal/picasso/test-utils'
import React, { Suspense, ReactNode } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { SourcingRequestStatus } from '@staff-portal/graphql/staff'

import UpdateSourcingRequestStatusModal from './UpdateSourcingRequestStatusModal'

jest.mock(
  './components/UpdateSourcingRequestStatusForm/UpdateSourcingRequestStatusForm',
  () => ({
    __esModule: true,
    default: () => <div data-testid='UpdateSourcingRequestStatusForm' />
  })
)

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  Modal: ({ children }: { children: ReactNode }) => (
    <div data-testid='Modal'>{children}</div>
  )
}))

const arrangeTest = () =>
  render(
    <Suspense fallback=''>
      <TestWrapper>
        <UpdateSourcingRequestStatusModal
          jobId='123'
          sourcingRequestId='123'
          sourcingRequestStatus={SourcingRequestStatus.ACTIVE_SOURCING}
          hideModal={() => {}}
        />
      </TestWrapper>
    </Suspense>
  )

describe('UpdateSourcingRequestStatusModal', () => {
  it('shows the update sourcing request status modal', async () => {
    arrangeTest()

    expect(screen.getByTestId('Modal')).toBeInTheDocument()

    expect(
      await screen.findByTestId('UpdateSourcingRequestStatusForm')
    ).toBeInTheDocument()
  })
})
