import React from 'react'
import { Container, Info16, Tooltip } from '@toptal/picasso'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'

interface Props {
  allocatedHoursConfirmedAt: string
}

const UpdatedAtIndicator = ({ allocatedHoursConfirmedAt }: Props) => {
  const confirmedAtPeriod = getDateDistanceFromNow(allocatedHoursConfirmedAt, {
    hideSuffix: true
  })

  return (
    <Tooltip
      content={`Updated ${confirmedAtPeriod} ago`}
      placement='right'
      compact
    >
      <Container as='span' left='xsmall' flex>
        <Info16 data-testid='info-icon' />
      </Container>
    </Tooltip>
  )
}

export default UpdatedAtIndicator
