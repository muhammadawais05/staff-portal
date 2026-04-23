import { Container, Tooltip, Info16 } from '@toptal/picasso'
import React, { FC, memo } from 'react'
import { useTranslation } from 'react-i18next'
import WebResourceLinkWrapper from '@staff-portal/billing/src/components/WebResourceLinkWrapper'
import { WebResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql.types'

const displayName = 'PurchaseOrderDetailsTableCompany'

interface Props {
  shared: boolean
  client: { webResource: WebResourceFragment }
}

const PurchaseOrderDetailsTableCompany: FC<Props> = memo<Props>(
  ({ shared, client }) => {
    const { t: translate } = useTranslation('purchaseOrder')

    return (
      <Container as='span' flex alignItems='center' inline>
        <WebResourceLinkWrapper
          webResource={client.webResource}
          weight='semibold'
          size='medium'
        />
        {shared && (
          <Tooltip
            content={translate('page.details.shared')}
            data-testid='shared-icon'
          >
            <Container as='span' left='xsmall' flex alignItems='center'>
              <Info16
                color='black'
                data-testid={`${displayName}-shared-icon`}
              />
            </Container>
          </Tooltip>
        )}
      </Container>
    )
  }
)

PurchaseOrderDetailsTableCompany.displayName = displayName

export default PurchaseOrderDetailsTableCompany
