import { when } from 'jest-when'
import React, { ComponentProps } from 'react'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { useMutation } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { TASK_UPDATED, TaskStatus } from '@staff-portal/tasks'

import { TaskListItemFragment } from '../../data/task-list-item-fragment'
import { createTaskListItemMock } from '../../data/task-list-item-fragment/mocks'
import CompleteTaskCheckbox from './CompleteTaskCheckbox'
import { FinishTaskDocument } from './data/finish-task/finish-task.staff.gql.types'
import { RestartTaskDocument } from './data/restart-task/restart-task.staff.gql.types'
import { TaskCompleteOptions } from './utils'

jest.mock('@staff-portal/data-layer-service')
const mockUseMutation = useMutation as jest.Mock

jest.mock('@toptal/staff-portal-message-bus')
const useMessageEmitterMock = useMessageEmitter as jest.Mock

const mockSuccessImplementation = () => {
  when(mockUseMutation)
    .calledWith(FinishTaskDocument, expect.anything())
    .mockImplementation((_, { onCompleted }) => {
      const data = {
        finishTask: {
          success: true,
          errors: []
        }
      }

      onCompleted(data)

      return [() => ({ data }), { loading: false }]
    })

  when(mockUseMutation)
    .calledWith(RestartTaskDocument, expect.anything())
    .mockImplementation((_, { onCompleted }) => {
      const data = {
        restartTask: {
          success: true,
          errors: []
        }
      }

      onCompleted(data)

      return [() => ({ data }), { loading: false }]
    })
}

const mockErrorImplementation = () => {
  when(mockUseMutation)
    .calledWith(FinishTaskDocument, expect.anything())
    .mockImplementation((_, { onError }: { onError: () => void }) => [
      onError,
      { loading: false }
    ])

  when(mockUseMutation)
    .calledWith(RestartTaskDocument, expect.anything())
    .mockImplementation((_, { onError }: { onError: () => void }) => [
      onError,
      { loading: false }
    ])
}

const setCachedTaskMock = jest.fn()

const arrangeTest = ({
  task,
  taskCompleteOptions,
  taskDefaultCompleted
}: {
  task: TaskListItemFragment
  taskCompleteOptions: TaskCompleteOptions | null
  taskDefaultCompleted?: boolean
}) => {
  const props: ComponentProps<typeof CompleteTaskCheckbox> = {
    task,
    taskCompleteOptions,
    taskDefaultCompleted,
    setCachedTask: setCachedTaskMock
  }

  return render(
    <TestWrapper>
      <CompleteTaskCheckbox {...props} />
    </TestWrapper>
  )
}

const emitMessageMock = jest.fn()

describe('CompleteTaskCheckbox', () => {
  beforeEach(() => {
    useMessageEmitterMock.mockReturnValue(emitMessageMock)
  })

  describe('when task is not completed', () => {
    it('calls "setCachedTask" with "FINISHED" status', () => {
      mockSuccessImplementation()
      arrangeTest({
        task: createTaskListItemMock({
          status: TaskStatus.PENDING
        }),
        taskCompleteOptions: { completed: false }
      })

      fireEvent.click(
        screen.getByTestId('complete-task').querySelector('input') as Element
      )

      expect(setCachedTaskMock).toHaveBeenCalledWith(
        expect.objectContaining({ status: TaskStatus.FINISHED })
      )
    })

    it('emits "TASK_UPDATED" message', () => {
      mockSuccessImplementation()
      const taskMock = createTaskListItemMock({
        status: TaskStatus.FINISHED
      })

      arrangeTest({
        task: taskMock,
        taskCompleteOptions: { completed: false },
        taskDefaultCompleted: true
      })

      fireEvent.click(
        screen.getByTestId('complete-task').querySelector('input') as Element
      )

      expect(emitMessageMock).toHaveBeenCalledWith(TASK_UPDATED, {
        taskId: taskMock.id
      })
    })

    describe('when there is "icon"', () => {
      it('displays "icon"', () => {
        mockSuccessImplementation()
        arrangeTest({
          task: createTaskListItemMock(),
          taskCompleteOptions: {
            completed: false,
            icon: <div data-testid='icon' />
          }
        })

        expect(screen.getByTestId('icon')).toBeInTheDocument()
        expect(screen.queryByTestId('complete-task')).not.toBeInTheDocument()
      })
    })

    describe('when "taskCompleteOptions" equals null', () => {
      it('does not display checkbox', () => {
        mockSuccessImplementation()
        arrangeTest({
          task: createTaskListItemMock(),
          taskCompleteOptions: null
        })

        expect(screen.queryByTestId('complete-task')).not.toBeInTheDocument()
      })
    })

    describe('when there is an error for not completed task', () => {
      it('displays proper error message', async () => {
        mockErrorImplementation()
        arrangeTest({
          task: createTaskListItemMock(),
          taskCompleteOptions: { completed: false }
        })

        fireEvent.click(
          screen.getByTestId('complete-task').querySelector('input') as Element
        )

        expect(
          await screen.findByText(
            'An error occurred, the task has not been marked as finished.'
          )
        ).toBeInTheDocument()
      })
    })
  })

  describe('when task is completed', () => {
    it('calls "setCachedTask" with "PENDING" status', () => {
      mockSuccessImplementation()
      arrangeTest({
        task: createTaskListItemMock({
          status: TaskStatus.FINISHED
        }),
        taskCompleteOptions: { completed: true },
        taskDefaultCompleted: true
      })

      fireEvent.click(
        screen.getByTestId('complete-task').querySelector('input') as Element
      )

      expect(setCachedTaskMock).toHaveBeenCalledWith(
        expect.objectContaining({ status: TaskStatus.PENDING })
      )
    })

    it('emits "TASK_UPDATED" message', () => {
      const taskMock = createTaskListItemMock({
        status: TaskStatus.FINISHED
      })

      mockSuccessImplementation()
      arrangeTest({
        task: taskMock,
        taskCompleteOptions: { completed: true },
        taskDefaultCompleted: true
      })

      fireEvent.click(
        screen.getByTestId('complete-task').querySelector('input') as Element
      )

      expect(emitMessageMock).toHaveBeenCalledWith(TASK_UPDATED, {
        taskId: taskMock.id
      })
    })

    describe('when there is an error for completed task', () => {
      it('displays proper error message', async () => {
        mockErrorImplementation()
        arrangeTest({
          task: createTaskListItemMock({
            status: TaskStatus.FINISHED
          }),
          taskCompleteOptions: { completed: true },
          taskDefaultCompleted: true
        })

        fireEvent.click(
          screen.getByTestId('complete-task').querySelector('input') as Element
        )

        expect(
          await screen.findByText(
            'An error occurred, the task has not been restarted.'
          )
        ).toBeInTheDocument()
      })
    })
  })
})
