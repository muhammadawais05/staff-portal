import React from 'react'
import { Container, Typography } from '@toptal/picasso'

export interface Props {
  isClaimed: boolean
}

const ClientClaimText = ({ isClaimed }: Props) => {
  if (isClaimed) {
    return null
  }

  return (
    <Container top='medium'>
      <Typography size='medium'>
        By claiming the call, you will also claim the company.
      </Typography>
    </Container>
  )
}

export default ClientClaimText
