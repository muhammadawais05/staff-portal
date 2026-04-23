import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { companyMock } from '../../data/company-task-card-fragment/mocks'
import { TaskCardCompanyFragment } from '../../data/company-task-card-fragment'
import CompanyTaskCardActiveSummary from './CompanyTaskCardActiveSummary'

jest.mock('../CompanyTaskCardJobs', () => () => (
  <>CompanyTaskCardJobs Component</>
))
jest.mock('../CompanyTaskCardRevenue', () => () => (
  <>CompanyTaskCardRevenue Component</>
))
jest.mock('../CompanyTaskCardStatus', () => () => (
  <>CompanyTaskCardStatus Component</>
))
jest.mock('../CompanyTaskCardVerticalsEngaged', () => () => (
  <>CompanyTaskCardVerticalsEngaged Component</>
))

const arrangeTest = () => {
  const company = companyMock as TaskCardCompanyFragment

  const {
    container: { textContent }
  } = render(
    <TestWrapperWithMocks addTypename={false}>
      <CompanyTaskCardActiveSummary company={company} />
    </TestWrapperWithMocks>
  )

  return textContent
}

describe('CompanyTaskCardActiveSummary', () => {
  it('has basic components', () => {
    const textContent = arrangeTest()

    expect(textContent).toContain('CompanyTaskCardJobs Component')
    expect(textContent).toContain('CompanyTaskCardRevenue Component')
    expect(textContent).toContain('CompanyTaskCardStatus Component')
    expect(textContent).toContain('CompanyTaskCardVerticalsEngaged Component')
  })
})
