import { Container, Dropdown } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import React from 'react'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { parseRecurringPeriod } from '@staff-portal/tasks'

import {
  useChangeTaskRecurringPeriod,
  useRemoveTaskRecurringPeriod
} from './data'
import * as S from './styles'

const ERROR_MESSAGE =
  'An error occurred, the task recurring period was not updated'

type ChangeRecurringPeriodForm = {
  recurringPeriod?: string
}

export interface Props {
  taskId: string
  recurringPeriod?: number | null
}

const RecurringPeriodContent = ({ taskId, recurringPeriod }: Props) => {
  const { close } = Dropdown.useContext()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const { changeTaskRecurringPeriod } = useChangeTaskRecurringPeriod({
    taskId,
    onError: () => showError(ERROR_MESSAGE)
  })
  const { removeTaskRecurringPeriod } = useRemoveTaskRecurringPeriod({
    taskId,
    onError: () => showError(ERROR_MESSAGE)
  })

  const handleSubmit = async (formValues: ChangeRecurringPeriodForm) => {
    const newRecurringPeriod = parseRecurringPeriod(formValues.recurringPeriod)

    if (newRecurringPeriod === recurringPeriod) {
      close()

      return
    }

    if (newRecurringPeriod) {
      const { data } = await changeTaskRecurringPeriod(newRecurringPeriod)

      return handleMutationResult({
        mutationResult: data?.changeTaskRecurringPeriod,
        onSuccessAction: close
      })
    }

    const { data } = await removeTaskRecurringPeriod()

    return handleMutationResult({
      mutationResult: data?.removeTaskRecurringPeriod,
      onSuccessAction: close
    })
  }

  return (
    <Container padded='small' css={S.wrapper}>
      <Form<ChangeRecurringPeriodForm> onSubmit={handleSubmit}>
        <Container bottom='small'>
          <Form.NumberInput
            autoFocus
            enableReset
            name='recurringPeriod'
            label='Recurring period'
            initialValue={recurringPeriod ?? undefined}
            width='full'
          />
        </Container>

        <Form.SubmitButton fullWidth variant='positive'>
          Save
        </Form.SubmitButton>
      </Form>
    </Container>
  )
}

export default RecurringPeriodContent
