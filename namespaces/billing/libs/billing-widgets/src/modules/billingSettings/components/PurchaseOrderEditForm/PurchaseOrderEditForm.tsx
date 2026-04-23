import React, { FC, memo } from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'

import { useGetPurchaseOrdersOptions } from '../../data'
import { mapPurchaseOrdersToListOptions } from '../../utils'

const displayName = 'PurchaseOrderEditForm'

interface Props {
  jobId: string
  currentPOid?: string
  nextPOid?: string
}

const PurchaseOrderEditForm: FC<Props> = memo<Props>(
  ({ jobId, currentPOid, nextPOid }) => {
    const { t: translate } = useTranslation(['billingSettings', 'common'])
    const { modalContainer } = useExternalIntegratorContext()

    const { data, loading } = useGetPurchaseOrdersOptions(
      jobId,
      currentPOid ? [currentPOid] : [],
      nextPOid ? [nextPOid] : []
    )
    const purchaseOrders = mapPurchaseOrdersToListOptions(
      data?.client?.purchaseOrdersNullable
    )

    return (
      <Container top='small' right='small' left='small'>
        <FormBaseErrorContainer />
        <Form.Select
          autoFocus={false}
          data-testid={`${displayName}-autocomplete`}
          placeholder={translate(
            loading
              ? 'common:loader'
              : 'billingSettings:forms.purchaseOrder.fields.autocomplete.placeholder'
          )}
          label={translate(
            'billingSettings:forms.purchaseOrder.fields.autocomplete.label'
          )}
          enableReset
          name='purchaseOrderId'
          options={purchaseOrders}
          popperContainer={modalContainer}
          searchThreshold={0}
          loading={loading}
          width='full'
        />
        <Form.Input
          multiline
          autoFocus
          placeholder={translate(
            'billingSettings:forms.purchaseOrder.fields.comment.placeholder'
          )}
          rowsMin={4}
          width='full'
          name='comment'
          data-testid={`${displayName}-comment`}
          label={translate(
            'billingSettings:forms.purchaseOrder.fields.comment.label'
          )}
          required
        />
      </Container>
    )
  }
)

PurchaseOrderEditForm.displayName = displayName

export default PurchaseOrderEditForm
