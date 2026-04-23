import React from 'react'
import { Button } from '@toptal/picasso'

interface Props {
  totalCount: number
  handleClick: () => void
  isExpanded: boolean
}

const JobsToggleButton = ({
  totalCount,
  handleClick,
  isExpanded
}: Props) => {
  return (
    <Button
      size='small'
      variant='secondary'
      onClick={handleClick}
      data-testid='JobsToggleButton'
      disabled={!totalCount}
    >
      {isExpanded ? 'Hide Jobs' : `Show Jobs (${totalCount})`}
    </Button>
  )
}

export default JobsToggleButton
