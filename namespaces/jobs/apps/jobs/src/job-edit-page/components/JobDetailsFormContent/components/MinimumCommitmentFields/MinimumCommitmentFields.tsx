import React from 'react'
import { Form, useField } from '@toptal/picasso-forms'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'
import { GridItemField, WrapWithTooltip } from '@staff-portal/ui'

import {
  COMMITMENT_FIELD,
  COMMITMENT_MINIMUM_HOURS_FIELD,
  COMMITMENT_COMMENT_FIELD,
  VERTICAL_ID_FIELD
} from '../../../../config'
import { JobEditFormValues } from '../../../../types'
import {
  useGetCommitmentHoursOptions,
  useGetCommitmentSettingsApplicable
} from './data'

const MinimumCommitmentFields = () => {
  const {
    input: { value: verticalId }
  } = useField<JobEditFormValues[typeof VERTICAL_ID_FIELD]>(VERTICAL_ID_FIELD, {
    subscription: { value: true }
  })
  const {
    input: { value: commitment }
  } = useField<JobEditFormValues[typeof COMMITMENT_FIELD]>(COMMITMENT_FIELD, {
    subscription: { value: true }
  })

  const hourlyCommitment = commitment === EngagementCommitmentEnum.HOURLY
  const { commitmentSettingsApplicable } = useGetCommitmentSettingsApplicable(
    verticalId,
    !hourlyCommitment
  )
  const { commitmentHoursOptions, loading } = useGetCommitmentHoursOptions(
    !commitmentSettingsApplicable
  )

  if (!commitmentSettingsApplicable) {
    return null
  }

  return (
    <>
      <GridItemField
        label='Minimum Commitment'
        labelFor={COMMITMENT_MINIMUM_HOURS_FIELD}
        required
        size='small'
      >
        <WrapWithTooltip
          enableTooltip
          content='Minimum Commitment is a fee charged to the client when a billing cycle has less than 5 hrs/week logged for an hourly engagement. It’s different from the Estimated Weekly Hours, which is an estimate for the weekly workload.'
          inline={false}
        >
          <Form.Select
            id={COMMITMENT_MINIMUM_HOURS_FIELD}
            name={COMMITMENT_MINIMUM_HOURS_FIELD}
            options={commitmentHoursOptions}
            loading={loading}
            width='full'
            hint='hours per week'
            required
          />
        </WrapWithTooltip>
      </GridItemField>

      <GridItemField
        label='Minimum Commitment Change Reason'
        labelFor={COMMITMENT_COMMENT_FIELD}
        size='medium'
      >
        <Form.Input
          id={COMMITMENT_COMMENT_FIELD}
          name={COMMITMENT_COMMENT_FIELD}
          rows={5}
          maxRows={25}
          width='full'
          multiline
        />
      </GridItemField>
    </>
  )
}

export default MinimumCommitmentFields
