import { Typography } from '@toptal/picasso'
import React from 'react'
import { WrapWithTooltip } from '@staff-portal/ui'

import { FeedbackAnswerFragment } from '../../data'

export interface Props {
  answer: FeedbackAnswerFragment
}

const FeedbackAnswerLabel = ({
  answer: { option, tooltip }
}: Props) => {
  return <WrapWithTooltip enableTooltip={Boolean(tooltip)} content={tooltip}>
    <Typography as='span'>{option?.question.label}</Typography>
  </WrapWithTooltip>
}

export default FeedbackAnswerLabel
