import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { companyMock } from '../../data/company-task-card-fragment/mocks'
import CompanyTaskCardActions from './CompanyTaskCardActions'

const timeZone = 'America/Rankin_Inlet'
const taskCardTitle = 'Berge, Sanford and Shields'
const taskCardSubtitle = 'Company'
const taskMock = { operations: {} }

jest.mock('@staff-portal/activities', () => ({
  ...jest.requireActual('@staff-portal/activities'),
  AddActivityButton: () => <>AddActivityButton Component</>
}))
jest.mock('../CompanyTaskCardMainAction', () => () => (
  <>CompanyTaskCardMainAction Component</>
))
jest.mock('../CompanyTaskCardMoreActions', () => () => (
  <>CompanyTaskCardMoreActions Component</>
))
jest.mock('@staff-portal/tasks/src/containers/TimelineButton', () => () => (
  <>TimelineButton Component</>
))

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
      <CompanyTaskCardActions {...options} />
    </TestWrapperWithMocks>
  )

  return textContent
}

describe('CompanyTaskCardActions', () => {
  it('has basic components', () => {
    const textContent = arrangeTest()

    expect(textContent).toContain('TimelineButton Component')
    expect(textContent).toContain('CompanyTaskCardMainAction Component')
    expect(textContent).toContain('CompanyTaskCardMoreActions Component')
  })
})
