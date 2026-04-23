import React, { FC, memo } from 'react'
import { Trans } from 'react-i18next'
import { Container, Typography } from '@toptal/picasso'
import { formatAmount } from '@toptal/picasso/utils'
import { InvoiceKind, Maybe } from '@staff-portal/graphql/staff'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'
import i18n from '@staff-portal/billing/src/utils/i18n'
import LinkWrapper from '@staff-portal/billing/src/components/LinkWrapper'
import { MemorandumBaseItemFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/memorandumBaseFragment.graphql.types'

const displayName = 'MemorandumListDescription'

interface Props {
  portions?: MemorandumBaseItemFragment[]
}

const MemorandumListDescription: FC<Props> = memo<Props>(({ portions }) => {
  if (!portions?.length) {
    return null
  }

  return (
    <Container top='xsmall'>
      {portions.map(({ id, amount, document, allocatedAt }) => {
        const isConsolidated =
          (document as Maybe<{ invoiceKind?: InvoiceKind }>)?.invoiceKind ===
          InvoiceKind.CONSOLIDATED
        const DocumentComponent = (
          <LinkWrapper
            data-testid={`${displayName}-document`}
            href={document?.webResource?.url}
          />
        )

        const ConsolidatedMarkComponent = isConsolidated && (
          <Typography as='span' size='xsmall' color='grey' />
        )

        return (
          <Container key={id} data-testid={displayName}>
            <Typography>
              <Trans
                data-testid={`${displayName}-description`}
                i18nKey='memorandumList:table.item.description.portion'
                values={{
                  consolidated: isConsolidated
                    ? ` ${i18n.t(
                        'memorandumList:table.item.description.consolidated'
                      )}`
                    : undefined,
                  documentNumber: document?.documentNumber,
                  amount: formatAmount({ amount }),
                  date: formatDateMed(allocatedAt || '')
                }}
                components={[DocumentComponent, ConsolidatedMarkComponent]}
              />
            </Typography>
          </Container>
        )
      })}
    </Container>
  )
})

MemorandumListDescription.displayName = displayName

export default MemorandumListDescription
