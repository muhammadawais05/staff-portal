import React from 'react'
import { screen, render } from '@testing-library/react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { showJobFulfillmentStatus } from '@staff-portal/jobs'

import CompanyInformation from './CompanyInformation'
import { createJobMock } from './data/mocks'

jest.mock('./components/SalesOwnerField/SalesOwnerField', () => ({
  __esModule: true,
  default: () => <div data-testid='sales-owner-field' />
}))
jest.mock('@staff-portal/jobs', () => ({
  showJobFulfillmentStatus: jest.fn(),
  JobFulfillmentStatus: () => <div data-testid='job-fulfillment-status' />,
  JobStatus: () => <div data-testid='job-status' />
}))

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/engagements')
jest.mock('@staff-portal/date-time-utils', () => ({
  ...jest.requireActual('@staff-portal/date-time-utils'),
  getDateDistanceFromNow: (date: string) => date
}))

jest.mock('./components', () => ({
  ...jest.requireActual('./components'),
  RecruiterField: () => <div data-testid='RecruiterField' />
}))

const JOB_ID = 'job-123'

const mockUseGetNode = useGetNode as jest.Mock
const showJobFulfillmentStatusMock = showJobFulfillmentStatus as jest.Mock

const arrangeTest = () =>
  render(
    <TestWrapper>
      <CompanyInformation jobId={JOB_ID} />
    </TestWrapper>
  )

describe('CompanyInformation', () => {
  beforeEach(() => {
    mockUseGetNode.mockReset()
  })

  it('shows company name field', () => {
    const clientName = 'Test Company Name'
    const clientPageUrl = 'https://test.url'

    mockUseGetNode.mockReturnValue(() => ({
      data: {
        ...createJobMock({
          client: {
            id: 'test-id',
            enterprise: false,
            emailMessagesUrl: 'test.url',
            webResource: {
              text: clientName,
              url: clientPageUrl
            }
          }
        })
      },
      loading: false
    }))

    arrangeTest()

    const companyField = screen.getByTestId('client-link')

    expect(companyField).toBeInTheDocument()
  })

  describe('when `emailMessagesUrl` value is set', () => {
    it('shows email and flags field', () => {
      const clientId = 'test-id'
      const emailMessagesUrl = `clients/${clientId}/email_messages`

      mockUseGetNode.mockReturnValue(() => ({
        data: {
          ...createJobMock({
            client: {
              id: 'test-id',
              enterprise: false,
              emailMessagesUrl,
              webResource: {
                text: 'Client Name',
                url: 'test.url'
              }
            }
          })
        },
        loading: false
      }))

      arrangeTest()

      const companyEmailsField = screen.getByTestId('company-emails')

      expect(companyEmailsField).toBeInTheDocument()
      expect(companyEmailsField).toHaveAttribute('href', emailMessagesUrl)
    })
  })

  describe('when `emailMessagesUrl` value is not set', () => {
    it('does not show email and flags field', () => {
      mockUseGetNode.mockReturnValue(() => ({
        data: {
          ...createJobMock({
            client: {
              id: 'test-id',
              enterprise: false,
              emailMessagesUrl: null,
              webResource: {
                text: 'Client Name',
                url: 'test.url'
              }
            }
          })
        },
        loading: false
      }))

      arrangeTest()

      const companyEmailsField = screen.queryByTestId('company-emails')

      expect(companyEmailsField).not.toBeInTheDocument()
    })
  })

  it('shows client jobsUrl', () => {
    mockUseGetNode.mockReturnValue(() => ({
      data: {
        ...createJobMock({
          client: {
            id: 'test-id',
            enterprise: false,
            jobsUrl: 'https://google.com',
            webResource: {
              text: 'Client Name',
              url: 'test.url'
            }
          }
        })
      },
      loading: false
    }))

    arrangeTest()

    const jobsUrl = screen.getByTestId('company-information-jobs-url')

    expect(jobsUrl).toBeInTheDocument()
    expect(jobsUrl).toHaveAttribute('href', 'https://google.com')
  })

  it('shows recruiter field', () => {
    const claimerUrl = 'test.url'

    mockUseGetNode.mockReturnValue(() => ({
      data: {
        ...createJobMock({
          claimer: {
            id: 'test-id',
            fullName: 'Claimer Name',
            webResource: {
              text: 'Claimer Name',
              url: claimerUrl
            }
          }
        })
      },
      loading: false
    }))

    arrangeTest()

    const jobClaimerFieldLink = screen.getByTestId('RecruiterField')

    expect(jobClaimerFieldLink).toBeInTheDocument()
  })

  it('shows client partner field', () => {
    const clientPartnerUrl = 'test.url'

    mockUseGetNode.mockReturnValue(() => ({
      data: {
        ...createJobMock({
          client: {
            id: 'test-id',
            enterprise: true,
            emailMessagesUrl: 'test.url',
            clientPartner: {
              id: 'test-id',
              fullName: 'Claimer Name',
              webResource: {
                text: 'Claimer Name',
                url: clientPartnerUrl
              }
            },
            webResource: {
              text: 'Client Name',
              url: 'client.url'
            }
          }
        })
      },
      loading: false
    }))

    arrangeTest()

    const clientPartnerField = screen.getByTestId('client-partner-field')

    expect(clientPartnerField).toBeInTheDocument()
    expect(clientPartnerField).toHaveAttribute('href', clientPartnerUrl)
  })

  it('shows sales claimer field', () => {
    const salesClaimerUrl = 'test.url'

    mockUseGetNode.mockReturnValue(() => ({
      data: {
        ...createJobMock({
          client: {
            id: 'test-id',
            enterprise: true,
            emailMessagesUrl: 'test.url',
            claimer: {
              id: 'test-id',
              fullName: 'Claimer Name',
              webResource: {
                text: 'Claimer Name',
                url: salesClaimerUrl
              }
            },
            webResource: {
              text: 'Client Name',
              url: 'client.url'
            }
          }
        })
      },
      loading: false
    }))

    arrangeTest()

    const salesClimerField = screen.getByTestId('sales-claimer-field')

    expect(salesClimerField).toBeInTheDocument()
    expect(salesClimerField).toHaveAttribute('href', salesClaimerUrl)
  })

  describe('when `showJobFulfillmentStatus` returns true', () => {
    it('shows job fulfillment status field', () => {
      showJobFulfillmentStatusMock.mockReturnValue(true)

      mockUseGetNode.mockReturnValue(() => ({
        data: createJobMock(),
        loading: false
      }))

      arrangeTest()

      expect(screen.getByTestId('job-fulfillment-status')).toBeInTheDocument()
    })
  })
  describe('when `showJobFulfillmentStatus` returns false', () => {
    it('shows job status field', () => {
      showJobFulfillmentStatusMock.mockReturnValue(false)

      mockUseGetNode.mockReturnValue(() => ({
        data: createJobMock(),
        loading: false
      }))

      arrangeTest()

      expect(screen.getByTestId('job-status')).toBeInTheDocument()
    })
  })

  it('shows job posted field', () => {
    const postedAt = '2021-09-10T21:44:26+03:00'

    mockUseGetNode.mockReturnValue(() => ({
      data: {
        ...createJobMock({
          postedAt
        })
      },
      loading: false
    }))

    arrangeTest()

    expect(screen.getByText(postedAt)).toBeInTheDocument()
  })
})
