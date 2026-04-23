import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { Button, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React, { useMemo } from 'react'
import { isMaxLength } from '@staff-portal/validators'
import { FormBaseErrorContainer } from '@staff-portal/forms'

import { ResumeTalentApplicationGenericModalContentProps } from '../types'
import { RestoreTalentActivationForm, ResumeTalentApplicationForm } from '.'

const ResumeTalentApplicationGenericModalContent = ({
  isResumeTalentApplicationModal,
  manualRestorationAvailable,
  eligibleForAutomaticRestore,
  specializations,
  specializationApplications,
  hideModal,
  onSubmit,
  loading,
  isSubmitting
}: ResumeTalentApplicationGenericModalContentProps) => {
  const specializationsList = useMemo(
    () =>
      specializations?.map(({ id, title }) => ({
        text: title,
        value: id
      })) ?? [],
    [specializations]
  )

  // Pick the last specialization application
  const initialSpecializationId = specializationApplications?.length
    ? specializationApplications[specializationApplications.length - 1].id
    : undefined

  const title = eligibleForAutomaticRestore
    ? 'Restore Application'
    : 'Restore Application (exceptional)'

  const submitButton = eligibleForAutomaticRestore
    ? 'Restore Application'
    : 'Exceptional Restoration'

  const formContent = (
    <>
      <Modal.Content>
        <FormBaseErrorContainer bottom='small' />

        <Container bottom='medium'>
          <Typography size='medium'>
            Do you really want to restore this application?
          </Typography>
        </Container>

        {!eligibleForAutomaticRestore && (
          <Container bottom='medium'>
            <Typography size='medium' weight='semibold'>
              WARNING: This talent was rejected more than 18 months ago!
            </Typography>
          </Container>
        )}

        {Boolean(specializationApplications?.length) && (
          <Form.Select
            label='Specialization'
            required
            width='full'
            name='specializationId'
            options={specializationsList}
          />
        )}

        <Form.Input
          required
          multiline
          rows={4}
          width='full'
          name='comment'
          label='Comment'
          placeholder='Please specify a reason.'
          validate={isMaxLength}
        />

        {isResumeTalentApplicationModal && manualRestorationAvailable && (
          <Form.Checkbox
            name='automatedActionAllowed'
            label='Automatically send MBP restoration email'
          />
        )}
      </Modal.Content>

      <Modal.Actions>
        <Button variant='secondary' disabled={isSubmitting} onClick={hideModal}>
          Cancel
        </Button>
        <Form.SubmitButton variant='positive'>{submitButton}</Form.SubmitButton>
      </Modal.Actions>
    </>
  )

  if (loading) {
    return <ModalSuspender />
  }

  return (
    <>
      <Modal.Title>{title}</Modal.Title>

      {isResumeTalentApplicationModal ? (
        <ResumeTalentApplicationForm
          initialSpecializationId={initialSpecializationId}
          onSubmit={onSubmit}
        >
          {formContent}
        </ResumeTalentApplicationForm>
      ) : (
        <RestoreTalentActivationForm
          initialSpecializationId={initialSpecializationId}
          onSubmit={onSubmit}
        >
          {formContent}
        </RestoreTalentActivationForm>
      )}
    </>
  )
}

export default ResumeTalentApplicationGenericModalContent
