import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { Props as FormSelectProps } from '@toptal/picasso-forms/Select/Select'

import { ACTIVITY_TYPES_OPTIONS } from './config'

type Props = Pick<
  FormSelectProps<string>,
  'name' | 'label' | 'width' | 'required'
> & {}

const FormActivityTypeSelect = (props: Props) => {
  return <Form.Select {...props} options={ACTIVITY_TYPES_OPTIONS} />
}

export default FormActivityTypeSelect
