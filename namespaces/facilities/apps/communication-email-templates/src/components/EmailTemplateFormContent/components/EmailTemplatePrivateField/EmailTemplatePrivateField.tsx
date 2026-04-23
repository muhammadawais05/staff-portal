import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { GridItemField } from '@staff-portal/ui'
import { useNotifications } from '@toptal/picasso/utils'

import { PRIVATE_FIELD } from '../../config'
import { useGetManageEmailTemplatesPermits } from './data/get-manage-email-templates-permit/get-manage-email-templates-permit.staff.gql'

const EmailTemplatePrivateField = () => {
  const { showError } = useNotifications()
  const { permits } = useGetManageEmailTemplatesPermits({
    onError: () =>
      showError(
        'An error occurred, unable to get the manage email templates permits.'
      )
  })

  return permits?.canManageEmailTemplates ? (
    <GridItemField
      label='Private'
      labelFor={PRIVATE_FIELD}
      required
      size='medium'
    >
      <Form.RadioGroup
        id={PRIVATE_FIELD}
        name={PRIVATE_FIELD}
        horizontal
        required
      >
        <Form.Radio label='Yes' value='YES' />
        <Form.Radio label='No' value='NO' />
      </Form.RadioGroup>
    </GridItemField>
  ) : null
}

export default EmailTemplatePrivateField
