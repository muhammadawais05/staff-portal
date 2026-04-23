import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import SourcingRequestsTableHeader from '../SourcingRequestsTableHeader'

const arrangeTest = () => {
  return render(
    <TestWrapper>
      <table>
        <thead>
          <SourcingRequestsTableHeader />
        </thead>
      </table>
    </TestWrapper>
  )
}

describe('SourcingRequestsTableRow', () => {
  it('should render Sourcing Request table header', async () => {
    arrangeTest()

    const tableRow = await screen.findByRole('row')

    expect(within(tableRow).getByText('Job ID')).toBeInTheDocument()
    expect(within(tableRow).getByText('Job Title')).toBeInTheDocument()
    expect(within(tableRow).getByText('Company')).toBeInTheDocument()
    expect(
      within(tableRow).getByText('Sourcing Request Status')
    ).toBeInTheDocument()
  })
})
