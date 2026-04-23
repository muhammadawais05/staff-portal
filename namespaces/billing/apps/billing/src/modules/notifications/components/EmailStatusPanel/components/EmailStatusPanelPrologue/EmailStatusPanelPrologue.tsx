import { Container, Typography } from '@toptal/picasso'
import React, { FC, memo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Maybe, Scalars } from '@staff-portal/graphql/staff'
import {
  formatDateMedWithTime,
  formatDateMed,
  isBefore
} from '@staff-portal/billing/src/_lib/dateTime'

const displayName = 'EmailStatusPanelPrologue'

interface Props {
  nodeType: 'invoice' | 'payment'
  hasEmails: boolean
  monitoringStartDate?: Maybe<Scalars['Date']>
  notificationSentAt?: Maybe<Scalars['Date']>
}

const EmailStatusPanelPrologue: FC<Props> = memo(
  ({
    nodeType,
    hasEmails,
    monitoringStartDate = '',
    notificationSentAt = ''
  }) => {
    const { t: translate } = useTranslation('emailStatus')

    if (!notificationSentAt) {
      return null
    }

    const isMonitored =
      !!monitoringStartDate &&
      !!notificationSentAt &&
      !isBefore({ start: monitoringStartDate, end: notificationSentAt })

    return (
      <div data-testid={displayName}>
        <Container bottom='small'>
          <Typography size='xsmall' data-testid={`${displayName}-timestamp`}>
            <Trans
              values={{
                date: formatDateMedWithTime(notificationSentAt)
              }}
              components={[
                <Typography weight='semibold' as='span' key='timestamp'>
                  {formatDateMedWithTime(notificationSentAt)}
                </Typography>
              ]}
              i18nKey='emailSentTimestamp'
              t={translate}
            />
          </Typography>
        </Container>

        {!isMonitored && monitoringStartDate && (
          <Container bottom='small'>
            <Typography
              size='xsmall'
              data-testid={`${displayName}-unmonitored`}
            >
              {translate(`status.${nodeType}.notAvailable` as const, {
                date: formatDateMed(monitoringStartDate)
              })}
            </Typography>
          </Container>
        )}

        {isMonitored && !hasEmails && (
          <Container bottom='small'>
            <Typography
              size='xsmall'
              data-testid={`${displayName}-awaiting-confirmation`}
            >
              {translate('awaitingConfirmation')}
            </Typography>
          </Container>
        )}
      </div>
    )
  }
)

EmailStatusPanelPrologue.displayName = displayName

export default EmailStatusPanelPrologue
