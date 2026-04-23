import React, { useCallback } from 'react'
import { Button } from '@toptal/picasso'

export type Props = {
  isEditMode: boolean
  onClick: (isEditMode: boolean) => void
}

const EmailComposerModeButton = ({ isEditMode, onClick }: Props) => {
  const handleButtonClick = useCallback(() => {
    onClick(!isEditMode)
  }, [isEditMode, onClick])

  return (
    <Button
      size='small'
      variant='secondary'
      onClick={handleButtonClick}
      data-testid='email-composer-mode-button'
    >
      Switch to {isEditMode ? 'Preview' : 'Edit'} Mode
    </Button>
  )
}

export default EmailComposerModeButton
