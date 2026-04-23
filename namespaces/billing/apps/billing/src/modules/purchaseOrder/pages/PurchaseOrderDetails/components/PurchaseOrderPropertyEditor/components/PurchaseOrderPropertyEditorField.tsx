import React, { memo } from 'react'
import { FormSpy, Form } from '@toptal/picasso-forms'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import { LoaderOverlay } from '@staff-portal/ui'
import { useDatepickerTimezoneProps } from '@staff-portal/billing/src/_lib/form/helpers'
import { getCurrentDayAsJSDate } from '@staff-portal/billing/src/_lib/dateTime'
import {
  amountCleanNumberValue,
  formatCleanNumberValue,
  percentCleanNumberValue
} from '@staff-portal/billing/src/_lib/form/handlers'

interface EditorProps {
  name: string
  isToggled: boolean
  loading?: boolean
  type: 'amount' | 'date' | 'percentage'
  testId: string
  onClose: () => void
}

export const PurchaseOrderPropertyEditorField = memo((props: EditorProps) => {
  const { name, isToggled, loading, type, testId, onClose } = props
  const { modalContainer } = useExternalIntegratorContext()

  return (
    <FormSpy
      subscription={{
        hasSubmitErrors: true,
        initialValues: true,
        submitting: true
      }}
    >
      {({
        form: { getFieldState, reset, submit: formSubmit },
        hasSubmitErrors,
        submitting
      }) => {
        if (!isToggled && hasSubmitErrors) {
          reset()
        }

        const submit = () => {
          const state = getFieldState(name)

          return state?.initial !== state?.value ? formSubmit() : onClose()
        }

        return (
          <LoaderOverlay loading={loading || submitting}>
            {type === 'date' ? (
              <Form.DatePicker
                // eslint-disable-next-line
                {...useDatepickerTimezoneProps()}
                autoFocus
                data-testid={`${testId}-input`}
                disabled={submitting}
                minDate={getCurrentDayAsJSDate()}
                name={name}
                onBlur={submit}
                onChange={submit}
                popperContainer={modalContainer}
                width='full'
              />
            ) : (
              <Form.Input
                autoComplete='off'
                autoFocus
                data-testid={`${testId}-input`}
                disabled={submitting}
                format={formatCleanNumberValue}
                formatOnBlur
                icon={<span>{type === 'amount' ? '$' : '%'}</span>}
                name={name}
                onBlur={submit}
                onKeyDown={({ key }: React.KeyboardEvent<HTMLInputElement>) => {
                  if (key === 'Escape') {
                    onClose()
                    reset()
                  }
                }}
                parse={
                  type === 'amount'
                    ? amountCleanNumberValue
                    : percentCleanNumberValue
                }
                placeholder='0.00'
                width='shrink'
              />
            )}
          </LoaderOverlay>
        )
      }}
    </FormSpy>
  )
})
