import React, { FC, memo } from 'react'
import { Tooltip, Typography } from '@toptal/picasso'
import { Help16 } from '@toptal/picasso/Icon'
import { BillingOptionVerificationStatus } from '@staff-portal/graphql/staff'

import * as Styles from './styles'
import getVerificationStatusTooltipLines from '../../utils/getVerificationStatusTooltipLines'
import getVerificationStatusColor from '../../utils/getVerificationStatusColor'
import getVerificationStatusLabel from '../../utils/getVerificationStatusLabel'
import { ClientBillingDetailsBillingOptionsFragment } from '../../data/getClientBillingDetails.graphql.types'

interface Props
  extends Pick<
    ClientBillingDetailsBillingOptionsFragment,
    'status' | 'billingMethod' | 'comment'
  > {
  verificationStatuses?: BillingOptionVerificationStatus[] | null
}

const displayName = 'VerificationStatus'

const VerificationStatus: FC<Props> = memo(
  ({ status, billingMethod, comment, verificationStatuses }) => {
    const tooltipLines = getVerificationStatusTooltipLines({
      billingMethod,
      comment,
      verificationStatuses
    })
    const label = (
      <Typography
        size='medium'
        color={getVerificationStatusColor(billingMethod, status)}
        weight='semibold'
        inline
        data-testid={`${displayName}-label`}
      >
        {getVerificationStatusLabel(billingMethod, status)}
      </Typography>
    )

    if (tooltipLines.length === 0) {
      return label
    }

    return (
      <Tooltip
        content={tooltipLines.map(tooltipLine => (
          <Typography color='inherit' key={tooltipLine}>
            {tooltipLine}
          </Typography>
        ))}
        placement='top'
        interactive
      >
        <span>
          {label}
          <Help16 css={Styles.helpIcon} data-testid={`${displayName}-icon`} />
        </span>
      </Tooltip>
    )
  }
)

VerificationStatus.displayName = displayName

export default VerificationStatus
