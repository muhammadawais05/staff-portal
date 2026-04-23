import React from 'react'
import { DetailedList as DL, LinkWrapper } from '@staff-portal/ui'
import { WebResourceFragment } from '@staff-portal/facilities'

import { SourcingCommissionFragment } from '../../data/get-job-commissions'
import { getJobCommissionLabel } from '../../utils'

export interface Props {
  commissionsPot?: number
  referralCommission?: SourcingCommissionFragment | string | null
  referrer?: WebResourceFragment | null
  type: string
}

const JobCommissionItemField = ({
  commissionsPot,
  referralCommission,
  referrer,
  type
}: Props) => {
  if (!referrer || !referralCommission || !type) {
    return null
  }

  return (
    <DL.Item
      label={getJobCommissionLabel({
        commissionsPot,
        referralCommission,
        type
      })}
    >
      <LinkWrapper
        wrapWhen={Boolean(referrer.webResource.url)}
        href={referrer.webResource.url as string}
      >
        {referrer.webResource.text}
      </LinkWrapper>
    </DL.Item>
  )
}

export default JobCommissionItemField
