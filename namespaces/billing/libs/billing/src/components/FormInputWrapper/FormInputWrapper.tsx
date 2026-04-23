import { FieldMetaState } from '@toptal/picasso-forms'
import { Form } from '@toptal/picasso'
import React, { FC, ReactNode, memo } from 'react'

const displayName = 'FormFieldWrapper'

export type RenderProp = (props: { isInvalid: boolean }) => ReactNode

interface Props {
  hint?: string
  label?: string
  renderChild?: RenderProp
  required?: boolean
  testId?: string
  meta: FieldMetaState<string>
}

export const FormInputWrapper: FC<Props> = memo(
  ({ hint, label, renderChild, required, testId, meta }) => {
    if (!renderChild) {
      return null
    }

    const { error, touched, submitError } = meta
    const isInvalid = !!(error && touched) || !!submitError
    // TODO: reported Picasso issue https://github.com/toptal/picasso/issues/827
    const errorMessage = isInvalid
      ? ((
          <span
            data-testid={`${testId}-error`}
            dangerouslySetInnerHTML={{ __html: error || submitError }}
          />
        ) as unknown as string)
      : ''

    return (
      <Form.Field
        data-testid={`${testId}-field`}
        error={errorMessage}
        hint={hint}
      >
        {label && (
          <Form.Label
            data-testid={`${testId}-label`}
            htmlFor={testId}
            requiredDecoration={required ? 'asterisk' : 'optional'}
          >
            {label}
          </Form.Label>
        )}
        {renderChild({ isInvalid })}
      </Form.Field>
    )
  }
)

FormInputWrapper.displayName = displayName

export default FormInputWrapper
