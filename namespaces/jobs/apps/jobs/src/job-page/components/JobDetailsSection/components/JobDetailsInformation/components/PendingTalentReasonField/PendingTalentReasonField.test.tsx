import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import PendingTalentReasonField from './PendingTalentReasonField'

const JOB_ID = 'job-123'
const REASON = 'Sourcing'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/operations/src/components/LazyOperation')

const operationMock = createOperationMock()

const arrangeTest = () =>
  render(
    <TestWrapper>
      <PendingTalentReasonField
        jobId={JOB_ID}
        pendingTalentReason={REASON}
        operation={operationMock}
      />
    </TestWrapper>
  )

describe('PendingTalentReason', () => {
  it('Render PendingTalentReason', () => {
    const { getByText } = arrangeTest()

    expect(getByText(REASON)).toBeInTheDocument()
  })
})
