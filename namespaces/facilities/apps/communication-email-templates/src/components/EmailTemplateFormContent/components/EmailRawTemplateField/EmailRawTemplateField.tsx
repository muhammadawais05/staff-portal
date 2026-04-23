import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { GridItemField } from '@staff-portal/ui'
import { getEmailTemplateHelpPath } from '@staff-portal/routes'
import { Link } from '@staff-portal/navigation'

import { RAW_TEMPLATE_FIELD } from '../../config'

const EmailRawTemplateField = () => (
  <GridItemField label='Raw template' labelFor={RAW_TEMPLATE_FIELD} required>
    <Form.Input
      id={RAW_TEMPLATE_FIELD}
      name={RAW_TEMPLATE_FIELD}
      rows={5}
      rowsMax={30}
      width='full'
      multiline
      multilineResizable
      required
      hint={
        <>
          For the list of available variables click{' '}
          <Link href={getEmailTemplateHelpPath()} target='_blank'>
            here
          </Link>
        </>
      }
    />
  </GridItemField>
)

export default EmailRawTemplateField
