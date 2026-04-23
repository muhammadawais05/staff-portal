import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { companyMock } from '../../data/company-task-card-fragment/mocks'
import { TaskCardCompanyFragment } from '../../data/company-task-card-fragment'
import CompanyTaskCardAppliedSummary from './CompanyTaskCardAppliedSummary'

jest.mock('../CompanyTaskCardStatus', () => () => (
  <div data-testid='CompanyTaskCardStatus' />
))

const arrangeTest = () => {
  render(
    <TestWrapperWithMocks addTypename={false}>
      <CompanyTaskCardAppliedSummary
        company={companyMock as TaskCardCompanyFragment}
      />
    </TestWrapperWithMocks>
  )
}

describe('CompanyTaskCardAppliedSummary', () => {
  it('has basic components', () => {
    arrangeTest()

    expect(screen.getByTestId('CompanyTaskCardStatus')).toBeInTheDocument()
  })

  it('shows proper data', () => {
    arrangeTest()
    const overviewBlockLabels = screen.getAllByTestId('OverviewBlock-label')
    const overviewBlockValues = screen.getAllByTestId('OverviewBlock-value')

    expect(overviewBlockLabels[0]).toHaveTextContent('Interested in')
    expect(overviewBlockValues[0]).toHaveTextContent('Developers')
    expect(overviewBlockLabels[1]).toHaveTextContent('Lead bucket')
    expect(overviewBlockValues[1]).toHaveTextContent('Medium')
    expect(overviewBlockLabels[2]).toHaveTextContent('Days in funnel')
    expect(overviewBlockValues[2]).toHaveTextContent('568')
  })
})
