import React from 'react'
import { screen, render } from '@testing-library/react'
import {
  SourcingRequestStatus,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetNode } from '@staff-portal/data-layer-service'
import { JobSourcingRequestFragment } from '@staff-portal/jobs'

import SourcingRequestDetails from './SourcingRequestDetails'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/engagements')

const useGetNodeMock = useGetNode as jest.Mock

const mockSourcingRequestStatusField = jest.fn()
const mockSourcingRequestSpecialistField = jest.fn()

jest.mock('@staff-portal/jobs-sourcing-requests', () => ({
  ...jest.requireActual('@staff-portal/jobs-sourcing-requests'),
  SourcingRequestStatusField: (props: unknown) => {
    mockSourcingRequestStatusField(props)

    return <div data-testid='sourcing-request-status-field' />
  },
  SourcingRequestSpecialistField: (props: unknown) => {
    mockSourcingRequestSpecialistField(props)

    return <div data-testid='sourcing-request-specialist-field' />
  }
}))

const arrangeTest = (props: Partial<JobSourcingRequestFragment> = {}) => {
  useGetNodeMock.mockReturnValue(() => {
    return {
      data: {
        id: 'job-id',
        sourcingRequest: {
          id: 'test-sourcing-request-id',
          status: SourcingRequestStatus.DRAFTED,
          noTalentHourlyRateLimit: false,
          ...props,
          operations: {
            updateSourcingRequestStatus: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            },
            updateSourcingRequestTalentSpecialist: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            },
            ...props.operations
          }
        }
      }
    }
  })

  render(
    <TestWrapper>
      <SourcingRequestDetails jobId='job-id' />
    </TestWrapper>
  )
}

describe('SourcingRequestDetails', () => {
  it('renders talent specialist field', () => {
    const sourcingRequest = {
      id: 'sourcing-request-id',
      talentSpecialist: {
        id: 'talent-specialist-id',
        fullName: 'John Doe',
        webResource: {
          url: 'https://google.com',
          text: ''
        }
      },
      operations: {
        updateSourcingRequestTalentSpecialist: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        updateSourcingRequestStatus: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      }
    }

    arrangeTest(sourcingRequest)

    expect(
      screen.getByTestId('sourcing-request-specialist-field')
    ).toBeInTheDocument()

    expect(mockSourcingRequestSpecialistField).toHaveBeenCalledWith(
      expect.objectContaining({
        jobId: 'job-id',
        talentSpecialistId: sourcingRequest.talentSpecialist.id,
        sourcingRequestId: sourcingRequest.id,
        talentSpecialistFullName: sourcingRequest.talentSpecialist.fullName,
        talentSpecialistUrl: sourcingRequest.talentSpecialist.webResource.url,
        operation:
          sourcingRequest.operations.updateSourcingRequestTalentSpecialist
      })
    )
  })

  it('renders status field', () => {
    const sourcingRequest = {
      id: 'sourcing-request-id',
      status: SourcingRequestStatus.ACTIVE_SOURCING,
      operations: {
        updateSourcingRequestTalentSpecialist: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        updateSourcingRequestStatus: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      }
    }

    arrangeTest(sourcingRequest)

    expect(
      screen.getByTestId('sourcing-request-status-field')
    ).toBeInTheDocument()

    expect(mockSourcingRequestStatusField).toHaveBeenCalledWith(
      expect.objectContaining({
        jobId: 'job-id',
        sourcingRequestId: sourcingRequest.id,
        sourcingRequestStatus: sourcingRequest.status,
        operation: sourcingRequest.operations.updateSourcingRequestStatus
      })
    )
  })

  it('renders sourcing request details fields', () => {
    const sourcingRequest = {
      clientPartner: {
        id: 'client-partner-id',
        fullName: 'Client Partner Name',
        webResource: { url: 'client-partner-url', text: '' }
      },

      salesClaimer: {
        id: 'sales-claimer-id',
        fullName: 'Sales Claimer Name',
        webResource: { url: 'sales-claimer-url', text: '' }
      }
    }

    arrangeTest(sourcingRequest)

    const clientPartnerLink = screen.getByText(
      (_, element) =>
        element?.textContent === sourcingRequest.clientPartner.fullName &&
        element?.tagName === 'A'
    )

    const salesClaimerLink = screen.getByText(
      (_, element) =>
        element?.textContent === sourcingRequest.salesClaimer.fullName &&
        element?.tagName === 'A'
    )

    expect(clientPartnerLink).toHaveAttribute(
      'href',
      sourcingRequest.clientPartner.webResource.url
    )

    expect(salesClaimerLink).toHaveAttribute(
      'href',
      sourcingRequest.salesClaimer.webResource.url
    )
  })
})
