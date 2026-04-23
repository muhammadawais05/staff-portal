import { Modal, Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, ReactElement, memo } from 'react'

import ModalFooter from '../ModalFooter'

const displayName = 'AlertModal'

export interface Props {
  buttonText?: string
  message: ReactElement | string
  title: string
}

export const AlertModal: FC<Props> = memo(({ buttonText, message, title }) => {
  const { t: translate } = useTranslation('common')

  return (
    <>
      <Modal.Title data-testid={`${displayName}-title`}>{title}</Modal.Title>
      <Modal.Content>
        <Typography
          size='medium'
          as={typeof message === 'string' ? 'p' : 'div'}
          data-testid={`${displayName}-text`}
        >
          {message}
        </Typography>
      </Modal.Content>
      <ModalFooter cancelButtonText={buttonText || translate('actions.ok')} />
    </>
  )
})

AlertModal.displayName = displayName

export default AlertModal
