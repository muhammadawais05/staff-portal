import React, { useCallback, useMemo } from 'react'
import { Form as PicassoForm } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import { Operation } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { isNotNullish } from '@staff-portal/utils'
import { currencyInputFormatter } from '@staff-portal/forms'
import { Item } from '@toptal/picasso/TagSelector'
import { stringListToOptions } from '@staff-portal/string'

import { DraftJobFormFields } from '../../enums/DraftJobFormFields'
import { DraftJobFragment } from '../DraftJobSection/data/draft-job-fragment'
import { DefaultDraftJobFragment } from '../DraftJobSection/data/default-draft-job-fragment'
import {
  CreateSalesDraftJobMutation,
  useCreateSalesDraftJob
} from './data/create-sales-draft-job'
import {
  UpdateSalesDraftJobMutation,
  useUpdateSalesDraftJob
} from './data/update-sales-draft-job'
import {
  ActionType,
  BaseDraftJobFormType,
  BaseDraftJobFormTypeWithActionType,
  DefaultDraftJobFormType,
  DraftJobFormType
} from '../../types'
import {
  Field,
  FormActions,
  IndustryField,
  JobBudgetFields,
  JobProjectFields,
  PreferredHoursFields,
  RadioGroup,
  SkillsField,
  VerticalField
} from './components'
import { adjustFormData, applyHoursOverlap } from './utils'

export interface Props {
  clientId: string
  onRequestClose: (shouldShowClientApproveModal?: boolean) => void
  draftJob:
    | (DefaultDraftJobFragment & Partial<DraftJobFragment>)
    | DraftJobFragment
  approveClientOperation: Operation
}

