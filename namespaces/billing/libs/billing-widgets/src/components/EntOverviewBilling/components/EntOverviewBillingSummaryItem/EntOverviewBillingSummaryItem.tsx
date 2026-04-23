import React, { FC, memo } from 'react'
import { Amount, OverviewBlock, OverviewBlockProps } from '@toptal/picasso'
import { camelCase } from 'lodash-es'
import { useTranslation } from 'react-i18next'
import { DocumentStatus } from '@staff-portal/graphql/staff'
import {
  SummaryItem,
  EnumKeysToCamelCase
} from '@staff-portal/billing/src/@types/types'
import { getDocumentStatusColor } from '@staff-portal/billing/src/_lib/helpers/billing'

const displayName = 'EntOverviewBillingSummaryItem'

export interface Props {
  item: SummaryItem
}

export const EntOverviewBillingSummaryItem: FC<Props> = memo(
  ({ item: { amount, status } }) => {
    const { t: translate } = useTranslation('common')

    const statusColor = getDocumentStatusColor(status)

    return (
      <OverviewBlock
        data-testid={displayName}
        value={
          <Amount
            amount={amount}
            color='inherit'
            size='inherit'
            weight='inherit'
            data-testid={`${displayName}-amount`}
          />
        }
        label={translate(
          `documents.statuses.${
            camelCase(status) as EnumKeysToCamelCase<typeof DocumentStatus>
          }` as const
        )}
        variant={`label-${statusColor}` as OverviewBlockProps['variant']}
      />
    )
  }
)

EntOverviewBillingSummaryItem.displayName = displayName

export default EntOverviewBillingSummaryItem
