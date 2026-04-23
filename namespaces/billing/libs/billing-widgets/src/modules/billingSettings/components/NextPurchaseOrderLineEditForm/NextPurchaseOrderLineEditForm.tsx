import React, { FC, memo } from 'react'
import { Container } from '@toptal/picasso'
import { Form, useFormState, useForm } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'

import { useGetPurchaseOrderFormState } from '../../utils'
import { GetPurchaseOrdersOptionsQuery } from '../../data/getPurchaseOrdersOptions.graphql.types'

interface Props {
  currentPOid?: string
  data: NonNullable<
    GetPurchaseOrdersOptionsQuery['node']
  >['client']['purchaseOrdersNullable']
}

const NextPurchaseOrderLineEditForm: FC<Props> = memo<Props>(
  ({ currentPOid, data }) => {
    const { t: translate } = useTranslation('billingSettings')
    const { modalContainer } = useExternalIntegratorContext()
    const { change } = useForm()
    const { values } = useFormState()

    const { purchaseOrderLines, purchaseOrders, visiblePurchaseOrderLines } =
      useGetPurchaseOrderFormState({
        currentPOid,
        values,
        change,
        poLineFieldName: 'nextPurchaseOrderLineId',
        poFieldName: 'nextPurchaseOrderId',
        data
      })

    return (
      <Container top='small' right='small' left='small'>
        <FormBaseErrorContainer />
        <Form.Select
          autoFocus={false}
          data-testid='autocomplete'
          placeholder={translate(
            'forms.nextPurchaseOrder.fields.autocomplete.placeholder'
          )}
          label={translate('forms.nextPurchaseOrder.fields.autocomplete.label')}
          enableReset
          name='nextPurchaseOrderId'
          options={purchaseOrders}
          popperContainer={modalContainer}
          searchThreshold={0}
          width='full'
        />
        {visiblePurchaseOrderLines && (
          <Form.Select
            autoFocus={false}
            data-testid='next-purchase-order-line'
            placeholder={translate(
              'forms.purchaseOrder.fields.poLines.placeholder'
            )}
            label={translate('forms.purchaseOrder.fields.poLines.label')}
            enableReset
            name='nextPurchaseOrderLineId'
            options={purchaseOrderLines}
            popperContainer={modalContainer}
            searchThreshold={0}
            width='full'
          />
        )}
        <Form.Input
          multiline
          autoFocus
          placeholder={translate(
            'forms.purchaseOrder.fields.comment.placeholder'
          )}
          rowsMin={4}
          width='full'
          name='comment'
          data-testid='comment'
          label={translate('forms.purchaseOrder.fields.comment.label')}
          required
        />
      </Container>
    )
  }
)

export default NextPurchaseOrderLineEditForm
