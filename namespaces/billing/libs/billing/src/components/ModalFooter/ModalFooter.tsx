import { Button, Modal } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, ReactNode, memo } from 'react'

import { useModals } from '../../_lib/customHooks/useModals'

const displayName = 'ModalFooter'

interface Props {
  cancelButtonText?: string
  children?: ReactNode
  hasCancelButton?: boolean
}

export const ModalFooter: FC<Props> = memo(
  ({ cancelButtonText, children, hasCancelButton = true }) => {
    const { t: translate } = useTranslation('common')
    const { handleOnCloseModal } = useModals()

    return (
      <Modal.Actions data-testid={displayName}>
        {hasCancelButton && (
          <Button
            data-testid='cancel'
            onClick={handleOnCloseModal}
            variant='secondary'
          >
            {cancelButtonText || translate('actions.close')}
          </Button>
        )}
        {children}
      </Modal.Actions>
    )
  }
)

ModalFooter.displayName = displayName

export default ModalFooter
