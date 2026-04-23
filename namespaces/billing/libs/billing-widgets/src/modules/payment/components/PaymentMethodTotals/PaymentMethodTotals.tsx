import React from 'react'
import { Container, OverviewBlock } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import { camelCase } from 'lodash-es'
import { BillingMethodName } from '@staff-portal/graphql/staff'
import { splitTotalsInChunks } from '@staff-portal/billing/src/utils/splitIntoChuncks'
import { EnumKeysToCamelCase } from '@staff-portal/billing/src/@types/types'

const displayName = 'PaymentMethodTotals'

interface Props {
  billingMethods?: {
    count: number
    billingMethod: BillingMethodName
  }[]
}

const PaymentMethodTotals = ({ billingMethods }: Props) => {
  const { t: translate } = useTranslation('paymentMethod')

  if (!billingMethods?.length) {
    return null
  }

  const processedBillingMethods = splitTotalsInChunks(billingMethods)

  return (
    <Container top='large' data-testid={displayName}>
      <OverviewBlock.Group>
        {processedBillingMethods.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <OverviewBlock.Row key={index}>
            {item.map(({ count, billingMethod }) => {
              const methodKey = camelCase(billingMethod) as EnumKeysToCamelCase<
                typeof BillingMethodName
              >

              return (
                <OverviewBlock
                  key={`billing-method-${methodKey}`}
                  value={count}
                  label={translate(methodKey)}
                />
              )
            })}
          </OverviewBlock.Row>
        ))}
      </OverviewBlock.Group>
    </Container>
  )
}

PaymentMethodTotals.displayName = displayName

export default PaymentMethodTotals
