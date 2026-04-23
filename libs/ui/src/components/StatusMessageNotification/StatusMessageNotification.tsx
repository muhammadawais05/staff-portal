import React from 'react'
import { Alert, AlertProps } from '@toptal/picasso'

import * as S from './styles'

interface Props extends AlertProps {}

const StatusMessageNotification = ({ variant, onClose, children }: Props) => {
  return (
    <Alert css={S.notification} variant={variant} onClose={onClose}>
      {children}
    </Alert>
  )
}

export default StatusMessageNotification
