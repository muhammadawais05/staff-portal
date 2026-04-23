import { Modal } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import React, { useRef } from 'react'
import { Form, FormSpy } from '@toptal/picasso-forms'
import { FormBaseErrorContainer } from '@staff-portal/billing'

import { CompanyOverviewFragment } from '../../../../../../data'
import useUpdateLegalContact from '../../hooks/use-update-legal-contact'
import { adjustValues } from '../../utils/adjust-values'

export type UpdateLegalContactModalProps = {
  clientId: string
  hideModal: () => void
} & Pick<CompanyOverviewFragment, 'signerEmail' | 'signerFullName' | 'contact'>

export type UpdateLegalContactModalFormInput = {
  customSigner: string
  signerFullName?: string
  signerEmail?: string
}

const UpdateLegalContactModal = ({
  clientId,
  contact,
  hideModal,
  signerEmail,
  signerFullName
}: UpdateLegalContactModalProps) => {
  const { fullName, email } = contact ?? {}
  const { handleSubmit, loading } = useUpdateLegalContact(hideModal)
  const isCustomSigner = signerEmail !== email || signerFullName !== fullName
  const { current: initialValues } = useRef<UpdateLegalContactModalFormInput>({
    customSigner: isCustomSigner ? 'true' : 'false',
    signerFullName: signerFullName || '',
    signerEmail: signerEmail || ''
  })

  return (
    <Modal
      withForm
      open
      onClose={hideModal}
      data-testid='UpdateLegalContactModal'
    >
      <Form<UpdateLegalContactModalFormInput>
        data-testid='UpdateLegalContactModal-form'
        initialValues={initialValues}
        onSubmit={variables =>
          handleSubmit(adjustValues({ clientId, ...variables }))
        }
      >
        <Modal.Title data-testid='UpdateLegalContactModal-title'>
          Update Legal Contact Details
        </Modal.Title>
        <Modal.Content>
          <FormBaseErrorContainer fieldErrorKeys={['fullName']} />
          <Form.RadioGroup
            data-testid='UpdateLegalContactModal-customSigner'
            name='customSigner'
            label='Legal contact'
            required
          >
            <Form.Radio
              label={`Account contact (${fullName} at ${email})`}
              value='false'
            />
            <Form.Radio label='Custom legal contact' value='true' />
          </Form.RadioGroup>
          <FormSpy subscription={{ values: true }}>
            {({ values }) =>
              values.customSigner === 'true' && (
                <>
                  <Form.Input
                    width='full'
                    name='signerFullName'
                    label='Full name'
                    required
                  />
                  <Form.Input
                    width='full'
                    name='signerEmail'
                    label='Email'
                    required
                  />
                </>
              )
            }
          </FormSpy>
        </Modal.Content>
        <Modal.Actions>
          <Button variant='secondary' disabled={loading} onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton variant='positive' loading={loading}>
            Update
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default UpdateLegalContactModal
