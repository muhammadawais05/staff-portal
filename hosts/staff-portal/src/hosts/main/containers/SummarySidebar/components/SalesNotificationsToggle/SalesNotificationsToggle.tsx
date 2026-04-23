import React from 'react'
import { Button, Tooltip, Container } from '@toptal/picasso'
import { PlaySolid16, StopSolid16 } from '@toptal/picasso/Icon'

interface Props {
  enabled: boolean
  allowed: boolean
  onPlay: Function
  onStop: Function
}

export const SalesNotificationsToggle = ({
  enabled,
  allowed,
  onPlay,
  onStop
}: Props) => {
  if (!allowed) {
    return (
      <Tooltip
        preventOverflow
        content='Browser notifications need to be enabled'
        placement='top'
      >
        <Container>
          <Button.Circular
            title='Turn the live updates on'
            variant='flat'
            icon={<PlaySolid16 color='dark-grey' />}
            disabled
          />
        </Container>
      </Tooltip>
    )
  }

  if (enabled) {
    return (
      <Button.Circular
        title='Turn the live updates off'
        variant='flat'
        icon={<StopSolid16 color='red' />}
        onClick={() => onStop()}
      />
    )
  }

  return (
    <Button.Circular
      title='Turn the live updates on'
      variant='flat'
      icon={<PlaySolid16 color='dark-grey' />}
      onClick={() => onPlay()}
    />
  )
}

export default SalesNotificationsToggle
