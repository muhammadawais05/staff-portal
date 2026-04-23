import { Button } from '@toptal/picasso'
import { VariantType } from '@toptal/picasso/Button'
import React, { ReactNode } from 'react'
import { useForm, useFormState } from '@toptal/picasso-forms'
import { useTranslation } from 'react-i18next'
import { useConfirmations } from '@staff-portal/billing/src/_lib/customHooks/useConfirmations'

export const SubmitButton = ({
  action,
  useConfirmation,
  children,
  ...rest
}: {
  action: string
  useConfirmation?: boolean
  variant?: VariantType
  children?: ReactNode
}) => {
  const { t: translate } = useTranslation('timesheet')
  const form = useForm()
  const { submitting } = useFormState({ subscription: { submitting: true } })
  const { handleOnOpenConfirmation, handleOnCloseConfirmation } =
    useConfirmations()

  const buttonClickHandler = () => {
    const onSuccess = async () => {
      handleOnCloseConfirmation()

      form.change('action', action)
      form.submit()
    }

    if (useConfirmation) {
      handleOnOpenConfirmation({
        actionTitle: translate('Timesheet.confirms.submit.actionTitle'),
        description: translate('Timesheet.confirms.submit.description'),
        notice: translate('Timesheet.confirms.submit.notice'),
        onSuccess: onSuccess,
        title: translate('Timesheet.confirms.submit.title')
      })
    } else {
      onSuccess()
    }
  }

  return (
    <Button
      type='button'
      onClick={buttonClickHandler}
      loading={submitting}
      {...rest}
    >
      {children}
    </Button>
  )
}
