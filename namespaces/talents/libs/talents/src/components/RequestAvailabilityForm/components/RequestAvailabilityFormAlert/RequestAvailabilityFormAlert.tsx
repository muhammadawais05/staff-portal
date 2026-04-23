import React, { useState } from 'react'
import { Container, Typography, Alert } from '@toptal/picasso'

interface Props {
  restrictionWarning: string | null | undefined
}

const RequestAvailabilityFormAlert = ({ restrictionWarning }: Props) => {
  const [showMessage, setShowMessage] = useState(true)

  if (!showMessage || !restrictionWarning) {
    return null
  }

  return (
    <Container bottom='small' data-testid='recentlyConfirmedARNotification'>
      <Alert onClose={() => setShowMessage(false)}>
        <Typography size='xsmall'>{restrictionWarning}</Typography>
      </Alert>
    </Container>
  )
}

export default RequestAvailabilityFormAlert
