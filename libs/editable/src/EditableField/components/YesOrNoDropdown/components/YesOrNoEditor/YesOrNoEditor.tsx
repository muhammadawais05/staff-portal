import React from 'react'
import { Form } from '@toptal/picasso-forms'

import { EditorProps } from '../../../..'
import { YES_OR_NO_OPTIONS } from '../../../../config'

const YesOrNoEditor = <TMutationInput, TQueryOptions>({
  name,
  ...props
}: EditorProps<TMutationInput, number, TQueryOptions>) => (
  <Form.Select
    {...props}
    name={name as string}
    options={YES_OR_NO_OPTIONS}
    width='auto'
    size='small'
  />
)

export default YesOrNoEditor
