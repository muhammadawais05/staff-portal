import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { DetailedList } from '@staff-portal/ui'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { positiveNumberOrEmpty } from '@staff-portal/validators'
import { formatAmount } from '@toptal/picasso/utils'
import {
  Scalars,
  UpdatePurchaseOrderLineInput
} from '@staff-portal/graphql/staff'
import { isOperationDisabled } from '@staff-portal/operations'
import WebResourceLinkWrapper from '@staff-portal/billing/src/components/WebResourceLinkWrapper'
import { EditableField, EditableNumberInput } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import {
  EMPTY_DATA,
  formatAsPercentage
} from '@staff-portal/billing/src/_lib/helpers'
import { formatDateFull } from '@staff-portal/billing/src/_lib/dateTime/format'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'

import { GetPurchaseOrderLineDetailsNodeFragment } from '../../data/getPurchaseOrderLineDetails.graphql.types'
import { getPropertyValue, adjustAmount, adjustThreshold } from '../utils'
import { SetUpdatePurchaseOrderLineDocument } from '../../data/setUpdatePurchaseOrderLine.graphql.types'
import PurchaseOrderAmount from '../../../../components/PurchaseOrderAmount'
import PurchaseOrderDetailsTableCompany from '../../../PurchaseOrderDetails/components/PurchaseOrderDetailsTableCompany'
import { blackColor } from './styles'

interface Props {
  purchaseOrderLine: GetPurchaseOrderLineDetailsNodeFragment
}

const PurchaseOrderLineDetailsTableContent: FC<Props> = memo<Props>(
  ({ purchaseOrderLine }: Props) => {
    const purchaseOrderLineId = purchaseOrderLine.id
    const { t: translate } = useTranslation('purchaseOrder')
    const disabled = isOperationDisabled(
      purchaseOrderLine.operations.updatePurchaseOrderLine
    )

    const { totalAmount, poLineNumber, draftedAmount, threshold, expiryDate } =
      purchaseOrderLine
    const { handleOnSuccess } = useFormSubmission()

    const handleOnChange = useEditableFieldChangeHandler({
      mutationDocument: SetUpdatePurchaseOrderLineDocument,
      initialValues: {
        amount: totalAmount,
        threshold,
        expiryDate
      },
      requiredValues: { purchaseOrderLineId },
      mutationResultOptions: {
        onSuccessAction: handleOnSuccess({
          apolloEvent: ApolloContextEvents.purchaseOrderUpdate
        })
      }
    })

    return (
      <DetailedList>
        <DetailedList.Row>
          <DetailedList.Item label={translate('page.details.company')}>
            <PurchaseOrderDetailsTableCompany
              client={purchaseOrderLine.client}
              shared={false}
            />
          </DetailedList.Item>
          <DetailedList.Item label={translate('page.details.invoicedTotal')}>
            <PurchaseOrderAmount purchaseOrder={purchaseOrderLine} />
          </DetailedList.Item>
        </DetailedList.Row>
        <DetailedList.Row>
          <DetailedList.Item label={translate('page.details.amount')}>
            <EditableField<Pick<UpdatePurchaseOrderLineInput, 'amount'>>
              css={blackColor}
              queryValue={getPropertyValue(purchaseOrderLineId, 'totalAmount')}
              adjustValues={adjustAmount}
              data-testid='amount'
              name='amount'
              onChange={handleOnChange}
              disabled={disabled}
              value={totalAmount ?? undefined}
              viewer={
                totalAmount
                  ? formatAmount({
                      amount: totalAmount
                    })
                  : EMPTY_DATA
              }
              updateOnBlur
              editor={props => (
                <EditableNumberInput
                  // type='text' passed for displaying dot as decimal separator
                  // TODO: remove type='text' after https://toptal-core.atlassian.net/browse/FX-1703
                  {...props}
                  validate={positiveNumberOrEmpty}
                  type='text'
                  hideControls
                />
              )}
            />
          </DetailedList.Item>
          <DetailedList.Item label={translate('page.details.draftedTotal')}>
            {formatAmount({ amount: draftedAmount })}
          </DetailedList.Item>
        </DetailedList.Row>
        <DetailedList.Row>
          <DetailedList.Item label={translate('page.details.poNumber')}>
            {poLineNumber}
          </DetailedList.Item>
          <DetailedList.Item label={translate('page.details.expirationDate')}>
            <EditableField<Pick<UpdatePurchaseOrderLineInput, 'expiryDate'>>
              css={blackColor}
              queryValue={getPropertyValue(purchaseOrderLineId, 'expiryDate')}
              name='expiryDate'
              data-testid='expiryDate'
              onChange={handleOnChange}
              disabled={disabled}
              updateOnBlur
              viewer={expiryDate ? formatDateFull(expiryDate) : EMPTY_DATA}
              editor={({ value, ...props }) => (
                <FormDatePickerWrapper
                  value={value as Scalars['Date']}
                  {...props}
                  defaultValue={expiryDate}
                  autoFocus
                  width='full'
                />
              )}
            />
          </DetailedList.Item>
        </DetailedList.Row>
        <DetailedList.Row>
          <DetailedList.Item label={translate('page.details.threshold')}>
            <EditableField<Pick<UpdatePurchaseOrderLineInput, 'threshold'>>
              css={blackColor}
              queryValue={getPropertyValue(purchaseOrderLineId, 'threshold')}
              data-testid='threshold'
              name='threshold'
              onChange={handleOnChange}
              disabled={disabled}
              value={threshold ?? undefined}
              adjustValues={adjustThreshold}
              viewer={threshold ? formatAsPercentage(threshold) : EMPTY_DATA}
              updateOnBlur
              editor={props => (
                <EditableNumberInput
                  {...props}
                  // type='text' passed for displaying dot as decimal separator
                  // TODO: remove type='text' after https://toptal-core.atlassian.net/browse/FX-1703
                  type='text'
                  autoFocus
                  width='full'
                  validate={positiveNumberOrEmpty}
                />
              )}
            />
          </DetailedList.Item>
          <DetailedList.Item label={translate('page.details.mainPO')}>
            <WebResourceLinkWrapper
              webResource={purchaseOrderLine.purchaseOrder.webResource}
            />
          </DetailedList.Item>
        </DetailedList.Row>
      </DetailedList>
    )
  }
)

export default PurchaseOrderLineDetailsTableContent
