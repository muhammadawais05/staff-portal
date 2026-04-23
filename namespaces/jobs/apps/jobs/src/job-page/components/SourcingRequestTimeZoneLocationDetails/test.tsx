import React from 'react'
import { screen, render } from '@testing-library/react'
import {
  SourcingRequestStatus,
  OperationCallableTypes,
  JobWorkType,
  SourcingRequestWhoCoversTravelCosts
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetNode } from '@staff-portal/data-layer-service'

import SourcingRequestTimeZoneLocationDetails from './SourcingRequestTimeZoneLocationDetails'

jest.mock('@staff-portal/engagements', () => ({
  ENGAGEMENT_UPDATED: 'ENGAGEMENT_UPDATED'
}))
jest.mock('@staff-portal/data-layer-service')

const useGetNodeMock = useGetNode as jest.Mock

const MOCK_SOURCING_REQUEST = {
  id: 'test-sourcing-request-id',
  status: SourcingRequestStatus.DRAFTED,
  operations: {
    updateSourcingRequestStatus: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    updateSourcingRequestTalentSpecialist: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  }
}

const arrangeTest = (props: any) => {
  useGetNodeMock.mockReturnValue(() => {
    return {
      data: {
        ...props,
        sourcingRequest: {
          ...MOCK_SOURCING_REQUEST,
          ...props.sourcingRequest
        }
      }
    }
  })

  return render(
    <TestWrapper>
      <SourcingRequestTimeZoneLocationDetails jobId='some-job-id' />
    </TestWrapper>
  )
}

describe('SourcingRequestPositionDetails', () => {
  it('renders sourcing request details', () => {
    const ON_SITE_LOCATION_TEXT = 'On-Site Location Text'
    const ON_SITE_DURATION_TEXT = 'On-Site Location Text'
    const WHO_COVERS_TRAVEL_COSTS_COMMENT = 'Who Covers Travels Cost Comment'
    const TIME_ZONE_PREFERENCE = {
      name: '',
      value: ''
    }

    const props = {
      workType: JobWorkType.ONSITE,
      sourcingRequest: {
        onSiteLocation: ON_SITE_LOCATION_TEXT,
        onSiteDuration: ON_SITE_DURATION_TEXT,
        timeZonePreference: TIME_ZONE_PREFERENCE,
        whoCoversTravelCosts: SourcingRequestWhoCoversTravelCosts.CLIENT,
        whoCoversTravelCostsComment: WHO_COVERS_TRAVEL_COSTS_COMMENT,
        citizenshipRequirements: true
      }
    }

    arrangeTest(props)

    expect(screen.getByText(ON_SITE_LOCATION_TEXT)).toBeInTheDocument()
    expect(screen.getByText(ON_SITE_DURATION_TEXT)).toBeInTheDocument()
    expect(screen.getByTestId('who-covers-travel-costs')).toHaveTextContent(
      'Client'
    )
    expect(
      screen.queryByText(WHO_COVERS_TRAVEL_COSTS_COMMENT, { exact: false })
    ).toBeInTheDocument()
    expect(screen.getByTestId('citizenship-requirements')).toHaveTextContent(
      'Yes'
    )
  })

  it('hides On-Site Duration field when JobWorkType is not MIXED', () => {
    arrangeTest({ workType: JobWorkType.ONSITE })

    expect(screen.queryByText('On-Site Duration')).not.toBeInTheDocument()
  })

  it('shows Requires Update on fields that requires update', () => {
    arrangeTest({
      workType: JobWorkType.MIXED,
      sourcingRequest: {
        onSiteLocation: null,
        onSiteDuration: null,
        timeZonePreference: null,
        whoCoversTravelCosts: null,
        whoCoversTravelCostsComment: null
      }
    })

    expect(
      screen.getByTestId('onsite-location-requires-update')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('onsite-duration-requires-update')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('who-covers-travel-costs-requires-update')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('client-prefer-timezone-requires-update')
    ).toBeInTheDocument()
  })
})
