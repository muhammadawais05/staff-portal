import React, { FC, memo } from 'react'
import { Section, Amount, Table, Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import { PurchaseOrderConnection } from '@staff-portal/graphql/staff'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'
import { getColorForAmountLeft } from '@staff-portal/billing/src/_lib/helpers/billing'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'

import * as S from './styles'
import EntOverviewEmpty from '../EntOverviewEmpty'
import EntOverviewExternalLink from '../EntOverviewExternalLink'

const displayName = 'EntOverviewBillingPurchaseOrdersTable'

export enum PurchaseOrdersTableVariant {
  closestToExpiration = 'closestToExpiration',
  closestToLimit = 'closestToLimit'
}

export interface Props {
  purchaseOrders: PurchaseOrderConnection | null
  variant: PurchaseOrdersTableVariant
}

const TableHead = Table.Head
const TableBody = Table.Body
const TableRow = Table.Row
const TableCell = Table.Cell

export const EntOverviewBillingPurchaseOrdersTable: FC<Props> = memo(
  ({ purchaseOrders, variant }) => {
    const { t: translate } = useTranslation('entOverview')

    const isClosestToExpiration =
      variant === PurchaseOrdersTableVariant.closestToExpiration

    return (
      <Section
        data-testid={displayName}
        title={translate(`billing.purchaseOrders.title.${variant}` as const)}
        titleSize='small'
      >
        {purchaseOrders?.nodes?.length ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell css={S.cell}>
                  {translate('billing.purchaseOrders.table.company')}
                </TableCell>
                <TableCell
                  css={S.cell}
                  align={isClosestToExpiration ? 'left' : 'right'}
                >
                  {translate(
                    `billing.purchaseOrders.table.${
                      isClosestToExpiration ? 'expiryDate' : 'amountLeft'
                    }` as const
                  )}
                </TableCell>
                <TableCell css={S.cell}>
                  {translate('billing.purchaseOrders.table.number')}
                </TableCell>
                <TableCell css={S.cell} align='right'>
                  {translate('billing.purchaseOrders.table.totalAmount')}
                </TableCell>
                <TableCell css={S.cell} align='right'>
                  {translate('billing.purchaseOrders.table.invoicedTotal')}
                </TableCell>
                <TableCell css={S.cell} align='right'>
                  {translate(
                    `billing.purchaseOrders.table.${
                      isClosestToExpiration ? 'amountLeft' : 'expiryDate'
                    }` as const
                  )}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchaseOrders.nodes.map(
                ({
                  id,
                  client: { webResource: clientWebResource },
                  expiryDate,
                  webResource: poWebResource,
                  totalAmount,
                  invoicedAmount,
                  threshold
                }) => {
                  const amountLeft =
                    Number(totalAmount) - Number(invoicedAmount)
                  const color = getColorForAmountLeft({
                    amountLeft,
                    threshold: Number(threshold),
                    totalAmount: Number(totalAmount)
                  })

                  const displayAmountLeft = (
                    <Typography color={color} as='span'>
                      <Amount amount={amountLeft} />
                    </Typography>
                  )

                  return (
                    <TableRow key={id} data-testid={`${displayName}-row`}>
                      <TableCell
                        css={S.cell}
                        data-testid={`${displayName}-cell`}
                      >
                        <EntOverviewExternalLink
                          webResource={clientWebResource}
                        />
                      </TableCell>
                      <TableCell
                        css={S.cell}
                        data-testid={`${displayName}-cell`}
                        align={isClosestToExpiration ? 'left' : 'right'}
                      >
                        {isClosestToExpiration ? (
                          <Typography color='red'>
                            {expiryDate && formatDateMed(expiryDate)}
                          </Typography>
                        ) : (
                          displayAmountLeft
                        )}
                      </TableCell>
                      <TableCell
                        css={S.cell}
                        data-testid={`${displayName}-cell`}
                      >
                        <EntOverviewExternalLink webResource={poWebResource} />
                      </TableCell>
                      <TableCell
                        css={S.cell}
                        data-testid={`${displayName}-cell`}
                        align='right'
                      >
                        {totalAmount ? (
                          <Amount amount={totalAmount} />
                        ) : (
                          EMPTY_DATA
                        )}
                      </TableCell>
                      <TableCell
                        css={S.cell}
                        data-testid={`${displayName}-cell`}
                        align='right'
                      >
                        <Amount amount={invoicedAmount} />
                      </TableCell>
                      <TableCell
                        css={S.cell}
                        data-testid={`${displayName}-cell`}
                        align='right'
                      >
                        <Typography color='red'>
                          {isClosestToExpiration ? (
                            displayAmountLeft
                          ) : (
                            <Typography color='red' as='span'>
                              {expiryDate && formatDateMed(expiryDate)}
                            </Typography>
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                }
              )}
            </TableBody>
          </Table>
        ) : (
          <EntOverviewEmpty />
        )}
      </Section>
    )
  }
)

EntOverviewBillingPurchaseOrdersTable.defaultProps = {}

EntOverviewBillingPurchaseOrdersTable.displayName = displayName

export default EntOverviewBillingPurchaseOrdersTable
