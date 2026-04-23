import React from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { SalesOwnerRelationship } from '@staff-portal/graphql/staff'
import { useMutation, useGetData } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import EditSalesOwnerModalContent from './EditSalesOwnerModalContent'

jest.mock('@staff-portal/data-layer-service')

const JOB_ID = 'job-id-1'
const currentSalesOwner = {
  owner: {
    id: 'sales-owner-id-1',
    fullName: 'Sales Owner 1',
    webResource: { url: 'the.sales.owner.url', text: 'sales owner' }
  },
  relationshipV2: SalesOwnerRelationship.AM
}
const mockUseGetData = useGetData as jest.Mock
const mockUseMutation = useMutation as jest.Mock

const arrangeTest = (
  relationship: SalesOwnerRelationship = SalesOwnerRelationship.AM
) => {
  window.Element.prototype.scrollIntoView = jest.fn()

  mockUseGetData.mockReturnValue(() => ({
    loading: false,
    data: {
      nodes: [
        {
          fullName: 'Sales Owner 1',
          id: 'sales-owner-id-1'
        },
        {
          fullName: 'Sales Owner 2',
          id: 'sales-owner-id-2'
        }
      ]
    }
  }))

  return render(
    <TestWrapper>
      <EditSalesOwnerModalContent
        jobId={JOB_ID}
        currentSalesOwner={{ ...currentSalesOwner, relationship }}
        hideModal={() => {}}
      />
    </TestWrapper>
  )
}

describe('EditSalesOwnerModalContent', () => {
  it('shows the success message after submit', async () => {
    mockUseMutation.mockReturnValue([
      () => ({
        data: {
          updateJobSalesOwner: {
            success: true,
            errors: []
          }
        }
      }),
      { loading: false }
    ])
    const { getByTestId, findByText, getByLabelText } = arrangeTest()

    fireEvent.click(
      getByTestId('edit-sales-owner-modal-content-confirm-button')
    )

    expect(await findByText('Please complete this field.')).toBeInTheDocument()

    fireEvent.change(getByLabelText(/Comment/), {
      target: { value: 'Some Comment' }
    })
    fireEvent.click(
      getByTestId('edit-sales-owner-modal-content-confirm-button')
    )

    expect(
      await findByText('The Sales Owner was successfully updated.')
    ).toBeInTheDocument()
  })

  it('shows the error message', async () => {
    mockUseMutation.mockImplementation(
      (_document, { onError }: { onError: () => void }) => [
        () => onError(),
        { loading: false }
      ]
    )
    const { getByLabelText, getByTestId } = arrangeTest()

    fireEvent.change(getByLabelText(/Comment/), {
      target: { value: 'Some Comment' }
    })
    fireEvent.click(
      getByTestId('edit-sales-owner-modal-content-confirm-button')
    )

    expect(
      await screen.findByText(
        'An error occurred, unable to update Sales Owner.'
      )
    ).toBeInTheDocument()
  })
})
