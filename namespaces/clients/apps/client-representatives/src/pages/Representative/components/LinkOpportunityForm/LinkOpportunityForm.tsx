import React from 'react'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { LinkOpportunityCompanyRepresentativeInput } from '@staff-portal/graphql/staff'
import { Form } from '@toptal/picasso-forms'
import { Button } from '@toptal/picasso'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { OPPORTUNITY_LINKED } from '@staff-portal/clients'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'

import { LinkRepresentativeOpportunityDocument } from '../../data/link-representative-opportunity/link-representative-opportunity.staff.gql.types'

interface Props {
  representativeId: string
  hideModal: () => void
  opportunities: {
    text: string
    value: string
  }[]
}

export const LinkOpportunityForm = ({
  representativeId,
  hideModal,
  opportunities
}: Props) => {
  const emitMessage = useMessageEmitter()

  const { handleSubmit, loading } = useModalFormChangeHandler({
    mutationDocument: LinkRepresentativeOpportunityDocument,
    errorNotificationMessage:
      'An error occured, the opportunity was not linked.',
    mutationResultOptions: {
      successNotificationMessage: 'The opportunity was successfully linked.',
      onSuccessAction: () => {
        hideModal()
        emitMessage(OPPORTUNITY_LINKED, {
          representativeId
        })
      }
    }
  })

  return (
    <ModalForm<LinkOpportunityCompanyRepresentativeInput>
      initialValues={{
        companyRepresentativeId: representativeId
      }}
      title='Link opportunity'
      onSubmit={handleSubmit}
    >
      <Modal.Content>
        <Form.Select
          width='full'
          name='opportunityId'
          required
          label='Opportunity'
          options={opportunities}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>
        <Form.SubmitButton variant='positive'>Link</Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}