// eslint-disable-next-line max-lines-per-function
const DraftJobForm = ({
  draftJob,
  draftJob: {
    budgetDetails,
    commitment,
    commitmentSurvey,
    description,
    estimatedLength,
    estimatedLengthSurvey,
    hasPreferredHours,
    hoursOverlap,
    id: draftJobId,
    industries,
    maxHourlyRate,
    projectSpecCompleteness,
    projectSpecCompletenessSurvey,
    projectTeamInvolved,
    projectTeamInvolvedSurvey,
    projectType,
    startDate,
    startDateSurvey,
    talentCount,
    talentCountSurvey,
    title,
    vertical: { id: verticalId },
    verticals,
    workingTimeFrom,
    workingTimeTo
  },
  clientId,
  onRequestClose,
  approveClientOperation
}: Props) => {
  const { handleMutationResult } = useHandleMutationResult()
  const { showError } = useNotifications()
  const displayErrorMessage = () => showError('Unable to save Draft Job.')

  const [createSalesDraftJob, { loading: isCreating }] = useCreateSalesDraftJob(
    {
      onCompleted: ({ createSalesDraftJob: result }) => {
        if (!result?.success && result?.errors) {
          displayErrorMessage()
        }
      },
      onError: () => {
        displayErrorMessage()
      }
    }
  )

  const [updateSalesDraftJob, { loading: isUpdating }] = useUpdateSalesDraftJob(
    {
      onCompleted: ({ updateSalesDraftJob: result }) => {
        if (!result?.success && result?.errors) {
          displayErrorMessage()
        }
      },
      onError: () => {
        displayErrorMessage()
      }
    }
  )

  const handleSubmit = (data: BaseDraftJobFormTypeWithActionType) => {
    const { action, hoursOverlap, hasPreferredHours, ...formData } = data

    const dataToSubmit = applyHoursOverlap(
      formData,
      hoursOverlap,
      hasPreferredHours
    )

    return draftJobId
      ? handleUpdate({ draftJobId, ...dataToSubmit })
      : handleCreate({ clientId, ...dataToSubmit }, action)
  }

  const handleDraftJobMutationResult = (
    mutationResult:
      | CreateSalesDraftJobMutation['createSalesDraftJob']
      | UpdateSalesDraftJobMutation['updateSalesDraftJob'],
    action?: ActionType
  ) =>
    handleMutationResult({
      mutationResult,
      successNotificationMessage: 'Draft Job was saved successfully.',
      onSuccessAction: () => onRequestClose(action === 'saveDraftJobAndApprove')
    })

  const handleUpdate = async (
    formData: DraftJobFormType & { draftJobId: string }
  ) => {
    const { data } = await updateSalesDraftJob({
      variables: {
        input: adjustFormData(formData)
      }
    })

    return handleDraftJobMutationResult(data?.updateSalesDraftJob)
  }

  const handleCreate = async (
    formData: DefaultDraftJobFormType,
    action: ActionType
  ) => {
    const { data } = await createSalesDraftJob({
      variables: {
        input: adjustFormData(formData)
      }
    })

    return handleDraftJobMutationResult(data?.createSalesDraftJob, action)
  }

  const getVerticalById = useCallback(
    (id: string) => verticals.edges.find(({ node }) => node.id === id),
    [verticals]
  )

  const timeZoneName =
    draftJob.timeZoneName ??
    (draftJob as DefaultDraftJobFragment).timeZone?.value

  const initialValues: BaseDraftJobFormType = useMemo(
    () => ({
      action: 'saveDraftJob',
      [DraftJobFormFields.BudgetDetails]: budgetDetails,
      [DraftJobFormFields.Commitment]: commitment,
      [DraftJobFormFields.Description]: description,
      [DraftJobFormFields.EstimatedLength]: estimatedLength,
      [DraftJobFormFields.HasPreferredHours]: hasPreferredHours
        ? 'true'
        : 'false',
      [DraftJobFormFields.Industries]:
        industries?.nodes?.map(({ id, name }) => ({
          value: id,
          text: name
        })) ?? [],
      [DraftJobFormFields.MaxHourlyRate]: isNotNullish(maxHourlyRate)
        ? currencyInputFormatter({ allowDecimals: false })(maxHourlyRate)
        : null,
      [DraftJobFormFields.ProjectSpecCompleteness]: projectSpecCompleteness,
      [DraftJobFormFields.ProjectTeamInvolved]: projectTeamInvolved,
      [DraftJobFormFields.ProjectType]: projectType,
      [DraftJobFormFields.Skills]: stringListToOptions(
        getVerticalById(verticalId)?.skillSets.nodes?.map(
          ({ skillName }) => skillName
        )
      ) as Item[],
      [DraftJobFormFields.StartDate]: startDate,
      [DraftJobFormFields.TalentCount]: talentCount?.toString() ?? null,
      [DraftJobFormFields.TimeZoneName]: timeZoneName,
      [DraftJobFormFields.Title]: title,
      [DraftJobFormFields.VerticalId]: verticalId,
      // clear workingTimeFrom/workingTimeTo for draft job that was saved with hasPreferredHours=false
      // backend sets these values to 00:00:00 - 24:00:00 in this case
      // but we want to force the user to enter own values
      [DraftJobFormFields.WorkingTimeFrom]: hasPreferredHours
        ? workingTimeFrom
        : null,
      [DraftJobFormFields.WorkingTimeTo]: hasPreferredHours
        ? workingTimeTo
        : null,
      [DraftJobFormFields.HoursOverlap]: hoursOverlap ?? null
    }),
    [
      budgetDetails,
      commitment,
      description,
      estimatedLength,
      getVerticalById,
      hasPreferredHours,
      hoursOverlap,
      industries,
      maxHourlyRate,
      projectSpecCompleteness,
      projectTeamInvolved,
      projectType,
      startDate,
      talentCount,
      timeZoneName,
      title,
      verticalId,
      workingTimeFrom,
      workingTimeTo
    ]
  )

  return (
    <PicassoForm<BaseDraftJobFormTypeWithActionType>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      destroyOnUnregister
    >
      <VerticalField verticals={verticals} />

      <Field label={talentCountSurvey.question} required>
        <RadioGroup
          name={DraftJobFormFields.TalentCount}
          required
          options={talentCountSurvey.options}
        />
      </Field>

      <Field label='Job Title'>
        <PicassoForm.Input
          name={DraftJobFormFields.Title}
          placeholder='Enter desired job title'
          width='full'
        />
      </Field>

      <JobProjectFields
        projectSpecCompletenessSurvey={projectSpecCompletenessSurvey}
      />

      <SkillsField verticals={verticals} />

      <IndustryField />

      <Field label='Job Description'>
        <PicassoForm.Input
          name='description'
          placeholder='Enter details about the Company, project requirements, goals that the Client wants to achieve, and any other required details'
          width='full'
          multiline
          rows={4}
        />
      </Field>

      <Field label={commitmentSurvey.question}>
        <RadioGroup name='commitment' options={commitmentSurvey.options} />
      </Field>

      <Field label={estimatedLengthSurvey.question}>
        <RadioGroup
          name='estimatedLength'
          options={estimatedLengthSurvey.options}
        />
      </Field>

      <Field label={startDateSurvey.question}>
        <RadioGroup name='startDate' options={startDateSurvey.options} />
      </Field>

      <JobBudgetFields />

      <Field label={projectTeamInvolvedSurvey.question}>
        <RadioGroup
          name='projectTeamInvolved'
          options={projectTeamInvolvedSurvey.options}
        />
      </Field>

      <PreferredHoursFields />

      <FormActions
        isCancelButtonDisabled={isCreating || isUpdating}
        onClose={onRequestClose}
        isSaveDraftJobAndApproveButtonHidden={Boolean(draftJobId)}
        approveClientOperation={approveClientOperation}
      />
    </PicassoForm>
  )
}

export default DraftJobForm
