import React from 'react'
import { Container, Typography } from '@toptal/picasso'

import { getClaimRoleStepMessage } from '../../../../utils'

export interface Props {
  stepTitle?: string
  talentFullName?: string
  talentPartnerFullName?: string
}

const ClaimEnglishStepModalContent = ({
  stepTitle,
  talentFullName,
  talentPartnerFullName
}: Props) => {
  const baseMessage = (
    <Typography size='medium' weight='semibold'>
      Before claiming the step, you need to send the screening invitation from
      the drop-down menu of the specific step.
    </Typography>
  )

  if (!stepTitle || !talentFullName) {
    return baseMessage
  }

  const claimRoleStepMessage = getClaimRoleStepMessage({
    talentPartnerFullName,
    stepTitle,
    talentFullName
  })

  return (
    <>
      <Typography size='medium'>{claimRoleStepMessage}</Typography>

      <Container top='xsmall'>{baseMessage}</Container>
    </>
  )
}

export default ClaimEnglishStepModalContent
