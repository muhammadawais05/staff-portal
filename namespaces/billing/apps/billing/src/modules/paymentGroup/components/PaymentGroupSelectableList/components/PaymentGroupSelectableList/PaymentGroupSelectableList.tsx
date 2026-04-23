import { Table } from '@toptal/picasso'
import { useForm } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import React, { FC, memo, useEffect } from 'react'
import { SelectableTableHeaderCheckboxCell } from '@staff-portal/forms'

import * as S from './styles'
import { PaymentGroupItemFragment } from '../../../../data'
import PaymentGroupSelectableListRow from '../PaymentGroupSelectableListRow'

const displayName = 'PaymentGroupSelectableList'

interface Props {
  paymentGroups: PaymentGroupItemFragment[]
  selectionEnabled: boolean
}

const PaymentGroupSelectableList: FC<Props> = memo<Props>(
  ({ paymentGroups, selectionEnabled = false }) => {
    const { t: translate } = useTranslation('paymentGroupList')
    const { change } = useForm()
    const paymentGroupIds = paymentGroups.map(({ id }) => id)

    // reselect all payment groups after a mutation
    useEffect(() => {
      change('isEverythingSelected', true)
      change('paymentGroupIds', paymentGroupIds)
    }, [paymentGroupIds, change])

    return (
      <Table css={S.table}>
        <Table.Head>
          <Table.Row>
            {selectionEnabled && (
              <SelectableTableHeaderCheckboxCell
                data-testid={`${displayName}-checkbox-all`}
                fieldName='paymentGroupIds'
                selectableIds={paymentGroupIds}
                style={S.headerCellSelector}
              />
            )}
            <Table.Cell css={S.headerCellId}>
              {translate('table.head.id')}
            </Table.Cell>
            <Table.Cell css={S.headerCellRecipient}>
              {translate('table.head.payee')}
            </Table.Cell>
            <Table.Cell css={S.headerCellAmount}>
              {translate('table.head.amount')}
            </Table.Cell>
            <Table.Cell css={S.headerCellDate}>
              {translate('table.head.date')}
            </Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {paymentGroups.map((paymentGroup, index: number) => (
            <PaymentGroupSelectableListRow
              key={paymentGroup.id}
              index={index}
              paymentGroup={paymentGroup}
              selectionEnabled={selectionEnabled}
            />
          ))}
        </Table.Body>
      </Table>
    )
  }
)

PaymentGroupSelectableList.displayName = displayName

export default PaymentGroupSelectableList
