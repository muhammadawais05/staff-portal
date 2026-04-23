import { Button, Container, SizeType, Typography } from '@toptal/picasso'
import { Form, SubmissionErrors } from '@toptal/picasso-forms'
import { VariantType } from '@toptal/picasso/Button'
import React, { ReactNode } from 'react'
import { GetLazyOperationVariables } from '@staff-portal/operations'
import { isMaxLength } from '@staff-portal/forms'

import Modal from '../Modal'
import ModalForm from '../ModalForm'

export interface Props {
  open?: boolean
  onSubmit: (
    value?: string,
    setSubmissionErrors?: (errors?: SubmissionErrors) => void
  ) => void
  onClose: () => void
  placeholder?: string
  title: string
  required?: boolean
  submitText?: string
  label?: string
  loading?: boolean
  variant: VariantType
  textFieldName?: string
  message?: ReactNode
  size?: SizeType<'small' | 'medium' | 'large'> | 'full-screen'
  operationVariables?: GetLazyOperationVariables
}

const ConfirmationModal = ({
  open = true,
  onSubmit,
  title,
  placeholder,
  required = false,
  submitText = 'Done',
  label,
  loading = false,
  variant = 'primary',
  textFieldName = 'value',
  size = 'small',
  message,
  onClose,
  operationVariables
}: Props) => {
  const handleSubmit = (
    values: Record<string, string>,
    form: unknown,
    setSubmissionErrors?: (errors?: SubmissionErrors) => void
  ) => onSubmit(values[textFieldName], setSubmissionErrors)

  const renderMessage = () => {
    if (!message) {
      return null
    }
    if (typeof message === 'string') {
      return (
        <Container bottom='medium'>
          <Typography size='medium'>{message}</Typography>
        </Container>
      )
    }

    return message
  }

  return (
    <Modal
      onClose={onClose}
      open={open}
      size={size}
      data-testid='ConfirmationModal'
      operationVariables={operationVariables}
      defaultTitle={title}
    >
      <ModalForm title={title} onSubmit={handleSubmit}>
        <Modal.Content>
          {renderMessage()}
          <Form.Input
            label={label}
            name={textFieldName}
            required={required}
            placeholder={placeholder}
            width='full'
            multiline
            rows={4}
            validate={isMaxLength}
            autoFocus
            data-testid='modal-input'
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            variant='secondary'
            data-testid='modal-cancel-button'
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Form.SubmitButton
            data-testid='ConfirmationModal-submit-button'
            loading={loading}
            variant={variant}
          >
            {submitText}
          </Form.SubmitButton>
        </Modal.Actions>
      </ModalForm>
    </Modal>
  )
}

export default ConfirmationModal
