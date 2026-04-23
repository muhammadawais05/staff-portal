import { render, screen } from '@toptal/picasso/test-utils'
import React, { Suspense, ReactNode } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import ChangeEngagementStartDateModal from './ChangeEngagementStartDateModal'

jest.mock(
  './components/ChangeEngagementStartDateModalContent/ChangeEngagementStartDateModalContent',
  () => ({
    __esModule: true,
    default: () => <div data-testid='ChangeEngagementStartDateModalContent' />
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
        <ChangeEngagementStartDateModal
          engagementId='123'
          hideModal={() => {}}
        />
      </TestWrapper>
    </Suspense>
  )

describe('ChangeEngagementStartDateModal', () => {
  it('shows the change engagement start date modal', async () => {
    arrangeTest()

    expect(screen.getByTestId('Modal')).toBeInTheDocument()

    expect(
      await screen.findByTestId('ChangeEngagementStartDateModalContent')
    ).toBeInTheDocument()
  })
})
