import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from '@staff-portal/navigation'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import TeamTaskMetricsWidget from '../TeamTaskMetricsWidget'
import { createTeamTaskMetricsMock } from '../../../data/get-team-task-metrics/mocks'

const ME_OVERDUE = '40'
const ME_PENDING = '17'
const ME_TODAY = '1'

const arrangeTest = () => ({
  renderResult: render(
    <MemoryRouter>
      <TestWrapperWithMocks
        mocks={createTeamTaskMetricsMock(ME_OVERDUE, ME_PENDING, ME_TODAY)}
      >
        <TeamTaskMetricsWidget />
      </TestWrapperWithMocks>
    </MemoryRouter>
  )
})

describe('Metrics Widget', () => {
  it('correctly displays and colors the user data', async () => {
    const {
      renderResult: { getByText, findByText }
    } = arrangeTest()

    expect(await findByText('Overdue')).toBeInTheDocument()
    expect(getByText('Pending')).toBeInTheDocument()
    expect(getByText('Due Today')).toBeInTheDocument()
    expect(getByText(ME_PENDING)).toBeInTheDocument()
    expect(getByText(ME_OVERDUE)).toBeInTheDocument()
    expect(getByText(ME_TODAY)).toBeInTheDocument()
    expect(getByText(ME_TODAY).className).toContain('Typography-green')

    expect(getByText(ME_OVERDUE).className).toContain('Typography-red')
  })

  it('correctly displays team data', async () => {
    const {
      renderResult: { getByText, findByText }
    } = arrangeTest()

    expect(await findByText('Due Today')).toBeInTheDocument()
    expect(getByText('2')).toBeInTheDocument()
    expect(getByText('2.5')).toBeInTheDocument()
    expect(getByText('2.13')).toBeInTheDocument()
  })
})
