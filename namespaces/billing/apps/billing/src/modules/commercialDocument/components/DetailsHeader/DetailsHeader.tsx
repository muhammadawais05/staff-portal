import React, { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Container, Dropdown } from '@toptal/picasso'

import BillingRecentActivityButton from '../../../recentActivity/components/BillingRecentActivityButton'

const displayName = 'DetailsHeader'

interface Props {
  MoreActions?: ReactNode
  gid: string
  isLoading?: boolean
  isDisabled?: boolean
  renderRecentActivityButton?: boolean
  type: 'invoices' | 'payment_groups' | 'payments'
}

// https://staging.toptal.net/platform/staff/payments/1225818/performed_actions?comments=true

export const DetailsHeader = ({
  MoreActions,
  gid,
  isLoading,
  isDisabled,
  renderRecentActivityButton,
  type
}: Props) => {
  const { t: translate } = useTranslation('common')

  const recentActivityText = translate('actions.history.label')

  return (
    <>
      {renderRecentActivityButton && (
        <Container left='small' data-testid='RecentActivityButton-container'>
          <BillingRecentActivityButton
            gid={gid}
            type={type}
            content={recentActivityText}
          />
        </Container>
      )}
      {MoreActions && (
        <Container left='small'>
          <Dropdown
            content={MoreActions}
            data-testid={`${displayName}-more-actions`}
          >
            <Button
              data-testid={`${displayName}-more-actions-button`}
              variant='secondary'
              size='small'
              disabled={isDisabled}
              loading={isLoading}
            >
              {translate('actions.more')}
              <Dropdown.Arrow />
            </Button>
          </Dropdown>
        </Container>
      )}
    </>
  )
}

DetailsHeader.displayName = displayName

export default DetailsHeader
