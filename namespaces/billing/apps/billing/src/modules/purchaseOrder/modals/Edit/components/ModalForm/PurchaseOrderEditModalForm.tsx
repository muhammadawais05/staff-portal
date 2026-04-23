import React, { FC, memo } from 'react'
import { Modal } from '@toptal/picasso'
import { Form, arrayMutators } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import { UpdatePurchaseOrderInput } from '@staff-portal/graphql/staff'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

import PurchaseOrderLinesFormContent from '../../../Create/components/PurchaseOrderLinesFormContent'

interface InitialValues extends Partial<UpdatePurchaseOrderInput> {
  clientName?: string
}

interface Props {
  handleOnSubmit: (values: UpdatePurchaseOrderInput) => void
  initialValues: InitialValues
}

const PurchaseOrderEditModalForm: FC<Props> = memo<Props>(
  ({ handleOnSubmit, initialValues }: Props) => {
    const { t: translate } = useTranslation('purchaseOrder')

    return (
      <Form<UpdatePurchaseOrderInput>
        keepDirtyOnReinitialize
        initialValues={initialValues}
        data-testid='PurchaseOrderEditModalForm'
        mutators={{ ...arrayMutators }}
        onSubmit={handleOnSubmit}
      >
        <Modal.Title data-testid='purchaseOrderModal-title'>
          {translate('editModal.title')}
        </Modal.Title>

        <Modal.Content>
          <FormBaseErrorContainer />
          <Form.Input
            disabled
            required
            data-testid='CompanyAutocomplete'
            label={translate('createModal.fields.client.label')}
            name='clientName'
            width='full'
          />
          <Form.Input
            disabled
            required
            data-testid='number'
            label={translate('createModal.fields.number.label')}
            name='number'
            width='full'
          />
          <PurchaseOrderLinesFormContent />
        </Modal.Content>
        <ModalFooter>
          <Form.SubmitButton data-testid='submit' variant='positive'>
            {translate('editModal.form.actions.submit')}
          </Form.SubmitButton>
        </ModalFooter>
      </Form>
    )
  }
)

export default PurchaseOrderEditModalForm
