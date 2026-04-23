import React, { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { ColorType } from '@toptal/picasso'
import { ContractStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import ContractStatusField from './ContractStatusField'

jest.mock('@toptal/picasso', () => ({
  Typography: ({
    color,
    children
  }: {
    color?: ColorType
    children?: ReactNode
  }) => (
    <div data-testid='Typography'>
      <div data-color={color}>{children}</div>
    </div>
  )
}))

const arrangeTest = (status: ContractStatus) =>
  render(
    <TestWrapper>
      <ContractStatusField status={status} />
    </TestWrapper>
  )

describe('ContractStatusField', () => {
  it.each([
    [ContractStatus.CREATED, { color: 'yellow', label: 'Created' }],
    [
      ContractStatus.RECIPIENT_SIGNED,
      { color: 'yellow', label: 'Recipient Signed' }
    ],
    [
      ContractStatus.PRE_VERIFICATION,
      { color: 'yellow', label: 'Pre Verification' }
    ],
    [
      ContractStatus.IN_VERIFICATION,
      { color: 'yellow', label: 'In Verification' }
    ],
    [ContractStatus.SIGNED, { color: 'green', label: 'Signed' }],
    [ContractStatus.EXPIRED, { color: 'red', label: 'Expired' }],
    [ContractStatus.REMOVED, { color: 'grey', label: 'Removed' }]
  ])('renders "%s" status', (status, { color, label }) => {
    arrangeTest(status)

    expect(screen.queryByText(label)).toHaveAttribute('data-color', color)
  })
})
