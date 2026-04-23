import React from 'react'
import { Modal, ModalForm, ModalSuspender } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { Form, FormSpy } from '@toptal/picasso-forms'
import {
  SalesOwnerRelationship,
  UpdateJobSalesOwnerInput,
  SalesOwnerRelationshipToUpdate
} from '@staff-portal/graphql/staff'

import useEditSalesOwnerModal from './hooks/use-edit-sales-owner-modal'
import { JobDetailsStaffFragment } from '../../../../data/get-job-company-data.staff.gql.types'
import { MODAL_TITLE } from '../EditSalesOwnerModal'

type Props = {
  hideModal: () => void
  currentSalesOwner?: {
    owner?: JobDetailsStaffFragment
    relationship?: SalesOwnerRelationship
  } | null
  jobId: string
}

const EditSalesOwnerModalContent = ({
  hideModal,
  currentSalesOwner,
  jobId
}: Props) => {
  const {
    loadingData,
    loadingMutation,
    handleSubmit,
    relationshipOptions,
    salesOwnersOptions
  } = useEditSalesOwnerModal({ jobId, currentSalesOwner, hideModal })

  if (loadingData) {
    return <ModalSuspender />
  }

  return (
    <ModalForm<UpdateJobSalesOwnerInput>
      initialValues={{
        salesOwnerId: currentSalesOwner?.owner?.id,
        relationshipV2:
          currentSalesOwner?.relationship !==
          SalesOwnerRelationship.ROLE_REMOVED
            ? (currentSalesOwner?.relationship as unknown as SalesOwnerRelationshipToUpdate)
            : undefined
      }}
      onSubmit={handleSubmit}
      title={MODAL_TITLE}
    >
      <Modal.Content>
        <Form.Select
          enableReset
          required
          label='Relationship'
          name='relationshipV2'
          width='full'
          options={relationshipOptions}
          data-testid='edit-sales-owner-modal-content-select-relationship'
          placeholder='Please select relationship'
        />
        <FormSpy<UpdateJobSalesOwnerInput>>
          {({ values: { relationship } }) =>
            relationship !== SalesOwnerRelationship.ROLE_REMOVED && (
              <Form.Select
                enableReset
                required
                label='Sales Owner'
                name='salesOwnerId'
                width='full'
                options={salesOwnersOptions}
                data-testid='edit-sales-owner-modal-content-select-salesOwner'
                placeholder='Please select Sales Owner'
              />
            )
          }
        </FormSpy>

        <Form.Input
          label='Comment'
          name='comment'
          width='full'
          required
          multiline
          rows={4}
          data-testid='edit-sales-owner-modal-content-comment'
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          variant='secondary'
          disabled={loadingMutation}
          onClick={hideModal}
        >
          Cancel
        </Button>
        <Form.SubmitButton
          variant='positive'
          data-testid='edit-sales-owner-modal-content-confirm-button'
        >
          Reassign Sales Owner
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default EditSalesOwnerModalContent
