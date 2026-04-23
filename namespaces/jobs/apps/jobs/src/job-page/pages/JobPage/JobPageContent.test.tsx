import React, { FC, ReactNode } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { Route, Router } from '@staff-portal/navigation'
import { JobStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { StaffBillingSettingsWidget } from '@staff-portal/billing-widgets'

import { useGetJobPageData } from './data/get-job-page-data'
import { useGetJobPageTabsPermissions } from './data/get-job-page-tabs-permissions'
import JobDetailsTab from '../../components/JobDetailsTab'
import SourcingRequestTab from '../../components/SourcingRequestTab'
import JobSummaryTab from '../../components/JobSummaryTab'
import EditRequestButton from '../../components/EditRequestButton/EditRequestButton'
import JobPageContent from './JobPageContent'

jest.mock('./data/get-job-page-data')
jest.mock('./data/get-job-page-tabs-permissions')
jest.mock('@staff-portal/page-wrapper', () => ({
  ContentWrapper: (({ tabs, children }) => (
    <>
      <div>{tabs}</div>
      <div>{children}</div>
    </>
  )) as FC<{ tabs: ReactNode }>
}))

jest.mock('../../components/JobDetailsTab')
jest.mock('../../components/SourcingRequestTab')
jest.mock('../../components/JobSummaryTab')
jest.mock('../../components/EditRequestButton/EditRequestButton')
jest.mock('@staff-portal/billing-widgets', () => ({
  StaffBillingSettingsWidget: jest.fn()
}))

const useGetJobPageDataMock = useGetJobPageData as jest.Mock
const useGetJobPageTabsPermissionsMock =
  useGetJobPageTabsPermissions as jest.Mock
const JobDetailsTabMock = JobDetailsTab as jest.Mock
const SourcingRequestTabMock = SourcingRequestTab as jest.Mock
const JobSummaryTabMock = JobSummaryTab as jest.Mock
const JobBillingTabMock = StaffBillingSettingsWidget as jest.Mock
const EditRequestButtonMock = EditRequestButton as jest.Mock

const TEST_ID = 'TEST_ID'

const JobPageContentMock = () => {
  const history = createMemoryHistory({ initialEntries: ['job-page'] })

  return (
    <Router history={history}>
      <Route path='job-page' exact>
        <TestWrapper>
          <JobPageContent jobId={TEST_ID} />
        </TestWrapper>
      </Route>
    </Router>
  )
}

const renderComponent = () => {
  const result = render(<JobPageContentMock />)

  result.rerender(<JobPageContentMock />)

  return result
}

describe('JobPageContent', () => {
  beforeEach(() => {
    useGetJobPageDataMock.mockReturnValue({ loading: false })

    JobDetailsTabMock.mockReturnValue(null)
    SourcingRequestTabMock.mockReturnValue(null)
    JobSummaryTabMock.mockReturnValue(null)
    JobBillingTabMock.mockReturnValue(null)
    EditRequestButtonMock.mockReturnValue(null)
  })

  it('renders job details tab as default', () => {
    useGetJobPageTabsPermissionsMock.mockReturnValue({ loading: false })

    renderComponent()

    expect(JobDetailsTabMock).toHaveBeenCalledWith(
      expect.objectContaining({ jobId: TEST_ID }),
      {}
    )

    expect(JobSummaryTabMock).not.toHaveBeenCalled()
    expect(SourcingRequestTabMock).not.toHaveBeenCalled()
    expect(JobBillingTabMock).not.toHaveBeenCalled()
  })

  it('renders job summary tab as default when present', () => {
    useGetJobPageTabsPermissionsMock.mockReturnValue({
      tabsPermissions: { status: JobStatus.PENDING_CLAIM },
      loading: false
    })

    renderComponent()

    expect(JobSummaryTabMock).toHaveBeenCalledWith(
      expect.objectContaining({ jobId: TEST_ID }),
      {}
    )

    expect(JobDetailsTabMock).not.toHaveBeenCalled()
    expect(JobBillingTabMock).not.toHaveBeenCalled()
    expect(SourcingRequestTabMock).not.toHaveBeenCalled()
  })

  it('renders sourcing request tab & Edit Request button when present', () => {
    useGetJobPageTabsPermissionsMock.mockReturnValue({
      tabsPermissions: { sourcingRequest: {} },
      loading: false
    })

    renderComponent()

    expect(JobDetailsTabMock).toHaveBeenCalledWith(
      expect.objectContaining({ jobId: TEST_ID }),
      {}
    )
    expect(EditRequestButtonMock).not.toHaveBeenCalled()

    fireEvent.click(screen.getByText('Sourcing Request'))

    expect(SourcingRequestTabMock).toHaveBeenCalledWith(
      expect.objectContaining({ jobId: TEST_ID }),
      {}
    )
    expect(SourcingRequestTabMock).toHaveBeenCalledTimes(1)

    expect(EditRequestButtonMock).toHaveBeenCalledTimes(1)

    expect(JobSummaryTabMock).not.toHaveBeenCalled()
    expect(JobBillingTabMock).not.toHaveBeenCalled()
  })

  it('renders billing tab', () => {
    useGetJobPageTabsPermissionsMock.mockReturnValue({
      userPermissions: { canViewBillingCycle: true },
      loading: false
    })

    renderComponent()

    expect(JobDetailsTabMock).toHaveBeenCalledWith(
      expect.objectContaining({ jobId: TEST_ID }),
      {}
    )

    fireEvent.click(screen.getByText('Billing & Invoice Settings'))

    expect(JobBillingTabMock).toHaveBeenCalledWith(
      expect.objectContaining({ jobId: TEST_ID }),
      {}
    )
    expect(JobBillingTabMock).toHaveBeenCalledTimes(1)

    expect(JobSummaryTabMock).not.toHaveBeenCalled()
    expect(SourcingRequestTabMock).not.toHaveBeenCalled()
  })
})
