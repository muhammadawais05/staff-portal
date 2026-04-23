import React from 'react'
import { Form } from '@toptal/picasso-forms'

import BaseEmailComposerField from '../BaseEmailComposerField/BaseEmailComposerField'

const CustomClosingField = () => (
  <BaseEmailComposerField
    label='Custom Closing'
    visibilityControlFieldName='showCustomClosing'
  >
    {({ disabled }) => (
      <Form.Input
        name='customClosing'
        multiline
        rowsMin={5}
        width='full'
        disabled={disabled}
      />
    )}
  </BaseEmailComposerField>
)

export default CustomClosingField
