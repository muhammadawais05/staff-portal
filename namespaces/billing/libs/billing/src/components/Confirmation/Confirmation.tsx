import { Button, Container, Modal, Typography } from '@toptal/picasso'
import { Trans } from 'react-i18next'
import React, { FC, memo } from 'react'

import { ConfirmationStoreData } from '../../store/confirmationActions'
import { useConfirmations } from '../../_lib/customHooks/useConfirmations'
import i18n from '../../utils/i18n'

interface Props extends ConfirmationStoreData {}

const displayName = 'Confirmation'

interface HandleOnCancel {
  onCancel?: () => void
  handleOnCloseConfirmation: () => void
}

const handleOnCancel =
  ({ onCancel, handleOnCloseConfirmation }: HandleOnCancel) =>
  () => {
    if (onCancel) {
      onCancel()
    }
    handleOnCloseConfirmation()
  }

export const Confirmation: FC<Props> = memo(
  ({
    actionTitle,
    actionVariant,
    actionIsLoading,
    actionIsDisabled,
    cancelTitle,
    cancelVariant,
    description,
    notice,
    onCancel,
    onSuccess,
    title
  }) => {
    const { handleOnCloseConfirmation } = useConfirmations()

    return (
      <div data-testid={displayName}>
        {title && (
          <Modal.Title data-testid='Confirmation-title'>{title}</Modal.Title>
        )}
        <Modal.Content>
          {description && (
            <Container bottom={notice ? 2 : 0}>
              <Typography
                as='div'
                data-testid='Confirmation-description'
                weight='semibold'
                size='medium'
              >
                <Trans>{description}</Trans>
              </Typography>
            </Container>
          )}
          {notice && (
            <Typography
              as='div'
              data-testid='Confirmation-notice'
              size='medium'
            >
              <Trans>{notice}</Trans>
            </Typography>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button
            data-testid='Confirmation-cancel'
            onClick={handleOnCancel({ handleOnCloseConfirmation, onCancel })}
            variant={cancelVariant}
          >
            {cancelTitle}
          </Button>
          <Button
            data-testid='Confirmation-action'
            disabled={actionIsDisabled || actionIsLoading}
            loading={actionIsLoading}
            onClick={onSuccess}
            variant={actionVariant}
          >
            {actionTitle}
          </Button>
        </Modal.Actions>
      </div>
    )
  }
)

Confirmation.defaultProps = {
  actionVariant: 'positive',
  cancelTitle: i18n.t('common:actions.cancel'),
  cancelVariant: 'secondary'
}

Confirmation.displayName = displayName

// TODO: refactor this into a hook https://toptal-core.atlassian.net/browse/SPB-1994
// @ts-ignore
Confirmation.handleOnCancel = handleOnCancel

export default Confirmation
