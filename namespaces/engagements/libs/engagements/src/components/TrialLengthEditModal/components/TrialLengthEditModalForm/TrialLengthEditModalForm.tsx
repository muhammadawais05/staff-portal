import React, { useCallback, useMemo } from 'react'
import { Form as PicassoForm, Typography } from '@toptal/picasso'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'
import { Form } from '@toptal/picasso-forms'
import { isMaxLength } from '@staff-portal/validators'
import { Modal } from '@staff-portal/modals-service'
import { useGetCurrentUser } from '@staff-portal/current-user'

import { getOptions } from '../../utils'
import {
  ChangeEngagementTrialLengthDocument,
  useGetEngagementTrialLength
} from '../../data'
import { ENGAGEMENT_TALENT_UPDATED } from '../../../../messages'

export type Props = {
  engagementId: string
  hideModal: () => void
}

export type TrialLengthEditForm = {
  trialLength: number
  comment: string
}

const dataTestIds = {
  submitButton: 'TrialLengthEditModal-submit-button'
}

const TrialLengthEditModalForm = ({ engagementId, hideModal }: Props) => {
  const currentUser = useGetCurrentUser()
  const { trialLength, startDate, maxEngagementTrialLength, loading } =
    useGetEngagementTrialLength(engagementId)

  const options = useMemo(
    () =>
      getOptions({
        maxEngagementTrialLength,
        timeZone: currentUser?.timeZone?.value,
        startDate
      }),
    [maxEngagementTrialLength, currentUser, startDate]
  )
  const foundValue = options.find(({ value }) => value === trialLength)?.value
  const trialLengthInitialValue = Number.isInteger(foundValue)
    ? foundValue
    : options.length
    ? options[0].value
    : undefined

  const initialValues = useMemo(
    () => ({
      trialLength: trialLengthInitialValue
    }),
    [trialLengthInitialValue]
  )

  const adjustFormValues = useCallback(
    (formValues: TrialLengthEditForm) => ({
      ...formValues,
      engagementId
    }),
    [engagementId]
  )

  return (
    <Modal.ActionForm
      title='Change Trial Length'
      submitText='Change Trial Length'
      onClose={hideModal}
      data-testid='TrialLengthEdit-modal'
      initialLoading={loading}
      initialValues={initialValues}
      mutation={{
        document: ChangeEngagementTrialLengthDocument,
        successMessage: 'The Trial Length was successfully changed.',
        successMessageEmitOptions: {
          type: ENGAGEMENT_TALENT_UPDATED,
          payload: { engagementId }
        }
      }}
      adjustFormValues={adjustFormValues}
      testIds={dataTestIds}
    >
      <PicassoForm.Field>
        <PicassoForm.Label>Start date</PicassoForm.Label>
        <Typography color='inherit' size='medium' weight='semibold'>
          {parseAndFormatDate(startDate) || 'Not set'}
        </Typography>
      </PicassoForm.Field>

      <Form.Select
        required
        label='Trial length'
        name='trialLength'
        width='full'
        options={options}
        data-testid='TrialLengthEditModal-trial-length'
      />

      <Form.Input
        required
        multiline
        rows={4}
        width='full'
        name='comment'
        label='Reason'
        validate={isMaxLength}
        data-testid='TrialLengthEditModal-comment'
      />
    </Modal.ActionForm>
  )
}

export default TrialLengthEditModalForm
