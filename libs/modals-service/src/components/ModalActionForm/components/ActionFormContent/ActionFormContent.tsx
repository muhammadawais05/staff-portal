import React, { ReactNode } from 'react'
import { Button } from '@toptal/picasso'
import { Form, SubmissionErrors } from '@toptal/picasso-forms'
import { Dictionary } from '@staff-portal/utils'
import { VariantType } from '@toptal/picasso/Button'
import { FormErrors } from '@staff-portal/mutation-result-handlers'

import Modal from '../../../Modal'
import ModalForm from '../../../ModalForm'
import ModalSuspender from '../../../ModalSuspender'

export type Props<TFormValues extends Dictionary> = {
  children: ReactNode
  title: string
  variant?: VariantType
  initialLoading: boolean
  loading: boolean
  mutationLoading: boolean
  initialValues?: Partial<TFormValues>
  submitText: string
  cancelText: string
  onSubmit: (
    formValues: TFormValues
  ) => Promise<SubmissionErrors | FormErrors | void>
  onClose: () => void
  testIds?: {
    closeButton?: string
    submitButton?: string
  }
}

const ActionFormContent = <TFormValues extends Dictionary>({
  children,
  title,
  variant,
  initialLoading,
  loading,
  initialValues,
  mutationLoading,
  submitText,
  cancelText,
  onSubmit,
  onClose,
  testIds: {
    closeButton: closeButtonTestId = 'action-form-content-cancel-button',
    submitButton: submitButtonTestId = 'action-form-content-submit-button'
  } = {}
}: Props<TFormValues>) => {
  const suspenderElement = <ModalSuspender />

  if (initialLoading) {
    return suspenderElement
  }

  return (
    <ModalForm<TFormValues>
      title={title}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <Modal.Content>{children}</Modal.Content>
      <Modal.Actions>
        <Button
          variant='secondary'
          data-testid={closeButtonTestId}
          onClick={onClose}
          disabled={loading || mutationLoading}
        >
          {cancelText}
        </Button>
        <Form.SubmitButton
          data-testid={submitButtonTestId}
          loading={loading || mutationLoading}
          variant={variant}
        >
          {submitText}
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default ActionFormContent
