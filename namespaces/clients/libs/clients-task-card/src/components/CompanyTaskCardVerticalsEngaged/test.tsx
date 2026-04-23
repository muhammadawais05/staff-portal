import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { TaskCardCompanyFragment } from '../../data/company-task-card-fragment'
import { companyMock } from '../../data/company-task-card-fragment/mocks'
import CompanyTaskCardVerticalsEngaged from './CompanyTaskCardVerticalsEngaged'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const arrangeTest = (customOptions: any = {}) => {
  const company = {
    ...companyMock,
    ...customOptions
  } as TaskCardCompanyFragment

  const {
    container: { textContent, innerHTML }
  } = render(
    <TestWrapper>
      <CompanyTaskCardVerticalsEngaged company={company} />
    </TestWrapper>
  )

  return { textContent, innerHTML }
}

describe('CompanyTaskCardVerticalsEngaged', () => {
  it('has 0 items on verticalsEngaged', () => {
    arrangeTest({
      jobsForVerticalsEngaged: {
        verticalsEngaged: []
      }
    })

    expect(screen.getByTestId('OverviewBlock-label')).toHaveTextContent(
      'Verticals engaged'
    )
    expect(screen.getByTestId('OverviewBlock-value')).toHaveTextContent('0')
  })

  it('has 2 items on verticalsEngaged', () => {
    arrangeTest({
      jobsForVerticalsEngaged: {
        verticalsEngaged: ['1st engagement', '2nd engagement']
      }
    })

    expect(screen.getByTestId('OverviewBlock-label')).toHaveTextContent(
      'Verticals engaged'
    )
    expect(screen.getByTestId('OverviewBlock-value')).toHaveTextContent('2')
  })

  it('has a gray Info16 Icon', () => {
    const { innerHTML } = arrangeTest()

    expect(innerHTML).toContain('Info16')
    expect(innerHTML).toContain('darkGrey')
  })
})
