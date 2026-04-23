import { Table } from '@toptal/picasso'
import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { EngagementStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { getFormattedDateRange } from '@staff-portal/date-time-utils'

import { createEngagementBreakMock } from '../../mocks'
import BreakRowContent from './BreakRowContent'

jest.mock('../BreakActions/BreakActions', () => ({
  __esModule: true,
  default: () => <div data-testid='break-actions-mock' />
}))

jest.mock('@staff-portal/date-time-utils', () => ({
  getFormattedDateRange: jest.fn()
}))

const mockReturnValues = ({
  prefix,
  period
}: {
  prefix: string
  period: string
}) => {
  const mockGetFormattedDateRange = getFormattedDateRange as jest.Mock

  mockGetFormattedDateRange.mockReturnValue({ prefix, period })
}

const arrangeTest = ({
  prefix,
  period
}: {
  prefix: string
  period: string
}) => {
  mockReturnValues({
    prefix,
    period
  })

  return render(
    <TestWrapper>
      <Table>
        <Table.Body>
          <Table.Row>
            <BreakRowContent
              engagementId='abc'
              engagementStatus={EngagementStatus.ACTIVE}
              node={createEngagementBreakMock()}
            />
          </Table.Row>
        </Table.Body>
      </Table>
    </TestWrapper>
  )
}

describe('BreakRowContent', () => {
  it('renders actions', () => {
    arrangeTest({ prefix: '1', period: '2' })
    expect(screen.getByTestId('break-actions-mock')).toBeInTheDocument()
  })
  it('renders prefix and period', () => {
    arrangeTest({ prefix: 'On', period: '11-11-2029' })

    expect(screen.getByTestId('break-row-content-prefix')).toBeInTheDocument()
    expect(screen.getByText('On')).toBeInTheDocument()
    expect(screen.getByText('11-11-2029')).toBeInTheDocument()
  })

  it('renders period without prefix', () => {
    arrangeTest({ period: '11-11-2029 - 12-12-2031', prefix: '' })
    expect(
      screen.queryByTestId('break-row-content-prefix')
    ).not.toBeInTheDocument()
    expect(screen.getByText('11-11-2029 - 12-12-2031')).toBeInTheDocument()
  })
})
