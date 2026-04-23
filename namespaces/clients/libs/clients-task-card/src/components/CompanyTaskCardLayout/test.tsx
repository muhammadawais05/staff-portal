import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { companyMock } from '../../data/company-task-card-fragment/mocks'
import CompanyTaskCardLayout from './CompanyTaskCardLayout'

jest.mock('../CompanyTaskCardActions', () => () => (
  <>CompanyTaskCardActions Component</>
))
jest.mock('../CompanyTaskCardActiveSummary', () => () => (
  <>CompanyTaskCardActiveSummary Component</>
))
jest.mock('../CompanyTaskCardAppliedSummary', () => () => (
  <>CompanyTaskCardAppliedSummary Component</>
))
jest.mock('../CompanyTaskCardFlags', () => () => (
  <>CompanyTaskCardFlags Component</>
))

const timeZone = 'America/Rankin_Inlet'
const taskCardTitle = 'Berge, Sanford and Shields'
const taskCardSubtitle = 'Company'
const taskMock = {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const arrangeTest = (customOptions: any = {}) => {
  const options = {
    loading: false,
    company: companyMock,
    task: taskMock,
    timeZone: timeZone,
    taskCardTitle: taskCardTitle,
    taskCardSubtitle: taskCardSubtitle,
    ...customOptions
  }

  const {
    container: { textContent }
  } = render(
    <TestWrapperWithMocks addTypename={false}>
      <CompanyTaskCardLayout {...options} />
    </TestWrapperWithMocks>
  )

  return textContent
}

describe('CompanyTaskCard structure', () => {
  it('contains some basic copies and components', () => {
    const textContent = arrangeTest()

    expect(textContent).toContain(taskCardTitle)
    expect(textContent).toContain(taskCardSubtitle)

    expect(textContent).toContain('CompanyTaskCardFlags Component')
    expect(textContent).toContain('CompanyTaskCardActions Component')
  })

  it('shows CompanyTaskCardAppliedSummary when no engagements', () => {
    const withoutEngagements = {
      ...companyMock,
      ...{ engagements: { totalCount: 0 } }
    }

    const textContent = arrangeTest({ company: withoutEngagements })

    expect(textContent).toContain('CompanyTaskCardAppliedSummary Component')
    expect(textContent).not.toContain('CompanyTaskCardActiveSummary Component')
  })

  it('shows CompanyTaskCardActiveSummary when some engagements', () => {
    const withEngagements = {
      ...companyMock,
      ...{ engagements: { totalCount: 1 } }
    }

    const textContent = arrangeTest({ company: withEngagements })

    expect(textContent).toContain('CompanyTaskCardActiveSummary Component')
    expect(textContent).not.toContain('CompanyTaskCardAppliedSummary Component')
  })

  it('renders nothing if no a company', () => {
    const textContent = arrangeTest({ company: undefined })

    expect(textContent).not.toContain('CompanyTaskCardFlags Component')
    expect(textContent).not.toContain('CompanyTaskCardActions Component')
    expect(textContent).not.toContain('CompanyTaskCardAppliedSummary Component')
    expect(textContent).not.toContain('CompanyTaskCardActiveSummary Component')
  })
})
