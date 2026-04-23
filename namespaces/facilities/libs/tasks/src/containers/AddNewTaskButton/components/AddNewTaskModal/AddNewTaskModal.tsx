import { Modal } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import React, { useMemo } from 'react'
import { Scalars, TaskPriorityLevel } from '@staff-portal/graphql/staff'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { TASK_PRIORITY_OPTIONS } from '../../../../config'
import { TaskCreateData } from '../../../../types'
import { parseRecurringPeriod } from '../../../../utils'
import FormTaskStaffAutocomplete from '../FormTaskStaffAutocomplete'
import FormTaskTagSelector from '../../../FormTaskTagSelector'
import { TaskTagEdgeFragment } from '../../../../data/get-task-tags-autocomplete'
import { useCreateTask } from './data'

interface AddTaskForm {
  description: string
  performerId: string
  dueDate?: Scalars['Date']
  priority?: TaskPriorityLevel
  recurringPeriod?: string
  tags?: TaskTagEdgeFragment[]
}

export interface Props {
  taskCreateData: TaskCreateData
  hideModal: () => void
  onTaskCreated?: () => void
}

const AddNewTaskModal = ({
  taskCreateData: { performer, ...taskCreateData },
  hideModal,
  onTaskCreated
}: Props) => {
  const minDate = useMemo(() => new Date(), [])
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [createTask] = useCreateTask({
    onError: () => showError('An error occurred, the task was not created.')
  })

  const handleSubmit = async ({
    tags,
    recurringPeriod,
    dueDate,
    ...restData
  }: AddTaskForm) => {
    const newTask = {
      ...restData,
      ...taskCreateData,
      dueDate,
      recurringPeriod: parseRecurringPeriod(recurringPeriod),
      tagIds: tags?.map(({ node }) => node?.id ?? '').filter(Boolean)
    }
    const { data } = await createTask({ variables: { newTask } })

    return handleMutationResult({
      mutationResult: data?.createTask,
      successNotificationMessage: 'Success! The task was created.',
      onSuccessAction: () => {
        onTaskCreated?.()
        hideModal()
      }
    })
  }

  return (
    <Modal withForm open onClose={hideModal} size='small'>
      <Modal.Title>Add Task</Modal.Title>
      <Form<AddTaskForm> onSubmit={handleSubmit}>
        <Modal.Content>
          <Form.Input
            name='description'
            width='full'
            label='Description'
            data-testid='add-new-task-modal-description'
            autoFocus
            required
          />
          <FormDatePickerWrapper
            name='dueDate'
            label='Due date'
            width='full'
            data-testid='add-new-task-modal-due-date'
            minDate={minDate}
          />
          <Form.Select
            name='priority'
            label='Priority'
            options={TASK_PRIORITY_OPTIONS}
            width='full'
            initialValue={TaskPriorityLevel.MEDIUM}
          />
          <Form.NumberInput
            name='recurringPeriod'
            width='full'
            label='Recurring period'
          />
          <FormTaskStaffAutocomplete
            name='performerId'
            label='Performer'
            width='full'
            initialValue={performer?.id}
            initialDisplayValue={performer?.fullName}
            required
          />
          <FormTaskTagSelector name='tags' label='Tags' width='full' />
        </Modal.Content>

        <Modal.Actions>
          <Button variant='secondary' onClick={hideModal}>
            Cancel
          </Button>
          <Form.SubmitButton
            variant='positive'
            data-testid='create-task-button'
          >
            Create Task
          </Form.SubmitButton>
        </Modal.Actions>
      </Form>
    </Modal>
  )
}

export default AddNewTaskModal
