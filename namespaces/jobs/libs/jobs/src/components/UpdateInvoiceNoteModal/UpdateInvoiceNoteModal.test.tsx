import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import UpdateInvoiceNoteModal from '../../components/UpdateInvoiceNoteModal'
import { createJobListItemFragment } from '../JobListItem/data/job-list-item-fragment/mocks'
import { JobListItemFragment } from '../JobListItem/data/job-list-item-fragment'

const arrangeTest = (job: JobListItemFragment) =>
  render(
    <TestWrapperWithMocks>
      <UpdateInvoiceNoteModal job={job} />
    </TestWrapperWithMocks>
  )

const operations = (state: OperationCallableTypes) => {
  return {
    operations: {
      editJobInvoiceNote: {
        callable: state,
        messages: []
      },
      approveJob: {
        callable: OperationCallableTypes.DISABLED,
        messages: ['Not enabled']
      }
    }
  }
}

describe('UpdateInvoiceNoteModal', () => {
  const editButton = () => {
    return screen.queryByTestId('update-invoice-note-modal-edit-button')
  }

  it('shows Edit button when updating is ENABLED', () => {
    arrangeTest(createJobListItemFragment())

    expect(editButton()).toBeInTheDocument()
  })

  it('hides Edit button when operation is DISABLED', () => {
    arrangeTest(
      createJobListItemFragment(operations(OperationCallableTypes.DISABLED))
    )

    expect(editButton()).not.toBeInTheDocument()
  })

  it('hides Edit button when operation is HIDDEN', () => {
    arrangeTest(
      createJobListItemFragment(operations(OperationCallableTypes.HIDDEN))
    )

    expect(editButton()).not.toBeInTheDocument()
  })
})
