import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { Props as FormSelectProps } from '@toptal/picasso-forms/Select/Select'

import { ACTIVITY_OUTCOME_OPTIONS_MAPPING } from './config'

type Props = Pick<
  FormSelectProps<string>,
  'name' | 'label' | 'width' | 'required'
>
const FormActivityOutcomeSelect = (props: Props) => {
  return <Form.Select {...props} options={ACTIVITY_OUTCOME_OPTIONS_MAPPING} />
}

export default FormActivityOutcomeSelect
