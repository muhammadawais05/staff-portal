import React, { useRef, useMemo } from 'react'
import { Option } from '@toptal/picasso/Select'
import { Form } from '@toptal/picasso-forms'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { FormCancelButton } from '@staff-portal/forms'
import { isMaxLength } from '@staff-portal/validators'
import { SourcerFragment } from '@staff-portal/talents'

import { useUpdateSourcingRequestSpecialist } from './hooks/use-update-sourcing-request-specialist'
import { TITLE } from '../../constants'
import { FormValues } from './types'

export interface Props {
  jobId: string
  sourcingRequestId?: string | null
  talentSpecialistId?: string | null
  talentSpecialistFullName?: string | null
  sourcers: SourcerFragment[]
  hideModal: () => void
}

const UpdateSourcingRequestSpecialistForm = ({
  jobId,
  sourcingRequestId,
  talentSpecialistId,
  talentSpecialistFullName,
  sourcers,
  hideModal
}: Props) => {
  const initialValues = useRef({ talentSpecialistId: talentSpecialistId || '' })
  const handleSubmit = useUpdateSourcingRequestSpecialist({
    sourcingRequestId,
    jobId,
    hideModal
  })

  const isTalentSpecialistOnSourcersList = useMemo(
    () =>
      talentSpecialistId &&
      sourcers &&
      sourcers.map(({ id }) => id).includes(talentSpecialistId),
    [talentSpecialistId, sourcers]
  )

  const options = useMemo(() => {
    if (sourcers) {
      const mappedSourcers: Option[] = sourcers.map(item => ({
        text: item.fullName,
        value: item.id
      }))

      if (
        talentSpecialistId &&
        talentSpecialistFullName &&
        !isTalentSpecialistOnSourcersList
      ) {
        mappedSourcers.push({
          text: talentSpecialistFullName,
          value: talentSpecialistId,
          disabled: true
        })

        mappedSourcers.sort(({ text: text1 }, { text: text2 }) =>
          text1.localeCompare(text2)
        )
      }

      return mappedSourcers
    }

    return []
  }, [
    sourcers,
    talentSpecialistId,
    talentSpecialistFullName,
    isTalentSpecialistOnSourcersList
  ])

  const validateForm = (values: FormValues) => {
    const errors: Partial<FormValues> = {}

    if (values.talentSpecialistId === talentSpecialistId) {
      errors.talentSpecialistId = 'You must change this value'
    }

    return errors
  }

  return (
    <ModalForm
      onSubmit={handleSubmit}
      title={TITLE}
      initialValues={initialValues.current}
      validate={validateForm}
    >
      <Modal.Content>
        <Form.Select
          required
          options={options}
          data-testid='sourcing-request-specialist-field'
          label='Talent Specialist'
          name='talentSpecialistId'
        />
        <Form.Input
          multiline
          rows={4}
          width='full'
          label='Comment'
          data-testid='sourcing-request-specialist-comment-field'
          name='comment'
          validate={isMaxLength}
        />
      </Modal.Content>
      <Modal.Actions>
        <FormCancelButton onClick={hideModal} />
        <Form.SubmitButton
          variant='positive'
          data-testid='sourcing-request-specialist-submit'
        >
          Assign
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default UpdateSourcingRequestSpecialistForm
