import React from 'react'
import PicassoTimeline, {
  TimelineProps as Props
} from '@toptal/picasso/Timeline'

import * as S from './styles'

const Timeline = ({ children, ...props }: Props) => (
  <PicassoTimeline css={S.timeline} {...props}>
    {children}
  </PicassoTimeline>
)

export default Timeline
