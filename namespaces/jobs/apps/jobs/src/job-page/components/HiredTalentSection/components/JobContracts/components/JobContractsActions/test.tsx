import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import JobContractsActions, { Props } from './JobContractsActions'
import { createHiredTalentEngagementFragmentMock } from '../../../../data/get-hired-talent/mocks'

jest.mock('@staff-portal/engagements', () => ({
  __esModule: true,
  ImportContractAsTopButton: () => <div data-testid='import-contract-as-top' />,
  ImportTopButton: () => <div data-testid='import-top' />,
  SendTopButton: () => <div data-testid='send-top' />
}))

const engagementMock = createHiredTalentEngagementFragmentMock()

const arrangeTest = (props: Props) => {
  render(
    <TestWrapper>
      <JobContractsActions {...props} />
    </TestWrapper>
  )
}

describe('JobContractsActions', () => {
  it('displays `Import STA as TOP` button', () => {
    arrangeTest({ engagement: engagementMock })

    expect(screen.getByTestId('import-contract-as-top')).toBeInTheDocument()
  })

  it('displays `Import TOP` button', () => {
    arrangeTest({ engagement: engagementMock })

    expect(screen.getByTestId('import-top')).toBeInTheDocument()
  })

  it('displays `Send TOP` button', () => {
    arrangeTest({ engagement: engagementMock })

    expect(screen.getByTestId('send-top')).toBeInTheDocument()
  })
})
