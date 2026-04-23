import { Modal } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import { Form } from '@toptal/picasso-forms'
import React from 'react'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import { AssignPurchaseOrderLineInput } from '@staff-portal/graphql/staff'

import PurchaseOrderFields from '../PurchaseOrderFields'
import { GetPurchaseOrderLinesForInvoiceQuery } from '../../../../data/getPurchaseOrderLinesForInvoice.graphql.types'

export interface FormProps extends AssignPurchaseOrderLineInput {
  purchaseOrderId: string
}

export type Props = {
  invoice: Exclude<
    GetPurchaseOrderLinesForInvoiceQuery['node'],
    null | undefined
  >
  handleOnSubmit: (values: AssignPurchaseOrderLineInput) => void
}

const AssignPurchaseOrderModalForm = ({ invoice, handleOnSubmit }: Props) => {
  const { t: translate } = useTranslation('invoice')

  const { purchaseOrder, purchaseOrderLine } = invoice

  const purchaseOrderId =
    purchaseOrderLine?.purchaseOrder?.id ?? purchaseOrder?.id
  const purchaseOrderLineId = purchaseOrderLine?.id

  return (
    <Form<FormProps>
      onSubmit={handleOnSubmit}
      initialValues={{
        purchaseOrderId,
        purchaseOrderLineId
      }}
    >
      <Modal.Title data-testid='modal-title'>
        {translate('assignPurchaseOrderModal.title')}
      </Modal.Title>

      <Modal.Content>
        <FormBaseErrorContainer />

        <PurchaseOrderFields invoice={invoice} />
      </Modal.Content>

      <ModalFooter>
        <Form.SubmitButton data-testid='submit' variant='positive'>
          {translate('assignPurchaseOrderModal.actions.submit')}
        </Form.SubmitButton>
      </ModalFooter>
    </Form>
  )
}

export default AssignPurchaseOrderModalForm
