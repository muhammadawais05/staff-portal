import React, { ReactNode } from 'react'
import { Container, Button } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

import { wrapper } from './styles'

interface Props {
  loading?: boolean
  cancelText?: string
  submitText?: string
  submitDisabled?: boolean
  disabled?: boolean
  onReset?: () => void
  'data-testid'?: string
  children?: ReactNode
}

const EditableWrapper = ({
  children,
  loading,
  cancelText = 'Cancel',
  submitText = 'Save',
  disabled = false,
  onReset,
  submitDisabled = false,
  'data-testid': testId = 'EditableWrapper'
}: Props) => {
  return (
    <Container flex direction='column' data-testid={testId} css={wrapper}>
      {children}

      <Container top={1} flex justifyContent='flex-end'>
        <Button
          size='small'
          variant='secondary'
          onClick={onReset}
          disabled={disabled || loading}
          data-testid={`${testId}-cancel`}
        >
          {cancelText}
        </Button>
        <Form.SubmitButton
          variant='positive'
          size='small'
          loading={loading}
          disabled={disabled || submitDisabled || loading}
          data-testid={`${testId}-submit`}
        >
          {submitText}
        </Form.SubmitButton>
      </Container>
    </Container>
  )
}

export default EditableWrapper
