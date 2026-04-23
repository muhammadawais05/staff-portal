import React from 'react'
import { render } from '@testing-library/react'
import {
  OperationCallableTypes,
  SalesOwnerRelationship
} from '@staff-portal/graphql/staff'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { OperationType } from '@staff-portal/operations'
import { NO_VALUE } from '@staff-portal/config'

import SalesOwnerField from './SalesOwnerField'
import { SALES_OWNER_RELATIONSHIP_MAPPING } from '../../../../config'
import { JobDetailsStaffFragment } from '../../data/get-job-company-data.staff.gql.types'

jest.mock('@staff-portal/data-layer-service')

jest.mock('./components/EditSalesOwnerButton', () => () => (
  <div data-testid='edit-sales-owner-button'></div>
))
const mockUseGetNode = useGetNode as jest.Mock

const JOB_ID = 'job-id-1'

const salesOwnerData = {
  owner: {
    id: 'sales-owner-id',
    fullName: 'Sales Owner',
    webResource: { url: 'the.sales.owner.url', text: 'sales owner' }
  },
  relationship: SalesOwnerRelationship.AM
}
const OPERATION = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

const arrangeTest = ({
  currentSalesOwner,
  operation = OPERATION
}: {
  currentSalesOwner?: {
    owner?: JobDetailsStaffFragment
    relationship?: SalesOwnerRelationship
  }
  operation?: OperationType
}) => {
  mockUseGetNode.mockReturnValue(() => ({
    loading: false,
    data: {
      currentSalesOwner,
      operations: { updateJobSalesOwner: operation }
    }
  }))

  return render(
    <TestWrapper>
      <SalesOwnerField jobId={JOB_ID} />
    </TestWrapper>
  )
}

describe('SalesOwnerField', () => {
  it('shows the button and sales owner info', () => {
    const { getByTestId, getByText } = arrangeTest({
      currentSalesOwner: salesOwnerData
    })

    expect(getByTestId('edit-sales-owner-button')).toBeInTheDocument()
    const label = `${salesOwnerData.owner.webResource.text} (${
      SALES_OWNER_RELATIONSHIP_MAPPING[
        salesOwnerData.relationship as SalesOwnerRelationship
      ]
    })`

    expect(getByText(label)).toBeInTheDocument()
  })

  it('shows a dash and the button when no sales owner', () => {
    const { getByTestId, getByText } = arrangeTest({})

    expect(getByTestId('edit-sales-owner-button')).toBeInTheDocument()

    expect(getByText(NO_VALUE)).toBeInTheDocument()
  })
  it('shows a dash when relationship is ROLE_REMOVED', () => {
    const { getByTestId, getByText } = arrangeTest({
      currentSalesOwner: {
        ...salesOwnerData,
        ...{ relationship: SalesOwnerRelationship.ROLE_REMOVED }
      }
    })

    expect(getByTestId('edit-sales-owner-button')).toBeInTheDocument()

    expect(getByText(NO_VALUE)).toBeInTheDocument()
  })
})
