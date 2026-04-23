import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { GridItemField } from '@staff-portal/ui'

import { NAME_FIELD } from '../../config'

const EmailTemplateNameField = () => (
  <GridItemField label='Name' labelFor={NAME_FIELD} required>
    <Form.Input
      name={NAME_FIELD}
      width='full'
      id={NAME_FIELD}
      data-lpignore='true'
      required
    />
  </GridItemField>
)

export default EmailTemplateNameField
