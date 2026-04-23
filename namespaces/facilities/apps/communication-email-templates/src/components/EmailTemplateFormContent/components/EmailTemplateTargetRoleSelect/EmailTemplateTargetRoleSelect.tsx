import React, { useMemo } from 'react'
import { GridItemField } from '@staff-portal/ui'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'

import { TARGET_ROLE_FIELD } from '../../config'
import { useGetEmailTemplateTargetRoles } from '../../../../data'
import { sortByTargetRoleTitle } from './utils'

const EmailTemplateTargetRoleSelect = () => {
  const { showError } = useNotifications()

  const { emailTemplateTargetRoles, loading } = useGetEmailTemplateTargetRoles({
    onError: () =>
      showError(
        'An error occurred, unable to fetch searchable roles filter options.'
      )
  })

  const options = useMemo(
    () =>
      emailTemplateTargetRoles
        ? [...emailTemplateTargetRoles]
            .sort(sortByTargetRoleTitle)
            .map(({ value, title }) => ({
              text: title,
              value
            }))
        : [],
    [emailTemplateTargetRoles]
  )

  return (
    <GridItemField
      label='Target role'
      labelFor={TARGET_ROLE_FIELD}
      required
      size='medium'
    >
      <Form.Select
        id={TARGET_ROLE_FIELD}
        name={TARGET_ROLE_FIELD}
        loading={loading}
        options={options}
        width='full'
        placeholder='Please select a role'
        required
      />
    </GridItemField>
  )
}

export default EmailTemplateTargetRoleSelect
