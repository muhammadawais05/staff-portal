import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { isMaxLength } from '@staff-portal/validators'

const ImportTopForm = () => {
  return (
    <>
      <Form.Input
        width='full'
        name='guid'
        label='Contract GUID'
        validate={isMaxLength}
        required
        data-testid='ImportTopForm-guid'
      />

      <Form.NumberInput
        width='full'
        name='number'
        label='Contract Number'
        // TODO: validation for integer number will be done in: https://toptal-core.atlassian.net/browse/SPT-1780
        required
        data-testid='ImportTopForm-number'
      />
    </>
  )
}

export default ImportTopForm
