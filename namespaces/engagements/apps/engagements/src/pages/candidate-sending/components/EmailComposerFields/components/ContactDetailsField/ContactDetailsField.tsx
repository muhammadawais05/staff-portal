import React from 'react'
import { Form } from '@toptal/picasso-forms'

import BaseEmailComposerField from '../BaseEmailComposerField/BaseEmailComposerField'

const ContactDetailsField = () => (
  <BaseEmailComposerField
    label='Contact Details'
    visibilityControlFieldName='showContactDetails'
  >
    {({ disabled }) => (
      <Form.Input
        name='contactDetailsText'
        multiline
        rowsMin={5}
        width='full'
        disabled={disabled}
      />
    )}
  </BaseEmailComposerField>
)

export default ContactDetailsField
