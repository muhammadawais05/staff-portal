import React, { ComponentProps } from 'react'
import { Button } from '@toptal/picasso'
import { useForm, useFormState } from '@toptal/picasso-forms'

import {
  ActionType,
  BaseDraftJobFormTypeWithActionType
} from '../../../../types'
import { loadingState, disabledState } from './utils'

interface Props extends ComponentProps<typeof Button> {
  action: ActionType
  disabled?: boolean
}

const DraftJobFormSubmitButton = ({
  action,
  disabled,
  children,
  ...rest
}: Props) => {
  const form = useForm()
  const { submitting } = useFormState<BaseDraftJobFormTypeWithActionType>()
  const currentAction = form.getState().values.action

  const buttonClickHandler = () => {
    form.change('action', action)
    form.submit()
  }

  return (
    <Button
      {...rest}
      type='button'
      loading={loadingState(action, currentAction, submitting)}
      disabled={disabled || disabledState(action, currentAction, submitting)}
      onClick={buttonClickHandler}
    >
      {children}
    </Button>
  )
}

export default DraftJobFormSubmitButton
