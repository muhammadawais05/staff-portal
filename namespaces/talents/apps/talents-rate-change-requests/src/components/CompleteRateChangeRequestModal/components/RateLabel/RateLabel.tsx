import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { formatAmount } from '@toptal/picasso/utils'
import { NO_VALUE } from '@staff-portal/config'

interface Props {
  label: string
  amount?: string | null
}

const RateLabel = ({ label, amount }: Props) => (
  <>
    <Typography size='medium'>{label}</Typography>
    <Container top='xsmall'>
      <Typography size='medium' weight='semibold'>
        {amount ? formatAmount({ amount }) : NO_VALUE}
      </Typography>
    </Container>
  </>
)

export default RateLabel
