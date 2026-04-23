import React from 'react'
import { Button } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { RateChangeRequestTypeEnum } from '@staff-portal/graphql/staff'
import { NO_VALUE } from '@staff-portal/config'

import { RateChangeRequestFragment } from '../../data'
import { useCompleteRateChangeRequest } from './data/complete-rate-change-request'
import {
  RATE_CHANGE_REQUEST_SUCCESS_NOTIFICATION_MESSAGE_MAPPING,
  RATE_CHANGE_REQUEST_COMPLETE_ERROR_MESSAGE
} from '../../constants'
import {
  CompleteRateChangeRequestFormFields,
  CompleteRateChangeRequestForm,
  CompleteRateChangeRequestModalContent
} from './components'

type Props = Pick<
  RateChangeRequestFragment,
  | 'id'
  | 'requestTypeEnumValue'
  | 'currentRate'
  | 'desiredRate'
  | 'talentComment'
> & {
  hideModal: () => void
}

const CompleteRateChangeRequestModal = ({
  id,
  requestTypeEnumValue,
  currentRate,
  desiredRate,
  talentComment,
  hideModal
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [completeRateChangeRequest] = useCompleteRateChangeRequest({
    onError: () => showError(RATE_CHANGE_REQUEST_COMPLETE_ERROR_MESSAGE)
  })
  const isConsultation =
    requestTypeEnumValue === RateChangeRequestTypeEnum.CONSULTATION

  const handleSubmit = async (formData: CompleteRateChangeRequestForm) => {
    const {
      outcomeRate,
      claimerComment,
      talentFirstContactedDate,
      rateNegotiated,
      setRecommendedRateToProfile
    } = formData

    const successNotificationMessage = requestTypeEnumValue
      ? RATE_CHANGE_REQUEST_SUCCESS_NOTIFICATION_MESSAGE_MAPPING[
          requestTypeEnumValue
        ]
      : NO_VALUE

    const { data } = await completeRateChangeRequest({
      variables: {
        input: {
          outcomeRate,
          claimerComment,
          talentFirstContactedDate,
          rateNegotiated: rateNegotiated ?? false,
          rateChangeRequestId: id,
          setRecommendedRateToProfile: setRecommendedRateToProfile ?? false
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.completeRateChangeRequest,
      successNotificationMessage,
      onSuccessAction: () => {
        hideModal()
      }
    })
  }

  return (
    <Modal
      operationVariables={{
        nodeId: id,
        nodeType: NodeType.RATE_CHANGE_REQUEST,
        operationName: 'completeRateChangeRequest'
      }}
      onClose={hideModal}
      size='small'
      open
    >
      <ModalForm<CompleteRateChangeRequestForm>
        title={isConsultation ? 'Complete Consultation' : 'Rate Update'}
        onSubmit={handleSubmit}
      >
        <Modal.Content>
          <CompleteRateChangeRequestModalContent
            requestTypeEnumValue={requestTypeEnumValue}
            currentRate={currentRate}
            desiredRate={desiredRate}
            talentComment={talentComment}
          />
          <CompleteRateChangeRequestFormFields
            requestTypeEnumValue={requestTypeEnumValue}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button variant='secondary' onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton data-testid='button-complete'>
            {isConsultation ? 'Complete' : 'Save and Complete'}
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default CompleteRateChangeRequestModal
