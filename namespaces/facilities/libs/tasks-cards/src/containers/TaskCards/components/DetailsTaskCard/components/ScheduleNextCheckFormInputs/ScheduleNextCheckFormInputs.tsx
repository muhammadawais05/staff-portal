import { Form, useField, useForm } from '@toptal/picasso-forms'
import React, { useMemo } from 'react'
import { NextCheckResponsibleRoleTypes as ResponsibleRoleTypes } from '@staff-portal/graphql/staff'
import { FormDatePickerWrapper } from '@staff-portal/forms'

import {
  ACTION_NEEDED_OPTIONS,
  RESPONSIBLE_ROLE_TYPE_OPTIONS,
  ROLE_TYPE_ACTION_OPTIONS
} from './constants'
import { isActionNeeded } from './utils'

const ScheduleNextCheckFormInputs = () => {
  const form = useForm()
  const {
    input: { value: action }
  } = useField<string>('action')

  const {
    input: { value: responsibleRoleType }
  } = useField<string>('responsibleRoleType', {
    initialValue: ResponsibleRoleTypes.TALENT
  })

  const {
    input: { value: actionNeeded }
  } = useField<string>('actionNeeded', {
    initialValue: ACTION_NEEDED_OPTIONS.yes.value
  })

  const isActionOther = action === 'OTHER'

  if (!isActionOther) {
    form.change('comment', null)
  }

  const actionOptions = ROLE_TYPE_ACTION_OPTIONS[responsibleRoleType] || []

  const minActionDate = useMemo(() => new Date(), [])

  return (
    <>
      <Form.RadioGroup
        label='Do we need to take any action?'
        name='actionNeeded'
        horizontal
        required
      >
        {Object.values(ACTION_NEEDED_OPTIONS).map(({ label, value }) => (
          <Form.Radio key={value} label={label} value={value} />
        ))}
      </Form.RadioGroup>

      {isActionNeeded(actionNeeded) && (
        <Form.RadioGroup
          label='Who is responsible for the next action?'
          name='responsibleRoleType'
          horizontal
          required
          onChange={() => form.change('action', null)}
        >
          {RESPONSIBLE_ROLE_TYPE_OPTIONS.map(({ label, value }) => (
            <Form.Radio key={value} label={label} value={value} />
          ))}
        </Form.RadioGroup>
      )}

      {isActionNeeded(actionNeeded) && responsibleRoleType && (
        <Form.Select
          name='action'
          placeholder='Select an option'
          label='Action'
          options={actionOptions}
          data-testid='select-action-input'
          required
        />
      )}

      {isActionNeeded(actionNeeded) && isActionOther && (
        <Form.Input
          rows={4}
          multiline
          width='full'
          name='comment'
          placeholder='Add a comment...'
          label='Comment'
          required
        />
      )}

      <FormDatePickerWrapper
        name='actionDate'
        label='Next Check Date'
        width='full'
        minDate={minActionDate}
        data-testid='schedule-next-check-modal-action-date'
        required
      />
    </>
  )
}

export default ScheduleNextCheckFormInputs
