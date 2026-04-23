import React from 'react'
import { screen, render, within } from '@testing-library/react'
import {
  BusinessTypes,
  Job,
  SourcingRequestEnterpriseJobStatus
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetNode } from '@staff-portal/data-layer-service'

import SourcingRequestAccountInformation from '../SourcingRequestAccountInformation'
import { Props as EnterpriseJobStatusProps } from '../EnterpriseJobStatus'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/engagements')

const mockEnterpriseJobStatus = jest.fn()

jest.mock('../EnterpriseJobStatus', () => ({
  __esModule: true,
  default: (props: EnterpriseJobStatusProps) => {
    mockEnterpriseJobStatus(props)

    return <div data-testid='enterprise-status-component' />
  }
}))

const useGetNodeMock = useGetNode as jest.Mock

const jobMock = {
  id: 'job-id',
  client: {
    businessType: BusinessTypes.ENTERPRISE_BUSINESS,
    enterprise: false
  }
}

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>
}

const arrangeTest = (props: RecursivePartial<Job>) => {
  useGetNodeMock.mockReturnValue(() => {
    return {
      data: {
        ...jobMock,
        ...props
      }
    }
  })

  render(
    <TestWrapper>
      <SourcingRequestAccountInformation jobId={jobMock.id} />
    </TestWrapper>
  )
}

describe('SourcingRequestDetails', () => {
  describe('when business type', () => {
    it('renders enterprise', () => {
      arrangeTest({
        client: {
          businessType: BusinessTypes.ENTERPRISE_BUSINESS,
          enterprise: true
        }
      })

      expect(
        within(screen.getByTestId('sourcing-request-business-type')).getByText(
          'Enterprise'
        )
      ).toBeInTheDocument()
    })

    it('renders not enterprise', () => {
      arrangeTest({
        client: {
          businessType: BusinessTypes.GOVERNMENT,
          enterprise: false
        }
      })
      expect(
        within(screen.getByTestId('sourcing-request-business-type')).getByText(
          'Not Enterprise'
        )
      ).toBeInTheDocument()
    })
  })

  describe('renders enterprise Job Status', () => {
    it('hides if is not enterprise job', () => {
      arrangeTest({
        client: {
          enterprise: false
        }
      })

      expect(
        screen.queryByText('Enterprise Job Status')
      ).not.toBeInTheDocument()
    })

    it('renders if is enterprise job', () => {
      arrangeTest({
        client: {
          enterprise: true
        }
      })

      expect(screen.queryByText('Enterprise Job Status')).toBeInTheDocument()
    })

    it('renders require updates', () => {
      arrangeTest({
        client: {
          enterprise: true
        },
        sourcingRequest: {
          enterpriseJobStatus: null
        }
      })

      expect(
        within(
          screen.getByTestId('sourcing-request-enterprise-job-status')
        ).getByText('Requires Update')
      ).toBeInTheDocument()
    })

    it('renders enterprise job status component', () => {
      arrangeTest({
        client: {
          enterprise: true
        },
        sourcingRequest: {
          enterpriseJobStatus: SourcingRequestEnterpriseJobStatus.EARLY_SOURCING
        }
      })

      expect(
        screen.getByTestId('enterprise-status-component')
      ).toBeInTheDocument()

      expect(mockEnterpriseJobStatus).toHaveBeenCalledWith(
        expect.objectContaining({
          enterpriseJobStatus: SourcingRequestEnterpriseJobStatus.EARLY_SOURCING
        })
      )
    })
  })

  describe('renders shared field', () => {
    it('renders yes if share is on', () => {
      arrangeTest({
        client: {
          enterprise: true
        },
        sourcingRequest: {
          canShareCompanyName: true
        }
      })

      expect(
        screen.getByTestId('sourcing-request-shared-field')
      ).toHaveTextContent('Yes')
    })

    it('renders no if share is off', () => {
      arrangeTest({
        client: {
          enterprise: true
        },
        sourcingRequest: {
          canShareCompanyName: false
        }
      })

      expect(
        screen.getByTestId('sourcing-request-shared-field')
      ).toHaveTextContent('No')
    })
  })
})
