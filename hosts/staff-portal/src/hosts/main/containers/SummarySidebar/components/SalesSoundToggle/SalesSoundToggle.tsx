import React from 'react'
import { Button } from '@toptal/picasso'
import { SoundOn16, SoundOff16 } from '@toptal/picasso/Icon'

interface Props {
  enabled: boolean
  onTurnOn: Function
  onTurnOff: Function
}

export const SalesSoundToggle = ({
  enabled,
  onTurnOn,
  onTurnOff
}: Props) => {
  if (enabled) {
    return (
      <Button.Circular
        title='Turn the sound off'
        variant='flat'
        icon={<SoundOn16 color='dark-grey' />}
        onClick={() => onTurnOff()}
      />
    )
  }

  return (
    <Button.Circular
      title='Turn the sound on'
      variant='flat'
      icon={<SoundOff16 color='dark-grey' />}
      onClick={() => onTurnOn()}
    />
  )
}

export default SalesSoundToggle
