import React from 'react'
import { Typography } from '@toptal/picasso'

import { getCommitmentTitle, getCommitmentColor } from '../../../../utils'

type Props = {
  commitment?: string
  text?: string
}

const CommitmentText = ({ commitment, text }: Props) => {
  if (commitment) {
    return (
      <Typography
        as='span'
        size='medium'
        weight='semibold'
        color={getCommitmentColor(commitment)}
        data-testid='commitment-text'
      >
        {getCommitmentTitle(commitment)}
      </Typography>
    )
  }

  return (
    <Typography size='medium' color='black' data-testid='commitment-text'>
      {text}
    </Typography>
  )
}

export default CommitmentText
