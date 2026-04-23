import React from 'react'
import { Tooltip, Typography } from '@toptal/picasso'
import { titleize } from '@staff-portal/string'

import { ProbabilityToConvertFragment } from '../../data'
import { JOB_PROBABILITY_TO_CONVERT_COLOR_MAPPING } from '../../config'
import { ProbabilityToConvertTooltipContent } from './components'

export interface Props {
  probabilityToConvertData: ProbabilityToConvertFragment | undefined | null
  estimatedRevenue: string | undefined | null
  estimatedValue: string | undefined | null
}

const ProbabilityToConvert = ({
  probabilityToConvertData,
  estimatedRevenue,
  estimatedValue
}: Props) => {
  if (!probabilityToConvertData) {
    return null
  }

  return (
    <Tooltip
      interactive
      maxWidth='none'
      content={
        <ProbabilityToConvertTooltipContent
          probabilityToConvertData={probabilityToConvertData}
          estimatedRevenue={estimatedRevenue}
          estimatedValue={estimatedValue}
        />
      }
    >
      <Typography size='medium' weight='semibold' noWrap>
        P2C:{' '}
        <Typography
          as='span'
          weight='inherit'
          color={
            JOB_PROBABILITY_TO_CONVERT_COLOR_MAPPING[
              probabilityToConvertData.category
            ]
          }
          data-testid='probability-to-convert-category'
        >
          {titleize(probabilityToConvertData.category)}
        </Typography>
      </Typography>
    </Tooltip>
  )
}

export default ProbabilityToConvert
