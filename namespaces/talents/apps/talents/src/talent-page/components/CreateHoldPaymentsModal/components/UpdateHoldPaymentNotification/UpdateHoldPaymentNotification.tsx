import React from 'react'
import { Container, Typography } from '@toptal/picasso'

interface Props {
  description: string
}

const paymentNotification = (holdDescription: string) =>
  `Please note that this payment already has a hold placed ${holdDescription}.
  Placing a new hold will cancel the previous hold, and all payments will be updated accordingly.`

export const UpdateHoldPaymentNotification = ({ description }: Props) => {
  return <Container bottom='small'>
    <Typography color='red' size='medium'>
      {paymentNotification(description)}
    </Typography>
  </Container>
}
