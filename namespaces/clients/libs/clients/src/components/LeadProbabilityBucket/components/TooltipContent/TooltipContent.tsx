import React from 'react'
import { Container, Typography } from '@toptal/picasso'

import { featureName, featureValue, ScoreExplanation } from '../../utils'

const TooltipContent = ({
  scoreExplanation: { positiveFeatures, negativeFeatures }
}: { scoreExplanation: ScoreExplanation }) => {
  const features = [
    ...(positiveFeatures || []).map(_ => ({ ..._, positive: true })),
    ...(negativeFeatures || []).map(_ => ({ ..._, positive: false }))
  ]
    .sort(({ position: pA }, { position: pB }) => pA - pB)
    .map(({ name, position, value, positive }) => (
      <Container
        flex
        justifyContent='space-between'
        key={`${name}-${position}`}
      >
        <Container flex right='small'>
          {position}. {featureName(name)}
        </Container>

        <Typography inline color={positive ? 'green' : 'red'} weight='semibold'>
          {featureValue(name, value)}
        </Typography>
      </Container>
    ))

  return (
    <>
      <Typography weight='semibold' variant='heading' size='small'>
        Factors:
      </Typography>

      {features}
    </>
  )
}

export default TooltipContent
