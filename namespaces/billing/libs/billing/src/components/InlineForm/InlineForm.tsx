import React from 'react'
import { Form, FormProps, AnyObject } from '@toptal/picasso-forms'

import FormContent, { FormContentProps } from '../InlineFormContent/FormContent'

const displayName = 'InlineForm'

interface InlineFormProps<MutationInputType>
  extends FormProps<MutationInputType>,
    FormContentProps {}

const InlineForm = <MutationInputType extends AnyObject>({
  striped = false,
  label,
  revealText,
  editButtonVariant,
  children,
  editComponent,
  operation,
  padded = 'xsmall',
  left = 'xsmall',
  right = 'xsmall',
  loading,
  saveButtonText,
  saveButtonComponent,
  cancelButtonText,
  onClose,
  onReset,
  ...formProps
}: InlineFormProps<MutationInputType>) => {
  return (
    <Form<MutationInputType> {...formProps}>
      <FormContent
        operation={operation}
        striped={striped}
        label={label}
        buttonVariant={editButtonVariant}
        buttonText={revealText}
        editComponent={editComponent}
        padded={padded}
        left={left}
        right={right}
        saveButtonText={saveButtonText}
        saveButtonComponent={saveButtonComponent}
        cancelButtonText={cancelButtonText}
        onClose={onClose}
        onReset={onReset}
        loading={loading}
      >
        {children}
      </FormContent>
    </Form>
  )
}

InlineForm.displayName = displayName

export default InlineForm
