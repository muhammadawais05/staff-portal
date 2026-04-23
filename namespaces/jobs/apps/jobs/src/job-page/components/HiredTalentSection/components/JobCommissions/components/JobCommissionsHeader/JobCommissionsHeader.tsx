import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Maybe } from '@staff-portal/graphql/staff'
import { isNotNullish } from '@staff-portal/utils'
import { toPercentage } from '@staff-portal/translation'

type Props = {
  commissionsPot?: Maybe<number>
}

const JobCommissionsHeader = ({ commissionsPot }: Props) => {
  if (!isNotNullish(commissionsPot)) {
    return null
  }

  return (
    <Container top='small' bottom='small'>
      <Typography variant='heading' size='small'>
        {`Commissions (out of ${toPercentage(commissionsPot, {
          precisionMin: 1,
          precisionMax: 1
        })} pot)`}
      </Typography>
    </Container>
  )
}

export default JobCommissionsHeader
