import { Form } from '@toptal/picasso'
import React from 'react'
import { FinalField } from '@toptal/picasso-forms'

export const Error = ({ name }: { name: string }) => {
  return (
    <FinalField
      name={name}
      subscription={{ touched: true, error: true }}
      render={({ meta: { touched, error } }) =>
        touched && error ? (
          <Form.Error data-testid='error'>{error}</Form.Error>
        ) : null
      }
    />
  )
}
