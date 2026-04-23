import React, { useCallback, useMemo } from 'react'
import { Button, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { isMaxLength } from '@staff-portal/validators'
import {
  TALENT_UPDATED,
  TalentApplicantSkillsSelector
} from '@staff-portal/talents'

import { GetApproveEnglishDataQuery } from '../../data/get-approve-english-data/get-approve-english-data.staff.gql.types'
import {
  ApproveEnglishStepDocument,
  ApproveEnglishStepMutation
} from '../../data/approve-english-step/approve-english-step.staff.gql.types'
import { RoleStepNextActionFragment } from '../../../../data'
import { ReassignScreeningStepCheckbox } from '../../../ReassignScreeningStepCheckbox'
import { extractFormSkills } from '../../utils'

interface FormData {
  comment: string
  applicantSkills: ({ id: string; name: string } | string)[]
  specializationId?: string
  reassign?: boolean
}

export interface Props {
  roleStep: NonNullable<GetApproveEnglishDataQuery['node']>
  onSuccess?: (nextAction: RoleStepNextActionFragment) => void
  hideModal: () => void
  talentId: string
}

const ApproveEnglishStepModalForm = ({
  roleStep: {
    id: roleStepId,
    englishApprovalRequiresSpecialization,
    claimer,
    talent: { applicantSkills, vertical }
  },
  onSuccess,
  hideModal,
  talentId
}: Props) => {
  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: ApproveEnglishStepDocument,
      mutationResultOptions: {
        isFormSubmit: true,
        successNotificationMessage:
          'The English Step was successfully approved.',
        onSuccessAction: mutationResult => {
          hideModal()
          onSuccess?.(
            mutationResult as NonNullable<
              ApproveEnglishStepMutation['approveEnglishRoleStep']
            >
          )
        },
        successMessageEmitOptions: {
          type: TALENT_UPDATED,
          payload: { talentId }
        }
      }
    })

  const handleSubmit = useCallback(
    async ({ applicantSkills: formApplicantSkills, ...restForm }: FormData) => {
      const { ids: applicantSkillIds, names: newApplicantSkillNames } =
        extractFormSkills(formApplicantSkills)

      return handleMutationSubmit({
        ...restForm,
        applicantSkillIds,
        newApplicantSkillNames,
        roleStepId
      })
    },
    [roleStepId, handleMutationSubmit]
  )

  const initialValues = useMemo(
    () => ({
      applicantSkills: applicantSkills?.nodes
    }),
    [applicantSkills]
  )

  const specializations = vertical?.specializations || { nodes: [] }

  const specializationOptions = useMemo(
    () =>
      specializations.nodes.map(({ id, title }) => ({
        text: title,
        value: id
      })),
    [specializations]
  )

  return (
    <ModalForm<FormData>
      onSubmit={handleSubmit}
      title='Approve English'
      initialValues={initialValues}
    >
      <Modal.Content>
        <Container bottom='medium'>
          <Typography size='medium'>
            Do you really want to approve the English step?
          </Typography>
        </Container>

        <TalentApplicantSkillsSelector
          required
          talentOrVerticalId={talentId}
          name='applicantSkills'
          label='Applicant Skills'
          width='full'
          placeholder='Select applicant skills from autocomplete'
        />

        {englishApprovalRequiresSpecialization && (
          <Form.Select
            label='Specialization'
            required
            name='specializationId'
            options={specializationOptions}
            placeholder='Please select a specialization'
          />
        )}

        <Form.Input
          required
          multiline
          rows={4}
          width='full'
          name='comment'
          label='Comment'
          validate={isMaxLength}
          autoFocus
        />

        <ReassignScreeningStepCheckbox
          claimer={claimer}
          roleStepId={roleStepId}
        />
      </Modal.Content>

      <Modal.Actions>
        <Button variant='secondary' onClick={hideModal} disabled={loading}>
          Cancel
        </Button>
        <Form.SubmitButton variant='positive' loading={loading}>
          Approve Step
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default ApproveEnglishStepModalForm
