import { Typography } from '@toptal/picasso'
import React, { FC, memo, ComponentProps } from 'react'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import BillingDocument from '../BillingTableDocument'

const displayName = 'BillingCommissions'

interface Props {
  commissions?: ComponentProps<typeof BillingDocument>['document'][]
  testid?: string
}

export const BillingCommissions: FC<Props> = memo(
  ({ commissions, testid = displayName }) => {
    if (!commissions?.length) {
      return <Typography data-testid={testid}>{EMPTY_DATA}</Typography>
    }

    return (
      <Typography as='div' data-testid={testid}>
        {commissions?.map((commission, index) => (
          <Typography key={commission.id || index} as='div'>
            <BillingDocument
              document={commission}
              testid={`${testid}-commission`}
            />
          </Typography>
        ))}
      </Typography>
    )
  }
)

BillingCommissions.displayName = displayName

export default BillingCommissions
