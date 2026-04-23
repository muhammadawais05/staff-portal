import { Container, Typography } from '@toptal/picasso'
import React from 'react'

import { TimeZoneFragment } from './types'
import { getTimeZoneData } from './utils'

export interface Props {
  engagedSubjects: TimeZoneFragment[]
}

const RelatedToTimeTooltip = ({ engagedSubjects }: Props) => {
  return (
    <>
      {engagedSubjects.map((item, index) => {
        const { name, type, timeZoneName } = getTimeZoneData(item)

        return (
          <Container
            key={item.id}
            top={index > 0 ? 'xsmall' : undefined}
            data-testid='RelatedToTimeTooltip-item'
          >
            <Typography color='inherit' weight='semibold' size='xsmall'>
              {name}
            </Typography>
            <Typography color='inherit' size='xsmall'>
              {type}
            </Typography>
            <Typography color='inherit' size='xsmall'>
              {timeZoneName}
            </Typography>
          </Container>
        )
      })}
    </>
  )
}

export default RelatedToTimeTooltip
