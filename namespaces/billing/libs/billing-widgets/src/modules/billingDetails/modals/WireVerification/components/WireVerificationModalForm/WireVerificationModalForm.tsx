import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography, Container, Modal } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import {
  VerifyWireBillingOptionInput,
  UnverifyWireBillingOptionInput
} from '@staff-portal/graphql/staff'
import FormBaseErrorContainer from '@staff-portal/billing/src/components/FormBaseErrorContainer'
import ModalFooter from '@staff-portal/billing/src/components/ModalFooter'

type VerificationWireBillingOptionInput =
  | VerifyWireBillingOptionInput
  | UnverifyWireBillingOptionInput

interface Props {
  handleOnSubmit: (input: VerificationWireBillingOptionInput) => void
  isVerify: boolean
}

const displayName = 'WireVerificationModalForm'

const WireVerificationModalForm = ({ handleOnSubmit, isVerify }: Props) => {
  const { t: translate } = useTranslation(['billingDetails', 'common'])

  return (
    <Form<VerificationWireBillingOptionInput>
      data-testid={`${displayName}-form`}
      onSubmit={handleOnSubmit}
    >
      <Modal.Title data-testid={`${displayName}-title`}>
        {isVerify
          ? translate('billingDetails:modals.wireVerification.title.verify')
          : translate('billingDetails:modals.wireVerification.title.unverify')}
      </Modal.Title>
      <Modal.Content>
        <FormBaseErrorContainer />
        {!isVerify && (
          <Container bottom='small'>
            <Typography size='medium' data-testid={`${displayName}-message`}>
              {translate('billingDetails:modals.wireVerification.message')}
            </Typography>
          </Container>
        )}
        <Form.Input
          multiline
          rowsMin={4}
          width='full'
          name='comment'
          data-testid={`${displayName}-comment`}
          label={
            isVerify
              ? translate(
                  'billingDetails:modals.wireVerification.fields.comment.label.verify'
                )
              : translate(
                  'billingDetails:modals.wireVerification.fields.comment.label.unverify'
                )
          }
          placeholder={
            isVerify
              ? translate(
                  'billingDetails:modals.wireVerification.fields.comment.placeholder.verify'
                )
              : translate(
                  'billingDetails:modals.wireVerification.fields.comment.placeholder.unverify'
                )
          }
          required
        />
      </Modal.Content>
      <ModalFooter>
        <Form.SubmitButton data-testid='submit' variant='positive'>
          {isVerify
            ? translate('billingDetails:actions.verifyWireBillingOption.label')
            : translate(
                'billingDetails:actions.unverifyWireBillingOption.label'
              )}
        </Form.SubmitButton>
      </ModalFooter>
    </Form>
  )
}

WireVerificationModalForm.displayName = displayName

export default WireVerificationModalForm
