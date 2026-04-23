import React, { useRef } from 'react'
import { Button, Container, Modal } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { ModalForm } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import CustomSignerFields from '../CustomSignerFields/CustomSignerFields'
import { adjustValues } from './services/adjustValues'
import { SendStaFormValues } from './types/send-sta-form-values'
import { DefaultContactFragment } from '../../../../data/default-contact-fragment/default-contact-fragment.staff.gql.types'
import { SendStaDocument } from '../../data/send-sta/send-sta.staff.gql.types'

interface Props {
  clientId: string
  defaultContact: DefaultContactFragment
  isSubsidiarySelected: boolean
  hideModal: () => void
  signerFullName?: string | null
  signerEmail?: string | null
}

const SendStaForm = ({
  clientId,
  hideModal,
  defaultContact: { fullName, email },
  isSubsidiarySelected,
  signerFullName,
  signerEmail
}: Props) => {
  const { loading, handleSubmitExtended } = useModalFormChangeHandler({
    mutationDocument: SendStaDocument,
    mutationResultOptions: {
      onSuccessAction: hideModal,
      successNotificationMessage: 'STA has been sent.'
    },
    errorNotificationMessage: 'Unable to send the STA'
  })
  const isCustomSigner = signerEmail !== email || signerFullName !== fullName
  const { current: initialValues } = useRef<SendStaFormValues>({
    customSigner: isCustomSigner ? 'true' : 'false',
    signerFullName: signerFullName || '',
    signerEmail: signerEmail || ''
  })

  return (
    <ModalForm<SendStaFormValues>
      title='Send Sourced Talent Agreement'
      onSubmit={values =>
        handleSubmitExtended(
          adjustValues(values, clientId, isSubsidiarySelected)
        )
      }
      initialValues={initialValues}
    >
      <Modal.Content>
        <Container bottom='large'>
          <Form.RadioGroup name='customSigner' label='Legal Contact:'>
            <Form.Radio
              label={`Account Contact (${fullName} at ${email})`}
              value='false'
              // otherwise, email address is capitalized
              titleCase={false}
            />
            <Form.Radio label='Custom legal contact' value='true' />
          </Form.RadioGroup>
          <CustomSignerFields />
        </Container>
      </Modal.Content>

      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>

        <Form.SubmitButton variant='positive'>Send STA</Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default SendStaForm
