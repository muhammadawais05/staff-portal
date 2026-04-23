import { useNotifications } from '@toptal/picasso/utils'
import React from 'react'

import EmailPreviewContent from '../EmailPreviewContent'
import { useGetEmailPreview } from './data'

export interface Props {
  roleId: string
  body: string
}

const RescheduleEmailPreview = ({ roleId, body }: Props) => {
  const { showError } = useNotifications()
  const { preview, loading } = useGetEmailPreview({
    variables: { id: roleId, body },
    onError: () => {
      showError('Unable to get email preview.')
    }
  })

  return <EmailPreviewContent loading={loading} preview={preview} />
}

export default RescheduleEmailPreview
