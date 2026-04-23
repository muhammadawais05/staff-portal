import React from 'react'
import { Button } from '@toptal/picasso'

interface Props {
  totalCount: number
  handleClick: () => void
  isExpanded: boolean
}

const InvestigationsToggleButton = ({
  totalCount,
  handleClick,
  isExpanded
}: Props) => {
  return (
    <Button
      size='small'
      variant='secondary'
      onClick={handleClick}
      data-testid='InvestigationsToggleButton'
      disabled={!totalCount}
    >
      {isExpanded
        ? 'Hide Investigations'
        : `Show Investigations (${totalCount})`}
    </Button>
  )
}

export default InvestigationsToggleButton
