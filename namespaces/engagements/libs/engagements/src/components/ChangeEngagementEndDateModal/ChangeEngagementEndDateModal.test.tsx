import { render, screen } from '@toptal/picasso/test-utils'
import React, { Suspense } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import ChangeEngagementEndDateModal from './ChangeEngagementEndDateModal'

jest.mock(
  './components/ChangeEngagementEndDateModalContent/ChangeEngagementEndDateModalContent',
  () => ({
    __esModule: true,
    default: () => <div data-testid='ChangeEngagementEndDateModalContent' />
  })
)

const arrangeTest = () =>
  render(
    <Suspense fallback=''>
      <TestWrapper>
        <ChangeEngagementEndDateModal engagementId='123' hideModal={() => {}} />
      </TestWrapper>
    </Suspense>
  )

describe('ChangeEngagementEndDateModal', () => {
  it('shows the change engagement end date modal', async () => {
    arrangeTest()

    expect(
      screen.getByTestId('ChangeEngagementEndDateModal')
    ).toBeInTheDocument()

    expect(
      await screen.findByTestId('ChangeEngagementEndDateModalContent')
    ).toBeInTheDocument()
  })
})
