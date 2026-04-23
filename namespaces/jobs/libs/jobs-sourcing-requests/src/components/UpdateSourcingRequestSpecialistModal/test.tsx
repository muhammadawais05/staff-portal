import { render, screen } from '@toptal/picasso/test-utils'
import React, { Suspense, ReactNode } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import UpdateSourcingRequestSpecialistModal from './UpdateSourcingRequestSpecialistModal'

jest.mock(
  './components/UpdateSourcingRequestSpecialistModalContent/UpdateSourcingRequestSpecialistModalContent',
  () => ({
    __esModule: true,
    default: () => (
      <div data-testid='UpdateSourcingRequestSpecialistModalContent' />
    )
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
        <UpdateSourcingRequestSpecialistModal
          jobId='123'
          sourcingRequestId='123'
          talentSpecialistId='123'
          talentSpecialistFullName='Specialist Name'
          hideModal={() => {}}
        />
      </TestWrapper>
    </Suspense>
  )

describe('UpdateSourcingRequestSpecialistModal', () => {
  it('shows the update sourcing request specialist modal', async () => {
    arrangeTest()

    expect(screen.getByTestId('Modal')).toBeInTheDocument()

    expect(
      await screen.findByTestId('UpdateSourcingRequestSpecialistModalContent')
    ).toBeInTheDocument()
  })
})
