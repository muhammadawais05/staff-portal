import { Amount, Container, Table, Typography } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { Option } from '@staff-portal/billing/src/@types/types'
import { formatDateMed } from '@staff-portal/billing/src/_lib/dateTime'

import * as S from './styles'
import { getSelectedOptionText } from './utils'
import { PlacementFeeInput } from '../AddModal/AddModal'
import { PurchaseOrderLinesSelect } from '../../../../job/utils'

const displayName = 'AddModalFormConfirm'

interface Props {
  totalAmount: number
  values: PlacementFeeInput
  purchaseOrders: Option[]
  purchaseOrderLines: PurchaseOrderLinesSelect
  isHidden: boolean
}

const AddModalFormConfirm: FC<Props> = memo(
  ({ totalAmount, values, purchaseOrders, isHidden, purchaseOrderLines }) => {
    const { t: translate } = useTranslation('placementFees')

    const isPoLineVisible = Boolean(values.purchaseOrderLineId)

    return (
      <Container css={S.wrapper(isHidden)}>
        <Typography size='medium' data-testid={`${displayName}-subtitle`}>
          {translate('AddModal.confirm.summaryStart')}{' '}
          <Amount amount={totalAmount} size='medium' weight='semibold' />{' '}
          {translate('AddModal.confirm.summaryEnd')}
        </Typography>
        <Container top={2}>
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Cell>
                  {translate('AddModal.fields.dueDate.label')}
                </Table.Cell>
                <Table.Cell>
                  {translate('AddModal.fields.amount.label')}
                </Table.Cell>
                <Table.Cell>
                  {translate('AddModal.fields.purchase.label')}
                </Table.Cell>
                {isPoLineVisible && (
                  <Table.Cell>
                    {translate('AddModal.fields.line.label')}
                  </Table.Cell>
                )}
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {values.installments.map(({ dueDate, amount }, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <Table.Row key={index}>
                  <Table.Cell data-testid={`${displayName}-dueDate`}>
                    {dueDate && formatDateMed(dueDate)}
                  </Table.Cell>
                  <Table.Cell data-testid={`${displayName}-amount`}>
                    {amount}
                  </Table.Cell>
                  <Table.Cell data-testid={`${displayName}-po`}>
                    {getSelectedOptionText(
                      purchaseOrders,
                      values.purchaseOrderId
                    )}
                  </Table.Cell>
                  {isPoLineVisible && (
                    <Table.Cell data-testid={`${displayName}-po`}>
                      {getSelectedOptionText(
                        purchaseOrderLines[values.purchaseOrderId as string] ||
                          [],
                        values.purchaseOrderLineId
                      )}
                    </Table.Cell>
                  )}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Container>
      </Container>
    )
  }
)

AddModalFormConfirm.displayName = displayName

export default AddModalFormConfirm
