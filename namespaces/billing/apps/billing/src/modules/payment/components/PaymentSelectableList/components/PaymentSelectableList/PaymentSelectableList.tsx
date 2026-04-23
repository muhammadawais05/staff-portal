import { Table } from '@toptal/picasso'
import { useForm } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { FC, memo, useEffect } from 'react'
import { SelectableTableHeaderCheckboxCell } from '@staff-portal/forms'
import { PaymentListItemFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/paymentListItemFragment.graphql.types'

import * as S from './styles'
import PaymentSelectableListRow from '../PaymentSelectableListRow'

const displayName = 'PaymentSelectableList'

interface Props {
  payments: PaymentListItemFragment[]
  selectionEnabled: boolean
}

const PaymentSelectableList: FC<Props> = memo<Props>(
  ({ payments, selectionEnabled = false }) => {
    const { change } = useForm()
    const { t: translate } = useTranslation('paymentList')
    const paymentIds = payments.map(({ id }) => id)

    // reselect all payments after a mutation
    useEffect(() => {
      change('isEverythingSelected', true)
      change('paymentIds', paymentIds)
    }, [paymentIds, change])

    return (
      <Table css={S.table}>
        <Table.Head>
          <Table.Row>
            {selectionEnabled && (
              <SelectableTableHeaderCheckboxCell
                data-testid={`${displayName}-checkbox-all`}
                fieldName='paymentIds'
                selectableIds={paymentIds}
                style={S.headerCellSelector}
              />
            )}
            <Table.Cell css={S.headerCellId}>
              {translate('table.head.id')}
            </Table.Cell>
            <Table.Cell css={S.headerCellRecipient}>
              {translate('table.head.recipient')}
            </Table.Cell>
            <Table.Cell css={S.headerCellAmount}>
              {translate('table.head.amount')}
            </Table.Cell>
            <Table.Cell css={S.headerCellDate}>
              {translate('table.head.created')}
            </Table.Cell>
            <Table.Cell css={S.headerCellDescription}>
              {translate('table.head.description')}
            </Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {payments.map((payment, index: number) => (
            <PaymentSelectableListRow
              key={payment.id}
              index={index}
              payment={payment}
              selectionEnabled={selectionEnabled}
            />
          ))}
        </Table.Body>
      </Table>
    )
  }
)

PaymentSelectableList.displayName = displayName

export default PaymentSelectableList
