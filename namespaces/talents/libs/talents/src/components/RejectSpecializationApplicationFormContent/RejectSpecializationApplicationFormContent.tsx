import React, { useMemo } from 'react'
import { Form, useField } from '@toptal/picasso-forms'
import { Container, SelectOption, Typography } from '@toptal/picasso'
import { SpecializationApplicationRejectionReasonInput as RejectionReason } from '@staff-portal/graphql/staff'
import { FormDatePickerWrapper } from '@staff-portal/forms'

import { REJECTION_REASON_INPUT_MAPPING } from '../../constants'
import * as S from './styles'

const rejectionReasonOptions: SelectOption[] = Object.entries(
  REJECTION_REASON_INPUT_MAPPING
).map(([value, text]) => ({ text, value }))

type Props = {
  talentCanBeRejected: boolean
  cancelableMeetings?: { subject: string }[]
}

const RejectSpecializationApplicationFormContent = ({
  talentCanBeRejected,
  cancelableMeetings
}: Props) => {
  const {
    input: { value: rejectionReasonValue }
  } = useField('rejectionReason')
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const minDate = useMemo(() => new Date(), [])

  return (
    <>
      <Form.Select
        options={rejectionReasonOptions}
        data-testid='rejection-reason-field'
        name='rejectionReason'
        label='Rejection reason'
        searchThreshold={rejectionReasonOptions.length * 2}
        required
      />

      {rejectionReasonValue === RejectionReason.OTHER && (
        <Form.Input
          data-testid='comment-field'
          name='comment'
          label='Comment'
          placeholder='Please specify a reason.'
          width='full'
          required
          multiline
          rows={4}
        />
      )}

      {talentCanBeRejected && (
        <>
          <Form.Checkbox
            data-testid='eligible-for-restoration-field'
            name='eligibleForRestoration'
            label='Eligible for restoration'
          />
          <FormDatePickerWrapper
            data-testid='reapplication-date-field'
            name='reapplicationDate'
            label='Reapplication date'
            minDate={minDate}
            width='full'
          />
        </>
      )}

      {cancelableMeetings && Boolean(cancelableMeetings.length) && (
        <Container top='medium'>
          <Form.Checkbox
            data-testid='cancel-meetings-field'
            name='cancelMeetings'
            label={
              <Container>
                <Typography>Cancel scheduled interview:</Typography>
                <Typography>
                  {cancelableMeetings.map(({ subject }) => subject).join(', ')}
                </Typography>
              </Container>
            }
            css={S.cancelableMeetingsCheckbox}
          />
        </Container>
      )}
    </>
  )
}

export default RejectSpecializationApplicationFormContent
