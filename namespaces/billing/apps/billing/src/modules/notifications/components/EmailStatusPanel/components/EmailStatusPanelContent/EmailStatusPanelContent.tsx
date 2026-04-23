import { Container, Helpbox, Table } from '@toptal/picasso'
import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { camelCase } from 'lodash-es'
import { InvoiceNotificationUnsentReason } from '@staff-portal/graphql/staff'
import { EnumKeysToCamelCase } from '@staff-portal/billing/src/@types/types'

import * as S from './styles'
import { GetNotificationQuery } from '../../data/getNotification.graphql.types'
import EmailStatusPanelTableRow from '../EmailStatusPanelTableRow'
import EmailStatusPanelHeader from '../EmailStatusPanelHeader'
import EmailStatusPanelPrologue from '../EmailStatusPanelPrologue'

const displayName = 'EmailStatusPanelContent'

interface Props {
  data: Exclude<GetNotificationQuery['node'], null | undefined>
  nodeType: 'invoice' | 'payment'
}

const EmailStatusPanelContent: FC<Props> = memo(
  ({
    data: { notificationSentAt, monitoringStartDate, notifications },
    nodeType
  }) => {
    const { nodes } = notifications
    const invoiceUnsentReasonKey = (
      notifications as {
        unsentReasonKey: InvoiceNotificationUnsentReason
      }
    ).unsentReasonKey
    const { t: translate } = useTranslation('emailStatus')
    const hasEmails = !!nodes?.length

    return (
      <>
        <EmailStatusPanelPrologue
          nodeType={nodeType}
          hasEmails={hasEmails}
          monitoringStartDate={monitoringStartDate}
          notificationSentAt={notificationSentAt}
        />
        {hasEmails && (
          <Table css={S.table} data-testid={`${displayName}-table`}>
            <EmailStatusPanelHeader />
            <Table.Body>
              {nodes.map((notificationStatus, index) => (
                <EmailStatusPanelTableRow
                  key={notificationStatus.email + notificationStatus.status}
                  notificationStatus={notificationStatus}
                  isEven={Boolean(index % 2)}
                />
              ))}
            </Table.Body>
          </Table>
        )}
        {invoiceUnsentReasonKey && !hasEmails && (
          <Container bottom='small'>
            <Helpbox variant='yellow'>
              <Helpbox.Content data-testid={`${displayName}-unsentReason`}>
                {translate(
                  `unsentReason.${
                    camelCase(invoiceUnsentReasonKey) as EnumKeysToCamelCase<
                      typeof InvoiceNotificationUnsentReason
                    >
                  }` as const
                )}
              </Helpbox.Content>
            </Helpbox>
          </Container>
        )}
      </>
    )
  }
)

EmailStatusPanelContent.displayName = displayName

export default EmailStatusPanelContent
