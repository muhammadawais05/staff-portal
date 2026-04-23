import React, { useEffect, useMemo } from 'react'
import { Form, useField } from '@toptal/picasso-forms'
import { SelectOption } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { TalentInfractionAttachmentConnection } from '@staff-portal/graphql/staff'
import { FormDatePickerWrapper } from '@staff-portal/forms'

import {
  DETAILS_PLACEHOLDER,
  INFRACTION_REASON_OPTION_GROUPS,
  INFRACTION_STATUS_MAPPING
} from '../../constants'
import { useGetTalentEngagements } from '../../data'
import InfractionFormAttachments from '../InfractionFormAttachments'
import InfractionFormTalentAutocomplete from '../InfractionFormTalentAutocomplete'

const STATUS_OPTIONS = Object.entries(INFRACTION_STATUS_MAPPING).map(
  ([value, { text }]) => ({ value, text })
)

export interface Props {
  withTalentInput?: boolean
  editMode?: boolean
  assignees?: {
    id: string
    fullName: string
  }[]
  taskAssigneeId?: string
  attachments?: TalentInfractionAttachmentConnection
}

const TalentInfractionFormFields = ({
  withTalentInput = false,
  editMode = false,
  assignees,
  taskAssigneeId,
  attachments
}: Props) => {
  const { showError } = useNotifications()
  const {
    input: { value: talentId }
  } = useField('talentId')

  const {
    data: engagements,
    loading: engagementsLoading,
    error
  } = useGetTalentEngagements(talentId)

  useEffect(() => {
    if (error) {
      showError(error.message)
    }
  }, [error, showError])

  const maxDate = useMemo(() => new Date(), [])
  const talentHasEngagements = engagements && engagements.length > 0

  const engagementsList: SelectOption[] = useMemo(
    () =>
      engagements?.map(({ id, webResource }) => ({
        value: id,
        text: webResource.text
      })) || [],
    [engagements]
  )

  const assigneesList: SelectOption[] = useMemo(
    () =>
      assignees?.map(({ id, fullName }) => ({
        value: id,
        text: fullName
      })) || [],
    [assignees]
  )

  return (
    <>
      {editMode && (
        <>
          <Form.Select
            label='Status'
            data-testid='talent-infraction-form-fields-status'
            placeholder='Select status'
            name='status'
            options={STATUS_OPTIONS}
            required
          />
          <Form.Select
            label='Assignee'
            data-testid='talent-infraction-form-fields-assignee'
            placeholder='Select assignee'
            name='taskAssigneeId'
            initialValue={taskAssigneeId}
            enableReset
            options={assigneesList}
            loading={!assignees}
            required
          />
          <Form.Input
            label='Review'
            name='review'
            data-testid='talent-infraction-form-fields-review'
            enableReset
            width='full'
            multiline
            rows={10}
          />
        </>
      )}
      {!editMode && withTalentInput && (
        <InfractionFormTalentAutocomplete
          name='talentId'
          label='Talent'
          placeholder='Select talent'
          required
        />
      )}
      <Form.Input
        label='Summary'
        data-testid='talent-infraction-form-fields-summary'
        placeholder='Infraction summary'
        name='summary'
        required
        width='full'
      />
      <Form.Select
        label='Reason'
        data-testid='talent-infraction-form-fields-reason'
        placeholder='Select reason'
        name='reasonSlug'
        required
        options={INFRACTION_REASON_OPTION_GROUPS}
      />
      <FormDatePickerWrapper
        label='When occurred'
        data-testid='talent-infraction-form-fields-occurred-at'
        name='occurredAt'
        required
        width='full'
        maxDate={maxDate}
        placeholder='Select Date'
      />
      {((engagementsLoading && !withTalentInput) || talentHasEngagements) && (
        <Form.Select
          label='Link infraction with an engagement'
          placeholder='Search engagements'
          name='engagementId'
          enableReset
          options={engagementsList}
          loading={engagementsLoading}
        />
      )}
      <Form.Input
        label='Details'
        data-testid='talent-infraction-form-fields-details'
        placeholder={DETAILS_PLACEHOLDER}
        name='description'
        enableReset
        width='full'
        multiline
        rows={4}
      />
      {/* TODO: Use InfractionFormAttachments instead when multi-file attachment upload is supported by API. */}
      <InfractionFormAttachments attachments={attachments} />
    </>
  )
}

export default TalentInfractionFormFields
