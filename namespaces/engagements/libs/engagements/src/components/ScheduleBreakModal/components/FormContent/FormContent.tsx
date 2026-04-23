import { Form, useForm } from '@toptal/picasso-forms'
import { Maybe } from '@toptal/picasso/utils'
import React, { useEffect, useLayoutEffect } from 'react'
import {
  EngagementStatus,
  FeedbackReasonActions
} from '@staff-portal/graphql/staff'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { FormReasonSelect } from '@staff-portal/feedbacks'

import { BreakType, FormValues, ScheduleType } from '../../types'
import { isEndDateRequired } from './utils'

interface Props {
  type: BreakType
  autoFocusFirstField?: boolean
  status: Maybe<EngagementStatus>
  scheduleType: ScheduleType
  setValues: (values: FormValues) => void
  onFormInitializedFirstTime?: () => void
}

const FormContent = ({
  type,
  autoFocusFirstField,
  status,
  scheduleType,
  setValues,
  onFormInitializedFirstTime
}: Props) => {
  const { getState } = useForm()
  const isMulti = type === BreakType.MULTI
  const isCreateSchedule = scheduleType === ScheduleType.CREATE
  const isLastDayRequired = isEndDateRequired(status)

  // Save values before switching tabs
  useEffect(() => {
    return () => {
      const values = getState().values as FormValues

      setValues(values)
    }
  }, [getState, setValues])

  // To trigger autofocus only once. Do not autofocus on every tab switching
  useLayoutEffect(() => {
    if (autoFocusFirstField) {
      onFormInitializedFirstTime?.()
    }
  }, [autoFocusFirstField, onFormInitializedFirstTime])

  return (
    <>
      <FormDatePickerWrapper
        name='startDate'
        data-testid='FormContent-start-date'
        label={isMulti ? 'First Day of Break' : 'Date'}
        width='full'
        autoFocus={autoFocusFirstField}
        required
        // TODO: restore it back as part of https://toptal-core.atlassian.net/browse/SPT-2335
        // useServerTimezone
      />
      {isMulti && (
        <>
          <FormDatePickerWrapper
            name='endDate'
            data-testid='FormContent-end-date'
            label='Last Day of Break'
            width='full'
            required={isLastDayRequired}
            // TODO: restore it back as part of https://toptal-core.atlassian.net/browse/SPT-2335
            // useServerTimezone
          />
        </>
      )}
      {isCreateSchedule && (
        <>
          <FormReasonSelect
            required
            enableReset
            width='full'
            name='reasonId'
            data-testid='FormContent-reason-id'
            label='Reason'
            action={FeedbackReasonActions.ENGAGEMENT_PAUSED}
          />
          <Form.Input
            name='comment'
            data-testid='FormContent-comment'
            label='Details'
            width='full'
            rows={4}
            multiline
            required
          />
        </>
      )}
      <Form.Input
        name='messageToClient'
        data-testid='FormContent-message-to-client'
        label='Message to the Client'
        width='full'
        rows={4}
        multiline
        hint='Will be visible for the client'
      />
    </>
  )
}

export default FormContent
