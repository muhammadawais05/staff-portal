import React, { FC, memo } from 'react'
import { Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'

import { GetPurchaseOrdersOptionsQuery } from '../../data/getPurchaseOrdersOptions.graphql.types'
import { PurchaseOrderLineSelect } from '../PurchaseOrderLineSelect'

interface Props {
  currentPOid?: string
  data: NonNullable<
    GetPurchaseOrdersOptionsQuery['node']
  >['client']['purchaseOrdersNullable']
}

const PurchaseOrderLineEditForm: FC<Props> = memo<Props>(
  ({ currentPOid, data }) => {
    const { t: translate } = useTranslation('billingSettings')

    return (
      <Container top='small' right='small' left='small'>
        <FormBaseErrorContainer />
        <PurchaseOrderLineSelect
          currentPOid={currentPOid}
          data={data}
          width='full'
          poPlaceholder={translate(
            'forms.purchaseOrder.fields.autocomplete.placeholder'
          )}
          poLabel={translate('forms.purchaseOrder.fields.autocomplete.label')}
          poLinePlaceholder={translate(
            'forms.purchaseOrder.fields.poLines.placeholder'
          )}
          poLineLabel={translate('forms.purchaseOrder.fields.poLines.label')}
        />
        <Form.Input
          multiline
          autoFocus
          placeholder={translate(
            'forms.purchaseOrder.fields.comment.placeholder'
          )}
          rowsMin={4}
          width='full'
          name='comment'
          data-testid='PurchaseOrderLineEditForm-comment'
          label={translate('forms.purchaseOrder.fields.comment.label')}
          required
        />
      </Container>
    )
  }
)

export default PurchaseOrderLineEditForm
