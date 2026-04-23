import React from 'react'
import { render } from '@testing-library/react'
import { useModal } from '@staff-portal/modals-service'
import {
  OperationCallableTypes,
  SalesOwnerRelationship
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import EditSalesOwnerButton from '.'
import EditSalesOwnerModal from '../EditSalesOwnerModal'

jest.mock('../EditSalesOwnerModal/EditSalesOwnerModal', () => ({
  __esModule: true,
  default: () => <div data-testid='edit-sales-owner-modal' />
}))
jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))
jest.mock('@staff-portal/operations/src/components/LazyOperation')

const showModal = jest.fn()
const useModalMock = useModal as jest.Mock

const JOB_ID = 'job-id-1'

const currentSalesOwner = {
  owner: {
    id: 'sales-owner-id',
    fullName: 'Sales Owner',
    webResource: { url: 'the.sales.owner.url', text: 'sales owner' }
  },
  relationship: SalesOwnerRelationship.AM
}

const OPERATION = {
  callable: OperationCallableTypes.ENABLED,
  messages: ['']
}

const arrangeTest = ({ operation } = { operation: OPERATION }) => {
  useModalMock.mockReturnValue({ showModal })

  return render(
    <TestWrapper>
      <EditSalesOwnerButton
        jobId={JOB_ID}
        currentSalesOwner={currentSalesOwner}
        operation={operation}
      />
    </TestWrapper>
  )
}

describe('Edit Sales Owner Button', () => {
  it('renders the button', () => {
    const { getByTestId } = arrangeTest()
    const button = getByTestId('edit-sales-owner-button')

    expect(button).toBeInTheDocument()
  })

  it('displays modal', () => {
    arrangeTest()

    expect(useModalMock).toHaveBeenCalledWith(
      EditSalesOwnerModal,
      expect.objectContaining({
        jobId: JOB_ID,
        currentSalesOwner
      })
    )
  })
})
