import React from 'react'
import { ArrowDownMinor16, Button } from '@toptal/picasso'
import { Transitions } from '@toptal/picasso/utils'

export type Props = {
  expanded: boolean
  onClick: () => void
}

const ButtonCircular = Button.Circular

const ExpandButton = ({ expanded, onClick }: Props) => (
  <ButtonCircular
    data-testid='expand-button'
    variant='flat'
    icon={
      <Transitions.Rotate180 on={expanded}>
        <ArrowDownMinor16 />
      </Transitions.Rotate180>
    }
    onClick={onClick}
  />
)

export default ExpandButton
