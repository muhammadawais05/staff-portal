import React, { ComponentProps } from 'react'
import { Button, Pencil16 } from '@toptal/picasso'

export type Props = {
  onClick: ComponentProps<typeof Button.Circular>['onClick']
  disabled?: boolean
}

const EditButton = ({ onClick, disabled }: Props) => (
  <Button.Circular
    icon={<Pencil16 />}
    data-testid='edit-avatar-button'
    disabled={disabled}
    onClick={onClick}
  />
)

export default EditButton
