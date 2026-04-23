import { Button, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import React, { useRef } from 'react'
import { Modal, ModalSuspender, ModalForm } from '@staff-portal/modals-service'
import {
  EngagementTalentSwapValuesEnum,
  FeedbackReasonActions,
  Scalars
} from '@staff-portal/graphql/staff'
import { useMutation, useQuery } from '@staff-portal/data-layer-service'
import { useNotifications } from '@staff-portal/error-handling'
import {
  getCurrentDateString,
  getDateString,
  parseAndFormatDate
} from '@staff-portal/date-time-utils'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { isMaxLength } from '@staff-portal/validators'
import {
  FormReasonSelectWithSubReason,
  GetFeedbackReasonsDocument
} from '@staff-portal/feedbacks'

import EngagementTalentSwap from '../EngagementTalentSwap'
import { TerminateEngagementDocument } from '../../data'
import { ENGAGEMENT_UPDATED } from '../../../../messages'

type FormValues = {
  endDate: Scalars['Date'] | null
  reasonId: string
  subReasonId?: string
  comment: string
  talentWasSwapped?: EngagementTalentSwapValuesEnum
}

export interface Props {
  engagementId: string
  title: string
  endDate?: Date
  onClose: () => void
}

const componentName = 'TerminateEngagementModal'

const TerminateEngagementModal = ({
  engagementId,
  title,
  endDate,
  onClose
}: Props) => {
  const { data: reasonData, loading: getDataLoading } = useQuery(
    GetFeedbackReasonsDocument,
    {
      variables: { action: FeedbackReasonActions.ENGAGEMENT_ENDED }
    }
  )

  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const initialValues = useRef<FormValues>({
    reasonId: '',
    comment: '',
    subReasonId: undefined,
    endDate: endDate ? getDateString(endDate) : getCurrentDateString()
  })

  const [terminateEngagement, { loading }] = useMutation(
    TerminateEngagementDocument,
    {
      onError: () =>
        showError('An error occurred, unable to terminate engagement.')
    }
  )

  const handleSubmit = async ({
    endDate: newEndDate,
    ...restProps
  }: FormValues) => {
    const { data } = await terminateEngagement({
      variables: {
        input: {
          engagementId,
          endDate: newEndDate ?? '',
          ...restProps
        }
      }
    })

    const successNotificationMessage = `The Job was successfully scheduled to end on ${parseAndFormatDate(
      newEndDate
    )}.`

    return handleMutationResult({
      mutationResult: data?.terminateEngagement,
      successNotificationMessage,
      onSuccessAction: () => {
        onClose()
        emitMessage(ENGAGEMENT_UPDATED, { engagementId })
      }
    })
  }

  if (getDataLoading || !reasonData) {
    return <ModalSuspender />
  }

  return (
    <ModalForm
      title={title}
      initialValues={initialValues.current}
      onSubmit={handleSubmit}
    >
      <Modal.Content>
        <Container bottom='medium'>
          <Typography size='medium'>
            Job will be either put on notice if ending date is in future, or
            closed right away if date is in the past.
          </Typography>
        </Container>

        <FormDatePickerWrapper
          required
          autoFocus
          name='endDate'
          label='End Date'
          width='full'
          data-testid={`${componentName}-date`}
        />

        <FormReasonSelectWithSubReason
          required
          width='full'
          name='reasonId'
          label='Reason'
          reasons={reasonData.feedbackReasons.nodes}
          data-testid={`${componentName}-reasonId`}
          subReasonProps={{
            name: 'subReasonId',
            width: 'full',
            required: true
          }}
        />

        <Form.Input
          required
          multiline
          rows={4}
          width='full'
          name='comment'
          data-testid={`${componentName}-details`}
          label='Please provide us with brief details'
          placeholder='Please briefly elaborate on your reasons for ending the job'
          titleCase={false}
          validate={isMaxLength}
        />

        <EngagementTalentSwap reasons={reasonData.feedbackReasons.nodes} />
      </Modal.Content>

      <Modal.Actions>
        <Button
          variant='secondary'
          onClick={onClose}
          disabled={loading}
          data-testid={`${componentName}-cancel-button`}
        >
          Cancel
        </Button>
        <Form.SubmitButton
          variant='negative'
          data-testid={`${componentName}-submit-button`}
        >
          {title}
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default TerminateEngagementModal
