import React, { memo, ComponentProps } from 'react'
import { Container, SpacingType, OverviewBlock } from '@toptal/picasso'
import { formatAmount } from '@toptal/picasso/utils'
import { snakeCase, camelCase } from 'lodash-es'
import { useTranslation } from 'react-i18next'
import { DocumentStatus, Maybe } from '@staff-portal/graphql/staff'
import { getDocumentStatusColor } from '@staff-portal/billing/src/_lib/helpers/billing'
import en from '@staff-portal/billing/src/translations/en'

import { CommercialDocumentTotals } from '../../utils'
import * as S from './styles'

const displayName = 'ListTotals'

interface Props<T = CommercialDocumentTotals> {
  containerTopSpacing?: SpacingType
  totals?: Maybe<T>
  sortOrder: (keyof T)[]
}

type Variant = ComponentProps<typeof OverviewBlock>['variant']

const ListTotals = ({
  containerTopSpacing = 'small',
  totals,
  sortOrder
}: Props) => {
  const { t: translate } = useTranslation('common')

  const sortedAndFilteredTotals = sortOrder.reduce((acc, currVal) => {
    const value = Number((totals || {})[currVal as keyof typeof totals])

    if (value > 0) {
      acc.push([currVal, value])
    }

    return acc
  }, [] as [keyof CommercialDocumentTotals, number][])

  if (!sortedAndFilteredTotals.length) {
    return null
  }

  return (
    <Container top={containerTopSpacing} data-testid={displayName}>
      <OverviewBlock.Group css={S.group}>
        <OverviewBlock.Row data-testid={`${displayName}-global-totals`}>
          {sortedAndFilteredTotals.map(([status, value]) => {
            const variant: Variant = `label-${getDocumentStatusColor(
              snakeCase(status).toUpperCase() as DocumentStatus
            )}`

            return (
              <OverviewBlock
                css={S.item({ has9Items: sortOrder.length >= 9 })}
                data-testid={`${displayName}-${status}`}
                value={formatAmount({ amount: value })}
                key={status}
                label={translate(
                  `documents.statuses.${
                    camelCase(
                      status
                    ) as keyof typeof en['common']['documents']['statuses']
                  }` as const
                )}
                variant={variant}
              />
            )
          })}
        </OverviewBlock.Row>
      </OverviewBlock.Group>
    </Container>
  )
}

ListTotals.displayName = displayName

export default memo(ListTotals)
