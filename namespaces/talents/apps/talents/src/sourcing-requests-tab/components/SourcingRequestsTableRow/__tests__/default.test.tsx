import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { createSourcingRequestMock } from '../../data/get-talent-sourcing-requests/mocks'
import SourcingRequestsTableRow from '../SourcingRequestsTableRow'
import { SourcingRequestFragment } from '../../data/get-talent-sourcing-requests'

const arrangeTest = (sourcingRequest: SourcingRequestFragment) => {
  return render(
    <TestWrapper>
      <table>
        <tbody>
          <SourcingRequestsTableRow sourcingRequest={sourcingRequest} />
        </tbody>
      </table>
    </TestWrapper>
  )
}

describe('SourcingRequestsTableRow', () => {
  it('should render table row for Sourcing Request', async () => {
    const sourcingRequestMock = createSourcingRequestMock()

    arrangeTest(sourcingRequestMock)

    const tableRow = await screen.findByRole('row')

    expect(
      within(tableRow).getByText('Lead Program Developer (1002)')
    ).toBeInTheDocument()
    expect(within(tableRow).getByText('Sneak Oil Co.')).toBeInTheDocument()
    expect(within(tableRow).getByText('Active Sourcing')).toBeInTheDocument()
  })
})
