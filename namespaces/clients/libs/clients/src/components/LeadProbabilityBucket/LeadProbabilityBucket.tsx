import React from 'react'
import { Container, Info16, Tooltip, Typography } from '@toptal/picasso'
import {
  LeadProbabilityBucket as BucketType,
  Maybe
} from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'
import { NO_VALUE } from '@staff-portal/config'

import { ScoreExplanation, bucketColor } from './utils'
import { TooltipContent } from './components'

interface Props {
  bucket?: Maybe<BucketType>
  scoreExplanation?: Maybe<ScoreExplanation>
}

const LeadProbabilityBucket = ({ bucket, scoreExplanation }: Props) => {
  if (!bucket) {
    return <>{NO_VALUE}</>
  }

  const color = bucketColor(bucket)
  const { negativeFeatures, positiveFeatures } = scoreExplanation || {}
  const hasTooltip = Boolean(
    negativeFeatures?.length || positiveFeatures?.length
  )

  return (
    <Container inline flex alignItems='center'>
      <Typography weight='semibold' color={color}>
        {titleize(bucket)}
      </Typography>
      {hasTooltip && (
        <Container as='span' left='xsmall' flex alignItems='center'>
          <Tooltip
            content={
              <TooltipContent
                scoreExplanation={{ negativeFeatures, positiveFeatures }}
              />
            }
            maxWidth='none'
          >
            <Container inline flex>
              <Info16 color='dark-grey' />
            </Container>
          </Tooltip>
        </Container>
      )}
    </Container>
  )
}

export default LeadProbabilityBucket
