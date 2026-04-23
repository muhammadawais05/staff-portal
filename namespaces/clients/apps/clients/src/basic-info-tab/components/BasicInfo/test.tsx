import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import BasicInfo from './BasicInfo'

jest.mock('../AccountOverviewSection', () => ({
  __esModule: true,
  default: () => <div>AccountOverviewSection</div>
}))
jest.mock('../CompanyOpportunitiesSection', () => ({
  __esModule: true,
  default: () => <div>CompanyOpportunitiesSection</div>
}))
jest.mock('../RelatedTasksSection', () => ({
  __esModule: true,
  default: () => <div>RelatedTasksSection</div>
}))
jest.mock('../InternalTeamSection', () => ({
  __esModule: true,
  default: () => <div>InternalTeamSection</div>
}))
jest.mock('../TransferRequestSection', () => ({
  __esModule: true,
  default: () => <div>TransferRequestSection</div>
}))
jest.mock('../ClientScheduledMeetings/ClientScheduledMeetings', () => ({
  __esModule: true,
  default: () => <div>ClientScheduledMeetings</div>
}))
jest.mock('../CallRequestsSection', () => ({
  __esModule: true,
  default: () => <div>CallRequestsSection</div>
}))
jest.mock('../LinkedCompaniesSection', () => ({
  __esModule: true,
  default: () => <div>LinkedCompaniesSection</div>
}))
jest.mock('../AboutSection', () => ({
  __esModule: true,
  default: () => <div>AboutSection</div>
}))
jest.mock('../MissionSection', () => ({
  __esModule: true,
  default: () => <div>MissionSection</div>
}))
jest.mock('@staff-portal/error-handling')

const COMPANY_ID = 'mock-company-id'

const arrangeTest = (companyId = COMPANY_ID) =>
  render(
    <TestWrapper>
      <BasicInfo companyId={companyId} />
    </TestWrapper>
  )

describe('BasicInfo', () => {
  it('shows proper sections', () => {
    arrangeTest()

    expect(screen.getByText('AccountOverviewSection')).toBeInTheDocument()
    expect(screen.getByText('AboutSection')).toBeInTheDocument()
    expect(screen.getByText('MissionSection')).toBeInTheDocument()
    expect(screen.getByText('InternalTeamSection')).toBeInTheDocument()
    expect(screen.getByText('TransferRequestSection')).toBeInTheDocument()
    expect(screen.getByText('CompanyOpportunitiesSection')).toBeInTheDocument()
    expect(screen.getByText('RelatedTasksSection')).toBeInTheDocument()
    expect(screen.getByText('ClientScheduledMeetings')).toBeInTheDocument()
    expect(screen.getByText('CallRequestsSection')).toBeInTheDocument()
    expect(screen.getByText('LinkedCompaniesSection')).toBeInTheDocument()
  })
})
