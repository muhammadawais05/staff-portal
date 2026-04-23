import React from 'react'
import { Form, useField } from '@toptal/picasso-forms'
import { FormDatePickerWrapper } from '@staff-portal/forms'

import { ApproveJobForm } from '../../../../types'

export interface Props {
  requiresMatchingCallInfo?: boolean | null
}

const MatchingCallInfo = ({ requiresMatchingCallInfo }: Props) => {
  const {
    input: { value: noMatchingCall }
  } = useField<ApproveJobForm['noMatchingCall']>('noMatchingCall')

  if (!requiresMatchingCallInfo) {
    return null
  }

  return (
    <>
      <Form.Checkbox name='noMatchingCall' label='No matching call' />

      {noMatchingCall && (
        <Form.Input
          name='noMatchingCallComment'
          label='Comment'
          multiline
          rows={4}
          width='full'
          required
        />
      )}

      {!noMatchingCall && (
        <>
          <FormDatePickerWrapper
            name='matchingCallDate'
            label='Date of matching call'
            titleCase={false}
            width='full'
            required
          />

          <Form.TimePicker
            name='matchingCallTime'
            label='Time of matching call'
            titleCase={false}
            width='full'
            required
          />
        </>
      )}
    </>
  )
}

export default MatchingCallInfo
