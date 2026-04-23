import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from '@staff-portal/navigation'
import { getJobsPath } from '@staff-portal/routes'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import SalesToolsWidget from './SalesToolsWidget'
import { createGetNumberOfActiveJobsMock } from '../../data/get-number-of-active-jobs/mocks'

const ROLE_ID = '321321'

jest.mock('@staff-portal/current-user', () => ({
  __esModule: true,
  useGetCurrentUser: () => ({
    fullName: '',
    email: '',
    type: 'Staff',
    id: ROLE_ID
  })
}))

jest.mock('@staff-portal/routes', () => ({
  getJobsPath: jest.fn()
}))

const arrangeTest = (mocks: MockedResponse[], salesTool = true) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <MemoryRouter>
        <SalesToolsWidget
          availableTools={{ salesTool, salesToolEscalations: false }}
        />
      </MemoryRouter>
    </TestWrapperWithMocks>
  )

describe('Sales Tools', () => {
  describe('when sales tool is available', () => {
    it('is displayed', async () => {
      const numberOfActiveJobsMock = createGetNumberOfActiveJobsMock({
        companyClaimer: ROLE_ID
      })

      arrangeTest([numberOfActiveJobsMock])

      const salesToolsHeader = await screen.findByText('Sales Tools')

      expect(salesToolsHeader).toBeInTheDocument()
    })
  })

  it('displays Active jobs stats link', async () => {
    const NUMBER_OF_ACTIVE_JOBS = 123
    const numberOfActiveJobsMock = createGetNumberOfActiveJobsMock({
      companyClaimer: ROLE_ID,
      totalCount: NUMBER_OF_ACTIVE_JOBS
    })

    arrangeTest([numberOfActiveJobsMock])

    const activeJobsLink = await screen.findByText(
      String(NUMBER_OF_ACTIVE_JOBS)
    )

    expect(activeJobsLink).toBeInTheDocument()
    expect(getJobsPath).toHaveBeenCalledWith({
      company_claimer_id: 'me',
      cumulative_statuses: ['active']
    })
  })
})
