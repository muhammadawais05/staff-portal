import React from 'react'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { UnlinkOpportunityCompanyRepresentativeInput } from '@staff-portal/graphql/staff'
import { Form } from '@toptal/picasso-forms'
import { Button } from '@toptal/picasso'

import { useUnlinkOpportunityCompanyRepresentative } from '../../data/unlink-opportunity-company-representative'

interface Props {
  opportunityId: string
  representativeId: string
  hideModal: () => void
}

export const UnlinkOpportunityForm = ({
  opportunityId,
  representativeId,
  hideModal
}: Props) => {
  const { handleSubmit, loading } =
    useUnlinkOpportunityCompanyRepresentative(hideModal)

  return (
    <ModalForm<UnlinkOpportunityCompanyRepresentativeInput>
      initialValues={{
        opportunityId,
        companyRepresentativeId: representativeId
      }}
      title='Unlink opportunity'
      onSubmit={handleSubmit}
    >
      <Modal.Content>
        <Form.Input
          label='Comment'
          name='comment'
          required
          width='full'
          multiline
          rows={4}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>
        <Form.SubmitButton variant='positive'>Unlink</Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}
