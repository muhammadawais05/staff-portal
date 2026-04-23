import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { Modal, ModalForm, ModalSuspender } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'

import { useResetTalentSourcer } from '../../data/reset-talent-sourcer'
import { useChangeTalentSourcer } from '../../data/change-talent-sourcer'
import { useGetPossibleSourcers } from '../../data/get-possible-sourcers'

export const SUCCESS_NOTIFICATION_MESSAGE =
  'The sourcer has been successfully changed'

const FAILED_LISTING_POSSIBLE_SOURCERS =
  'Unable to get list of possible sourcers.'
const FAILED_UPDATING_SOURCER = 'Unable to change the talent sourcer.'

export interface Props {
  hideModal: () => void
  talentId: string
}

const ChangeSourcerModalContent = ({ hideModal, talentId }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const onUpdateSourcerError = () => {
    showError(FAILED_UPDATING_SOURCER)
  }

  const onListingPossibleSourcersError = () => {
    showError(FAILED_LISTING_POSSIBLE_SOURCERS)
  }

  const {
    loading: loadingPossibleSourcers,
    possibleSourcers,
    talentHasSourcer
  } = useGetPossibleSourcers({
    talentId,
    onError: onListingPossibleSourcersError,
    onCompleted: result => {
      if (!result?.node) {
        onListingPossibleSourcersError()
      }
    }
  })

  const [resetTalentSourcer, { loading: loadingReset }] = useResetTalentSourcer(
    {
      onCompleted: data => {
        if (data.resetTalentSourcer?.success) {
          emitMessage(TALENT_UPDATED, { talentId })
          hideModal()
        }
      },
      onError: onUpdateSourcerError
    }
  )

  const [changeTalentSourcer, { loading: loadingChange }] =
    useChangeTalentSourcer({
      onCompleted: data => {
        if (data.changeTalentSourcer?.success) {
          emitMessage(TALENT_UPDATED, { talentId })
          hideModal()
        }
      },
      onError: onUpdateSourcerError
    })

  const handleSubmit = async ({
    sourcer,
    comment
  }: {
    sourcer: string
    comment: string
  }) => {
    if (!sourcer) {
      const { data } = await resetTalentSourcer({
        variables: { input: { talentId, comment } }
      })

      return handleMutationResult({
        mutationResult: data?.resetTalentSourcer,
        successNotificationMessage: SUCCESS_NOTIFICATION_MESSAGE
      })
    }

    const { data } = await changeTalentSourcer({
      variables: { input: { talentId, sourcerId: sourcer, comment } }
    })

    return handleMutationResult({
      mutationResult: data?.changeTalentSourcer,
      successNotificationMessage: SUCCESS_NOTIFICATION_MESSAGE
    })
  }

  if (loadingPossibleSourcers) {
    return <ModalSuspender />
  }

  if (!possibleSourcers) {
    return null
  }

  return (
    <ModalForm onSubmit={handleSubmit} title='Change Sourcer'>
      <Modal.Content>
        <Form.Select
          data-testid='change-sourcer-modal-sourcer'
          width='full'
          label='Sourcer'
          name='sourcer'
          placeholder='Select from the list...'
          required={!talentHasSourcer}
          options={possibleSourcers.map(possibleSourcer => ({
            value: possibleSourcer.id,
            text: possibleSourcer.fullName
          }))}
        />
        <Form.Input
          required
          width='full'
          label='Comment'
          name='comment'
          multiline
          rows={4}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={hideModal}
          variant='secondary'
          disabled={loadingChange || loadingReset}
        >
          Cancel
        </Button>
        <Button
          type='submit'
          variant='positive'
          loading={loadingChange || loadingReset}
        >
          Reassign Sourcer
        </Button>
      </Modal.Actions>
    </ModalForm>
  )
}

export default ChangeSourcerModalContent
