import { useNotifications } from '@toptal/picasso/utils'
import React from 'react'

import { Props as EmailPreviewProps } from '../EmailPreview'
import EmailPreviewContent from '../EmailPreviewContent'
import { useGetRoleEmailEditPreview } from './data/get-role-email-edit-preview'

const RoleEmailPreview = ({ roleId, body }: EmailPreviewProps) => {
  const { showError } = useNotifications()
  const { preview, loading } = useGetRoleEmailEditPreview({
    variables: { id: roleId, body },
    onError: () => showError('Unable to get email preview.')
  })

  return <EmailPreviewContent loading={loading} preview={preview} />
}

export default RoleEmailPreview
