import React, { FC, memo } from 'react'
import { AnyObject, Form } from '@toptal/picasso-forms'

import { FormContent, Props as FormContentProps } from './FormContent'

interface Props extends FormContentProps {
  handleOnSubmit?: (formData: AnyObject) => void
  initialFormValues: AnyObject
}

export const ComponentTogglerWithForm: FC<Props> = memo<Props>(
  ({ handleOnSubmit = () => null, initialFormValues, ...containerProps }) => {
    return (
      <Form initialValues={initialFormValues} onSubmit={handleOnSubmit}>
        <FormContent {...containerProps} />
      </Form>
    )
  }
)
