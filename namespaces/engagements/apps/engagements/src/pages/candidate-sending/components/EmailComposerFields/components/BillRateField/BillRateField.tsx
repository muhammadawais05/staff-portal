import React from 'react'
import { Form } from '@toptal/picasso-forms'

import BaseEmailComposerField from '../BaseEmailComposerField/BaseEmailComposerField'

const BillRateField = () => (
  <BaseEmailComposerField
    label='Bill Rate'
    visibilityControlFieldName='showBillRate'
  >
    {({ disabled }) => (
      <Form.Input
        name='billRateText'
        multiline
        rowsMin={5}
        width='full'
        disabled={disabled}
      />
    )}
  </BaseEmailComposerField>
)

export default BillRateField
