import React from 'react'
import { Button } from '@toptal/picasso'
import { ArrowDownMinor16 } from '@toptal/picasso/Icon'
import { Transitions } from '@toptal/picasso/utils'

export type Props = {
  onClick: () => void
  isExpandedAll: boolean
}

const ExpandAllButton = ({ onClick, isExpandedAll }: Props) => (
  <Button
    size='small'
    onClick={onClick}
    icon={
      <Transitions.Rotate180 on={isExpandedAll}>
        <ArrowDownMinor16 />
      </Transitions.Rotate180>
    }
    iconPosition='right'
    variant='secondary'
  >
    {isExpandedAll ? 'Collapse All Details' : 'Expand All Details'}
  </Button>
)

export default ExpandAllButton
