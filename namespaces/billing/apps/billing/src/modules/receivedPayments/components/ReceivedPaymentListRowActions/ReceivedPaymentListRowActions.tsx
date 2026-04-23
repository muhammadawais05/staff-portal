import { Dropdown, Button, Menu } from '@toptal/picasso'
import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Overview16 } from '@toptal/picasso/Icon'
import { MenuLink } from '@staff-portal/ui'
import * as styles from '@staff-portal/billing/src/components/Actions/components/ActionsList/styles'
import { PaymentListItemFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/paymentListItemFragment.graphql.types'

const displayName = 'ReceivedPaymentListRowActions'

interface PaymentListRowProps {
  payment: PaymentListItemFragment
}

const ReceivedPaymentListRowActions: FC<PaymentListRowProps> =
  memo<PaymentListRowProps>(
    ({ payment: { downloadHtmlUrl, downloadPdfUrl } }) => {
      const { t: translate } = useTranslation('payment')

      const hasAllLinks = downloadHtmlUrl && downloadPdfUrl

      return (
        <Dropdown
          content={
            hasAllLinks ? (
              <Menu data-testid={displayName} css={styles.menuWidth}>
                <Menu.Item
                  as={MenuLink}
                  data-testid={translate('actions.downloadHtmlUrl')}
                  target='_blank'
                  href={downloadHtmlUrl as string}
                  rel='noreferrer'
                >
                  {translate('actions.downloadHtmlUrl')}
                </Menu.Item>
                <Menu.Item
                  as={MenuLink}
                  target='_blank'
                  data-testid={translate('actions.downloadPdfUrl')}
                  href={downloadPdfUrl as string}
                  rel='noreferrer'
                >
                  {translate('actions.downloadPdfUrl')}
                </Menu.Item>
              </Menu>
            ) : null
          }
        >
          <Button.Circular
            data-testid='more-actions-button'
            icon={<Overview16 />}
            variant='flat'
            disabled={!hasAllLinks}
          />
        </Dropdown>
      )
    }
  )

ReceivedPaymentListRowActions.displayName = displayName

export default ReceivedPaymentListRowActions
