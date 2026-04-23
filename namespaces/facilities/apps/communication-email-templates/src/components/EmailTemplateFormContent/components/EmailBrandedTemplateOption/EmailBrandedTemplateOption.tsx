import React from 'react'
import { GridItemField } from '@staff-portal/ui'
import { Form } from '@toptal/picasso-forms'

import { BRANDED_TEMPLATE_FIELD } from '../../config'

const EmailBrandedTemplateOption = () => (
  <GridItemField
    label='Email template'
    labelFor={BRANDED_TEMPLATE_FIELD}
    size='medium'
  >
    <Form.Checkbox
      name={BRANDED_TEMPLATE_FIELD}
      label={'Use Toptal email template'}
    />
  </GridItemField>
)

export default EmailBrandedTemplateOption
