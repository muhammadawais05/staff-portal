import { Container, Typography } from '@toptal/picasso'
import React from 'react'
import { OperationFragment } from '@staff-portal/operations'

import TrialLengthEditButton from '../TrialLengthEditButton'
import { getBusinessCopy } from '../TrialLengthEditModal/utils/get-business-copy'

type Props = {
  operation: OperationFragment
  engagementId: string
  trialLength: number
}

const TrialLengthField = ({ operation, engagementId, trialLength }: Props) => {
  return (
    <Container flex justifyContent='space-between'>
      <Typography size='medium' data-testid='TrialLengthField-value'>
        {getBusinessCopy(trialLength)}
      </Typography>

      <TrialLengthEditButton
        engagementId={engagementId}
        operation={operation}
      />
    </Container>
  )
}

export default TrialLengthField
