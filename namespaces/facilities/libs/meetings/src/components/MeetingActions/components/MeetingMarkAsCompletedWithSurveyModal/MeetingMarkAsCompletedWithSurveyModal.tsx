import React from 'react'
import { Button, SelectOption } from '@toptal/picasso'
import { Form, useField } from '@toptal/picasso-forms'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import {
  CompleteMeetingWithSurveyInput,
  TalentObjectionSurveyReason
} from '@staff-portal/graphql/staff'
import { useGetCountries, CountryCityFields } from '@staff-portal/facilities'
import { useNotifications } from '@staff-portal/error-handling'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import { CompleteMeetingWithSurveyDocument } from './data'
import { REASON_OPTIONS } from './constants'

export interface Props {
  meetingId: string
  hideModal: () => void
}

const getReasonOptions = (): SelectOption[] => {
  return Object.entries(REASON_OPTIONS).map(([value, text]) => ({
    value,
    text
  }))
}

const CommentInput = () => {
  const {
    input: { value: reason }
  } = useField<TalentObjectionSurveyReason>('reason')

  const commentRequired = reason === TalentObjectionSurveyReason.OTHER

  return (
    <Form.Input
      name='comment'
      label='Comment'
      required={commentRequired}
      multiline
      rows={4}
      width='full'
    />
  )
}

const MeetingMarkAsCompletedWithSurveyModal = ({
  meetingId,
  hideModal
}: Props) => {
  const initialValues = { meetingId }
  const { showError } = useNotifications()
  const { countries = [], loading: countriesLoading } = useGetCountries({
    onError: () => {
      showError('Unable to load countries.')
    }
  })

  const { handleSubmit, loading: formSubmitting } = useModalFormChangeHandler({
    mutationDocument: CompleteMeetingWithSurveyDocument,
    mutationResultOptions: {
      onSuccessAction: hideModal,
      successNotificationMessage: 'Meeting was marked as "Completed"'
    }
  })

  const loading = countriesLoading || formSubmitting

  return (
    <Modal open onClose={hideModal} defaultTitle='Submit Survey'>
      <ModalForm<CompleteMeetingWithSurveyInput>
        initialValues={initialValues}
        title='Submit Survey'
        onSubmit={handleSubmit}
        operationVariables={{
          nodeId: meetingId,
          nodeType: NodeType.MEETING,
          operationName: 'completeMeetingWithSurvey'
        }}
      >
        <Modal.Content>
          <Form.Input type='hidden' name='meetingId' />
          <Form.Input type='hidden' name='placeId' />

          <CountryCityFields
            countries={countries}
            loading={countriesLoading}
            required
            cityRequired
            placeholder='Country'
            name='countryId'
            countryFieldLabel='Talent Location'
            cityFieldLabel=''
            cityNameFieldName='city'
            cityFieldName='city'
            placeIdFieldName='placeId'
            limit={250}
          />

          <Form.Select
            enableReset
            required
            name='reason'
            titleCase={false}
            label='What talent objections have you encountered during your sourcing call?'
            width='full'
            options={getReasonOptions()}
          />

          <CommentInput />
        </Modal.Content>
        <Modal.Actions>
          <Button variant='secondary' disabled={loading} onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton variant='positive' disabled={loading}>
            Done
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default MeetingMarkAsCompletedWithSurveyModal
