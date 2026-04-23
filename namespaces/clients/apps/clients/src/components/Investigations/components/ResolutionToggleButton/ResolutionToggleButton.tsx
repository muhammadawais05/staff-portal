import React from 'react'
import { Button } from '@toptal/picasso'

interface Props {
  handleClick: () => void
  isExpanded: boolean
}

const ResolutionToggleButton = ({ handleClick, isExpanded }: Props) => {
  return (
    <Button
      size='small'
      variant='secondary'
      onClick={handleClick}
      data-testid='ResolutionToggleButton'
    >
      {isExpanded ? 'Hide Resolution' : 'Show Resolution'}
    </Button>
  )
}

export default ResolutionToggleButton
