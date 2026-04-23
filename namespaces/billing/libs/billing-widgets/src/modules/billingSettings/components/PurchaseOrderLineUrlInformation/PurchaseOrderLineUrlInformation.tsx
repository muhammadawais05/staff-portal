import React, { memo } from 'react'
import { Container, Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import { TypographyOverflowLink } from '@staff-portal/ui'

import { BillingSettingsJobFragment } from '../../../__fragments__/billingSettingsJobFragment.graphql.types'

type Props = Partial<Pick<BillingSettingsJobFragment, 'purchaseOrderLine'>>

const PurchaseOrderLineUrlInformation = memo<Props>(({ purchaseOrderLine }) => {
  const { t: translate } = useTranslation('billingSettings')
  const hasPoLine = Boolean(purchaseOrderLine?.purchaseOrder?.id)

  const poUrl = purchaseOrderLine?.purchaseOrder?.webResource.url
  const poNumber = purchaseOrderLine?.purchaseOrder?.poNumber

  return (
    <Container flex data-testid='PurchaseOrderLineUrlInformation'>
      {hasPoLine ? (
        <>
          <Container flex direction='column' justifyContent='flex-start'>
            <Typography size='medium' data-testid='po-label'>
              {translate('invoice.fields.purchaseOrder.poSubLabel')}
            </Typography>
            <Typography size='medium' data-testid='po-line-label'>
              {translate('invoice.fields.purchaseOrder.poLineSubLabel')}
            </Typography>
          </Container>
          <Container flex direction='column' justifyContent='flex-start'>
            <TypographyOverflowLink size='medium' weight='semibold'>
              <LinkWrapper href={poUrl} data-testid='po-link'>
                {poNumber}
              </LinkWrapper>
            </TypographyOverflowLink>
            {hasPoLine && (
              <TypographyOverflowLink size='medium' weight='semibold'>
                <LinkWrapper
                  href={purchaseOrderLine?.webResource?.url}
                  data-testid='po-line-link'
                >
                  {purchaseOrderLine?.poLineNumber}
                </LinkWrapper>
              </TypographyOverflowLink>
            )}
          </Container>
        </>
      ) : (
        EMPTY_DATA
      )}
    </Container>
  )
})

export default PurchaseOrderLineUrlInformation
