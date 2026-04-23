import React from 'react'
import {
  Tooltip,
  TypographyOverflow,
  Container,
  QuestionMark16
} from '@toptal/picasso'

import { TopscreenPositionFragment } from '../TopscreenPositionsSection/data/get-topscreen-positions'
import TopscreenPositionLabelTooltipContent from '../TopscreenPositionLabelTooltipContent'

type Props = {
  position: TopscreenPositionFragment
}

const TopscreenPositionLabel = ({ position }: Props) => (
  <Container flex direction='row'>
    <TypographyOverflow as='span' lines={1} noWrap>
      {position.title}
    </TypographyOverflow>
    <Tooltip
      interactive
      content={
        <TopscreenPositionLabelTooltipContent
          nodes={position.stepTypes.nodes}
          jobUrl={position.jobUrl}
          programmingLanguage={position.description}
        />
      }
    >
      <Container inline flex alignItems='center' left='xsmall'>
        <QuestionMark16 color='dark-grey' />
      </Container>
    </Tooltip>
  </Container>
)

export default TopscreenPositionLabel
