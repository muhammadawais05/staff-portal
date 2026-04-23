import React from 'react'
import { Typography, Container, Notification } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'

const displayName = 'BillingOptionConfirmRemoval'

type Props = {
  isLastPullMethod?: boolean
}

const BillingOptionConfirmRemoval = ({ isLastPullMethod }: Props) => {
  const { t: translate } = useTranslation('billingDetails')

  return (
    <>
      <Typography size='medium' data-testid={displayName}>
        {translate('actions.removeBillingOption.confirmRemove.message')}
      </Typography>
      {isLastPullMethod && (
        <Container top={1} data-testid={`${displayName}-warning`}>
          <Notification>
            {translate(
              'actions.removeBillingOption.confirmRemove.lastPullMethod'
            )}
          </Notification>
        </Container>
      )}
    </>
  )
}

BillingOptionConfirmRemoval.displayName = displayName

export default BillingOptionConfirmRemoval
