import React from 'react'
import { Form, useField } from '@toptal/picasso-forms'

import { useSendEmailContext } from '../../context/send-email-context'

const CCSuggestedField = () => {
  const {
    emailContext: { emailCarbonCopyOptions }
  } = useSendEmailContext()

  const {
    input: { value: to }
  } = useField('to')

  if (!emailCarbonCopyOptions?.nodes.length) {
    return null
  }

  return (
    <Form.CheckboxGroup name='ccSuggested' label='CC'>
      {emailCarbonCopyOptions.nodes.map(
        ({ label, role: { id, fullName, email } }) => (
          <Form.Checkbox
            key={`${label}-${id}`}
            label={`${label} (${fullName} <${email}>)`}
            value={email}
            disabled={id === to}
          />
        )
      )}
    </Form.CheckboxGroup>
  )
}

export default CCSuggestedField
