import React from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import {
  BillingMethodName,
  UpdateBillingOptionInput
} from '@staff-portal/graphql/staff'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

interface Props {
  handleOnSubmit: (input: UpdateBillingOptionInput) => void
  billingMethod?: BillingMethodName
  initialValues:
    | Pick<UpdateBillingOptionInput, 'nameOnAccount' | 'bankName'>
    | Pick<UpdateBillingOptionInput, 'username' | 'businessName'>
  title: string
}

const displayName = 'BillingOptionUpdateModalForm'

const BillingOptionUpdateModalForm = ({
  handleOnSubmit,
  billingMethod,
  initialValues,
  title
}: Props) => {
  const { t: translate } = useTranslation(['billingDetails', 'common'])

  return (
    <Form<UpdateBillingOptionInput>
      data-testid={`${displayName}-form`}
      onSubmit={handleOnSubmit}
      initialValues={initialValues}
    >
      <Modal.Title data-testid={`${displayName}-title`}>{title}</Modal.Title>
      <Modal.Content>
        <FormBaseErrorContainer />
        {billingMethod === BillingMethodName.WIRE && (
          <>
            <Form.Input
              width='full'
              name='nameOnAccount'
              data-testid={`${displayName}-nameOnAccount`}
              label={translate(
                'billingDetails:modals.billingOptionUpdate.fields.nameOnAccount.label'
              )}
              required
            />
            <Form.Input
              width='full'
              name='bankName'
              data-testid={`${displayName}-bankName`}
              label={translate(
                'billingDetails:modals.billingOptionUpdate.fields.bankName.label'
              )}
              required
            />
          </>
        )}
        {billingMethod === BillingMethodName.PAYPAL && (
          <>
            <Form.Input
              width='full'
              name='username'
              data-testid={`${displayName}-username`}
              label={translate(
                'billingDetails:modals.billingOptionUpdate.fields.username.label'
              )}
              required
            />
            <Form.Input
              width='full'
              name='businessName'
              data-testid={`${displayName}-businessName`}
              label={translate(
                'billingDetails:modals.billingOptionUpdate.fields.businessName.label'
              )}
              required
            />
          </>
        )}
      </Modal.Content>
      <ModalFooter>
        <Form.SubmitButton data-testid='submit' variant='positive'>
          {translate('common:actions.update')}
        </Form.SubmitButton>
      </ModalFooter>
    </Form>
  )
}

BillingOptionUpdateModalForm.displayName = displayName

export default BillingOptionUpdateModalForm
