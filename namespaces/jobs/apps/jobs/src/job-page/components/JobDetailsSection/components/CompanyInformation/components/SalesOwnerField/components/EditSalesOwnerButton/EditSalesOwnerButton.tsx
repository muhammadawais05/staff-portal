import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { SalesOwnerRelationship } from '@staff-portal/graphql/staff'
import { Operation, OperationType } from '@staff-portal/operations'

import EditSalesOwnerModal from '../EditSalesOwnerModal'
import { JobDetailsStaffFragment } from '../../../../data/get-job-company-data.staff.gql.types'

export interface Props {
  currentSalesOwner?: {
    owner: JobDetailsStaffFragment
    relationship: SalesOwnerRelationship
  } | null
  jobId: string
  operation: OperationType | undefined
}

const EditSalesOwnerButton = ({
  currentSalesOwner,
  jobId,
  operation
}: Props) => {
  const { showModal } = useModal(EditSalesOwnerModal, {
    currentSalesOwner: currentSalesOwner,
    jobId
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='secondary'
          aria-label='Edit'
          disabled={disabled}
          onClick={showModal}
          data-testid='edit-sales-owner-button'
        >
          Edit
        </Button>
      )}
    />
  )
}

export default EditSalesOwnerButton
