import React from 'react'
import { Typography, TypographyProps } from '@toptal/picasso'

export type Props = {
  children?: string | null
  alerted?: boolean | null
  weight?: TypographyProps['weight']
}

const EngagementSurveyItemAnswer = ({
  children,
  alerted,
  weight
}: Props) => {
  return (
    <Typography
      as='div'
      weight={weight}
      size='medium'
      color={!alerted ? 'inherit' : 'red'}
    >
      {children}
    </Typography>
  )
}

export default EngagementSurveyItemAnswer
