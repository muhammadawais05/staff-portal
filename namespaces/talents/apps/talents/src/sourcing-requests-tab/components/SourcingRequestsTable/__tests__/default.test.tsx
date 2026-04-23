import React from 'react'
import { render, screen, waitFor, within } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { SourcingRequestFragment } from '../../data/get-talent-sourcing-requests'
import SourcingRequestsTable from '../SourcingRequestsTable'
import { createSourcingRequestMock } from '../../data/get-talent-sourcing-requests/mocks'

jest.mock('@staff-portal/counters')

const arrangeTest = (
  sourcingRequests: SourcingRequestFragment[],
  loading: boolean
) => {
  return render(
    <TestWrapper>
      <SourcingRequestsTable
        sourcingRequests={sourcingRequests}
        loading={loading}
      />
    </TestWrapper>
  )
}

describe('SourcingRequestsTableRow', () => {
  it('should render table row for Sourcing Request', async () => {
    arrangeTest([createSourcingRequestMock()], false)

    await waitFor(async () => {
      const tableRow = await screen.findByRole('table')

      expect(within(tableRow).getByText('1002')).toBeInTheDocument()
      expect(
        within(tableRow).getByText('Lead Program Developer (1002)')
      ).toBeInTheDocument()
      expect(within(tableRow).getByText('Sneak Oil Co.')).toBeInTheDocument()
      expect(within(tableRow).getByText('Active Sourcing')).toBeInTheDocument()
    })
  })

  it('should render no linked sourcing requests for unlinked talent', async () => {
    arrangeTest([], false)

    await waitFor(async () => {
      expect(
        screen.getByText(
          'This talent is not currently linked to any sourcing request.'
        )
      ).toBeInTheDocument()
    })
  })
})
