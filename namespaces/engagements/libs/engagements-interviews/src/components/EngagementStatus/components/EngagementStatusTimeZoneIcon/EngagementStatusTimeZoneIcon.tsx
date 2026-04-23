import React from 'react'
import { Time16 } from '@toptal/picasso/Icon'
import { Container, Tooltip } from '@toptal/picasso'
interface Props {
  timeZoneValue?: string
}

const EngagementStatusTimeZoneIcon = ({ timeZoneValue }: Props) => {
  return <Tooltip content={timeZoneValue} interactive placement='top'>
    <Container as='span' left='xsmall' flex data-testid='engagement-status-timezone-icon'><Time16 /></Container>
  </Tooltip>
}

export default EngagementStatusTimeZoneIcon
