import React, { ChangeEvent, useState } from 'react'
import { Form, useForm, useFormState } from '@toptal/picasso-forms'
import { isMaxLength } from '@staff-portal/validators'

import { AvailabilityRequestInitialJobData } from '../../types'
import FormCompanyAutocomplete from '../FormCompanyAutocomplete'
import FormJobSelection from '../FormJobSelection'
import { useGetTalentAvailabilityRequest } from './data'
import { RequestAvailabilityFormAlert } from './components'

interface RequestAvailabilityFormValues {
  jobId: string
  clientId: string
  comment: string
}

interface Props {
  talentId: string
  initialJobData?: AvailabilityRequestInitialJobData
}

const REASONS_FOR_OVERRIDE = [
  'Talent is a perfect match for the job',
  'Lack of supply',
  'Previous application is outdated',
  'Other'
]

const REASON_FOR_OVERRIDE_OPTIONS = REASONS_FOR_OVERRIDE.map(reason => ({
  text: reason,
  value: reason
}))

const TALENT_COMMENT_HINT_TEXT =
  'Let the talent know why they should consider this job. Minimum 100 characters'

const RequestAvailabilityForm = ({ talentId, initialJobData }: Props) => {
  const [reasonForOverride, setReasonForOverride] = useState<string>()

  const {
    values: { clientId, jobId }
  } = useFormState<RequestAvailabilityFormValues>()

  const { change } = useForm()

  const { data, loading } = useGetTalentAvailabilityRequest({
    talentId,
    clientId
  })

  const selectedAvailabilityRequest =
    data?.node?.jobAvailabilityRequests?.edges?.find(
      ({ job: { id } }) => id === jobId
    )

  const hasRestrictionWarning = Boolean(
    selectedAvailabilityRequest?.restrictionWarning
  )

  const handleOnChange = (event: ChangeEvent<{ value?: string }>) => {
    const selectedValue = event.target.value

    if (selectedValue !== reasonForOverride) {
      setReasonForOverride(selectedValue)
      change('yourReasonForOverride', null)
    }
  }

  return (
    <>
      <RequestAvailabilityFormAlert
        restrictionWarning={selectedAvailabilityRequest?.restrictionWarning}
      />

      <FormCompanyAutocomplete
        name='clientId'
        width='full'
        label='Company'
        loading={loading}
        initialValue={initialJobData?.client.id}
        initialDisplayValue={initialJobData?.client.fullName}
        required
        testIds={{
          input: 'company-autocomplete'
        }}
      />

      {data?.node?.jobAvailabilityRequests && (
        <FormJobSelection
          talentType={data.node.type}
          jobAvailabilityRequests={data.node.jobAvailabilityRequests.edges}
          initialValue={initialJobData?.jobId}
        />
      )}

      <Form.Input
        required={hasRestrictionWarning}
        multiline
        rows={4}
        width='full'
        name='comment'
        label='Comment for Talent'
        validate={isMaxLength}
        data-testid='request-availability-comment-field'
        hint={hasRestrictionWarning ? TALENT_COMMENT_HINT_TEXT : ''}
      />

      {hasRestrictionWarning && (
        <Form.Select
          required
          label='Reason for Override'
          name='reasonForOverride'
          placeholder='Select ...'
          options={REASON_FOR_OVERRIDE_OPTIONS}
          onChange={handleOnChange}
          data-testid='reasonForOverrideSelection'
        />
      )}

      {reasonForOverride === REASON_FOR_OVERRIDE_OPTIONS[3].value && (
        <Form.Input
          required
          width='full'
          name='yourReasonForOverride'
          label='Your Reason for Override'
          validate={isMaxLength}
          data-testid='yourReasonForOverride'
        />
      )}
    </>
  )
}

export default RequestAvailabilityForm
