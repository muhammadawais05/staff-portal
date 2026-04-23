import React from 'react'
import {
  Modal,
  ModalForm,
  ModalComponentBaseProps
} from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

import { useGetAvailbilitySubscriptionModal } from './hooks/use-get-availbility-subscription-modal'
import { TalentAvailabilitySubscriptionFragment } from '../../data/talent-availability-subscription-fragment'

interface AvailabilitySubscriptionReasonForm {
  comment: string
}

export interface Props extends ModalComponentBaseProps {
  talentAvailabilitySubscription?: TalentAvailabilitySubscriptionFragment | null
  talentId: string
}

const AvailabilitySubscriptionReasonModal = ({
  hideModal,
  talentId,
  talentAvailabilitySubscription
}: Props) => {
  const { handleSubscriptionCommentModalSubmit, loading } =
    useGetAvailbilitySubscriptionModal({
      talentId,
      talentAvailabilitySubscription,
      hideModal
    })

  const comment = talentAvailabilitySubscription?.comment

  const initialValues = {
    comment: comment ?? ''
  }

  return (
    <Modal onClose={hideModal} open size='small'>
      <ModalForm<AvailabilitySubscriptionReasonForm>
        onSubmit={handleSubscriptionCommentModalSubmit}
        initialValues={initialValues}
        title={
          comment
            ? 'Subscription Comment'
            : 'Subscribe for Talent Availability Update'
        }
      >
        <Modal.Content>
          <Form.Input
            required
            multiline
            rows={4}
            width='full'
            label={comment ? '' : 'Subscription Comment'}
            placeholder='The comment will appear as a reminder inside the notification when you receive it'
            name='comment'
          />
        </Modal.Content>

        <Modal.Actions>
          <Button variant='secondary' disabled={loading} onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton variant='positive'>
            {comment ? 'Save' : 'Subscribe'}
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default AvailabilitySubscriptionReasonModal
