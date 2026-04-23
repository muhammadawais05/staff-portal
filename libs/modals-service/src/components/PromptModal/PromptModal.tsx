import React, { ReactNode, useMemo } from 'react'
import { Button, SizeType, Typography } from '@toptal/picasso'
import { Form, SubmissionErrors } from '@toptal/picasso-forms'
import { VariantType } from '@toptal/picasso/Button'
import type { GetLazyOperationVariables } from '@staff-portal/operations'

import Modal from '../Modal'
import ModalForm from '../ModalForm'
import ModalSuspender from '../ModalSuspender'

export interface Props {
  open?: boolean
  title: string
  message?: ReactNode
  cancelText?: string
  submitText?: string
  textFieldName?: string
  loading?: boolean
  initialLoading?: boolean
  variant?: VariantType
  operationVariables?: GetLazyOperationVariables
  size?: SizeType<'small' | 'medium' | 'large'> | 'full-screen'
  'data-testid'?: string
  testIds?: {
    closeButton?: string
    submitButton?: string
  }
  onSubmit: (
    value?: string,
    setSubmissionErrors?: (errors?: SubmissionErrors) => void
  ) => void
  onClose: () => void
}

const PromptModal = ({
  open = true,
  loading = false,
  initialLoading = false,
  submitText = 'Submit',
  cancelText = 'Cancel',
  title,
  message,
  variant = 'positive',
  size = 'small',
  textFieldName = 'value',
  operationVariables,
  'data-testid': dataTestId = 'PromptModal',
  testIds: {
    closeButton: closeButtonTestId = 'CustomPromptButton-cancel-button',
    submitButton: submitButtonTestId = 'CustomPromptButton-submit-button'
  } = {},
  onSubmit,
  onClose
}: Props) => {
  const handleSubmit = (
    values: Record<string, string>,
    form: unknown,
    setSubmissionErrors?: (errors?: SubmissionErrors) => void
  ) => onSubmit(values[textFieldName], setSubmissionErrors)

  const description = useMemo(() => {
    if (!message) {
      return null
    }

    if (typeof message === 'string') {
      return <Typography size='medium'>{message}</Typography>
    }

    return message
  }, [message])

  return (
    <Modal
      open={open}
      onClose={onClose}
      size={size}
      defaultTitle={title}
      operationVariables={operationVariables}
      data-testid={dataTestId}
    >
      {initialLoading ? (
        <ModalSuspender />
      ) : (
        <ModalForm title={title} onSubmit={handleSubmit}>
          <Modal.Content>{description}</Modal.Content>
          <Modal.Actions>
            <Button
              variant='secondary'
              data-testid={closeButtonTestId}
              onClick={onClose}
              disabled={loading}
            >
              {cancelText}
            </Button>
            <Form.SubmitButton
              data-testid={submitButtonTestId}
              loading={loading}
              variant={variant}
            >
              {submitText}
            </Form.SubmitButton>
          </Modal.Actions>
        </ModalForm>
      )}
    </Modal>
  )
}

export default PromptModal
