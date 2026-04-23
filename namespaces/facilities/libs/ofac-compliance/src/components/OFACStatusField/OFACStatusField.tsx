import React from 'react'
import { Typography, ColorType } from '@toptal/picasso'
import { OfacStatus, VisualComplianceStatus } from '@staff-portal/graphql/staff'

export interface Props {
  ofacStatus: OfacStatus | null | undefined
  visualComplianceStatus: VisualComplianceStatus | null | undefined
}

const VISUAL_COMPLIANCE_STATUS_MAPPING: Record<VisualComplianceStatus, string> =
  {
    [VisualComplianceStatus.FULLY_CHECKED]: 'verified via Visual Compliance',
    [VisualComplianceStatus.IN_PROGRESS]: 'unverified via Visual Compliance',
    [VisualComplianceStatus.NOT_FULLY_CHECKED]:
      'unverified via Visual Compliance'
  }

const OFAC_STATUS_MAPPING: Record<
  OfacStatus,
  { color: ColorType; text: string }
> = {
  [OfacStatus.NORMAL]: {
    color: 'green',
    text: 'Normal'
  },
  [OfacStatus.INVESTIGATION]: {
    color: 'yellow',
    text: 'Investigation'
  },
  [OfacStatus.RESTRICTED]: {
    color: 'red',
    text: 'Restricted'
  }
}

const OFACStatusField = ({ ofacStatus, visualComplianceStatus }: Props) => {
  if (!ofacStatus) {
    return null
  }

  const visualComplianceStatusText =
    visualComplianceStatus &&
    VISUAL_COMPLIANCE_STATUS_MAPPING[visualComplianceStatus]

  const { color, text: ofacStatusText } = OFAC_STATUS_MAPPING[ofacStatus]

  return (
    <Typography
      weight='semibold'
      size='medium'
      color={color}
      data-testid='ofac-status-field'
    >
      {`${ofacStatusText} (${visualComplianceStatusText})`}
    </Typography>
  )
}

export default OFACStatusField
