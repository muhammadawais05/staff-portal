import { Modal, ModalForm, ModalSuspender } from '@staff-portal/modals-service'
import { Button, Container, Typography } from '@toptal/picasso'
import {
  Form as PicassoForm,
  FormApi,
  SubmissionErrors
} from '@toptal/picasso-forms'
import { isString, useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import React, { useMemo, useState } from 'react'
import {
  ApplyTalentToAnotherVerticalInput,
  ScreeningStep
} from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'
import {
  concatUnexpectedValidationErrors,
  useHandleMutationResult
} from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED, TalentVerticalFragment } from '@staff-portal/talents'
import { useCustomStatusMessagesContext } from '@staff-portal/page-wrapper'
import { getRoleTypeText } from '@staff-portal/facilities'

import { useGetApplyToDifferentVerticalSteps } from '../../data/get-apply-to-different-vertical-steps'
import { getVerticalById } from '../../../../utils'
import ApplicantSkillsSelector from '../../../ApplicantSkillsSelector'
import { SKIP_ENGLISH_STEP_WARNING_MESSAGE_ID } from '../../constants'
import { useApplyTalentToAnotherVertical } from '../../data/apply-talent-to-another-vertical'
import { FormValues } from '../../types'
import ApplyToDifferentVerticalModalSteps from '../ApplyToDifferentVerticalModalSteps'
import {
  getStepsInitialValues,
  getVerticalOptions,
  prepareFieldsForMutation
} from './utils'

export interface Props {
  talentId: string
  fullName: string
  type: string
  verticals: TalentVerticalFragment[]
  hideModal: () => void
}

const ApplyToDifferentVerticalModal = ({
  talentId,
  fullName,
  type,
  verticals,
  hideModal
}: Props) => {
  const { showError } = useNotifications()
  const [showStatusMessageWarning, setShowStatusMessageWarning] =
    useState(false)
  const { addStatusMessage, removeStatusMessage } =
    useCustomStatusMessagesContext()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()
  const { data: completedeData, loading: completedDataLoading } =
    useGetApplyToDifferentVerticalSteps({
      talentId,
      onError: () => showError('Unable to load vertical steps.')
    })

  const steps = useMemo(
    () => ({
      completedScreeningSteps: completedeData?.completedScreeningSteps,
      completedProfileWizardSteps: completedeData?.completedProfileWizardSteps,
      completedProfileFields: completedeData?.completedProfileFields
    }),
    [completedeData]
  )

  const initialValues = useMemo(() => getStepsInitialValues(steps), [steps])

  const [applyTalentToAnotherVertical, { loading: mutationLoading }] =
    useApplyTalentToAnotherVertical({
      onCompleted: mutationData => {
        if (mutationData?.applyTalentToAnotherVertical?.success) {
          emitMessage(TALENT_UPDATED, { talentId })
          if (showStatusMessageWarning) {
            addStatusMessage({
              id: SKIP_ENGLISH_STEP_WARNING_MESSAGE_ID,
              content: `You have opted to skip processing English step.
              Therefore you must ensure English screening step gets claimed,
              in order to start the screening process for the new vertical.`,
              variant: 'yellow',
              handleOnClose: () =>
                removeStatusMessage(SKIP_ENGLISH_STEP_WARNING_MESSAGE_ID)
            })
          }
          hideModal()
        }
      },
      onError: () =>
        showError(
          'An error occurred, the talent was not applied to another vertical.'
        )
    })

  const handleSubmit = async (
    { newVerticalId, applicantSkillIds, ...values }: FormValues,
    _: FormApi<FormValues>,
    setSubmissionErrors: ((errors?: SubmissionErrors) => void) | undefined
  ) => {
    const skillIds: string[] = []
    const newApplicantSkillNames: string[] = []
    const profileFields = prepareFieldsForMutation(values.profileFields)
    const profileWizardSteps = prepareFieldsForMutation(
      values.profileWizardSteps
    )
    const screeningSteps = prepareFieldsForMutation(values.screeningSteps)

    applicantSkillIds.forEach(skill => {
      if (isString(skill)) {
        newApplicantSkillNames.push(skill)

        return
      }

      skillIds.push(skill.id)
    })

    const input: ApplyTalentToAnotherVerticalInput = {
      talentId,
      newVerticalId,
      applicantSkillIds: skillIds,
      newApplicantSkillNames,
      profileFields,
      profileWizardSteps,
      screeningSteps
    }

    if (!screeningSteps.includes(ScreeningStep.ENGLISH)) {
      setShowStatusMessageWarning(true)
    }

    const result = await applyTalentToAnotherVertical({
      variables: { input }
    })

    const newVertical = getVerticalById(newVerticalId, verticals)

    if (!newVertical) {
      return
    }

    const successNotificationMessage = `A new ${titleize(
      newVertical.talentType
    )} role has been created for ${fullName}.`

    const validationErrors = handleMutationResult({
      mutationResult: result?.data?.applyTalentToAnotherVertical,
      successNotificationMessage
    })

    if (validationErrors) {
      setSubmissionErrors?.(validationErrors)
      const unexpectedValidationErrors = concatUnexpectedValidationErrors(
        validationErrors as Record<string, string>,
        Object.keys(input)
      )

      if (unexpectedValidationErrors) {
        showError(unexpectedValidationErrors)
      }
    }
  }

  const options = getVerticalOptions(verticals)

  return (
    <Modal open onClose={hideModal} align='top'>
      {completedDataLoading && !completedeData ? (
        <ModalSuspender />
      ) : (
        <ModalForm<FormValues>
          onSubmit={handleSubmit}
          initialValues={initialValues}
          title='Apply This Talent Profile to a New Vertical'
        >
          <Modal.Content>
            <Container bottom='medium'>
              <Typography size='medium'>
                This action will create a role within a new vertical for this
                talent profile and approve selected application steps. With each
                approved step, the corresponding content from the current talent
                profile will be copied to the new vertical role.
              </Typography>
            </Container>
            <Container bottom='medium'>
              <Typography size='medium' data-testid='talent-name'>
                <Typography weight='semibold' as='span'>
                  Name:
                </Typography>{' '}
                {fullName}
              </Typography>
              <Typography size='medium' data-testid='talent-original-vertical'>
                <Typography weight='semibold' as='span'>
                  Original Vertical:
                </Typography>{' '}
                {getRoleTypeText(type)}
              </Typography>
            </Container>
            <PicassoForm.Select
              label='New Vertical'
              name='newVerticalId'
              required
              width='full'
              placeholder='Please select a vertical'
              options={options}
              data-testid='new-vertical-id-selector'
            />
            <ApplicantSkillsSelector />
            <Container top='medium' bottom='medium'>
              <ApplyToDifferentVerticalModalSteps steps={steps} />
            </Container>
          </Modal.Content>
          <Modal.Actions>
            <Button
              variant='secondary'
              disabled={mutationLoading}
              onClick={hideModal}
            >
              Cancel
            </Button>
            <PicassoForm.SubmitButton data-testid='apply-talent-button'>
              Apply
            </PicassoForm.SubmitButton>
          </Modal.Actions>
        </ModalForm>
      )}
    </Modal>
  )
}

export default ApplyToDifferentVerticalModal
