import { render } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useQueryParamsState } from '@staff-portal/query-params-state'
import { MemoryRouter } from '@staff-portal/navigation'
import { useGetCreateTaskOperation } from '@staff-portal/tasks'
import { useTouchCounter, CounterName } from '@staff-portal/counters'
import { useGetFlags } from '@staff-portal/facilities'

import TasksList from './TasksList'
import { useGetTasksList } from './data'
import { useGetPlaybooks } from './data/get-playbooks'

jest.mock('@staff-portal/counters', () => ({
  ...jest.requireActual('@staff-portal/counters'),
  useTouchCounter: jest.fn()
}))
const useTouchCounterMock = useTouchCounter as jest.Mock

jest.mock('@staff-portal/query-params-state', () => ({
  ...jest.requireActual('@staff-portal/query-params-state'),
  useQueryParamsState: jest.fn()
}))
const useQueryParamsStateMock = useQueryParamsState as jest.Mock

jest.mock('./data', () => ({
  ...jest.requireActual('./data'),
  useGetTasksList: jest.fn()
}))
const useGetTasksListMock = useGetTasksList as jest.Mock

jest.mock('@staff-portal/tasks', () => ({
  ...jest.requireActual('@staff-portal/tasks'),
  useGetCreateTaskOperation: jest.fn()
}))
const useGetCreateTaskOperationMock = useGetCreateTaskOperation as jest.Mock

jest.mock('./data/get-playbooks', () => ({
  ...jest.requireActual('./data/get-playbooks'),
  useGetPlaybooks: jest.fn()
}))
const useGetPlaybooksMock = useGetPlaybooks as jest.Mock

jest.mock('@staff-portal/facilities', () => ({
  ...jest.requireActual('@staff-portal/facilities'),
  useGetFlags: jest.fn()
}))
const useGetFlagsMock = useGetFlags as jest.Mock

jest.mock('../../components', () => ({
  ...jest.requireActual('../../components'),
  TasksListSearchBar: () => null
}))

const arrangeTest = ({
  urlValues
}: { urlValues?: Record<string, unknown> } = {}) => {
  useQueryParamsStateMock.mockImplementation(() => [
    urlValues ?? [],
    jest.fn(),
    false
  ])
  useGetTasksListMock.mockImplementation(() => ({
    data: {
      counters: undefined,
      totalCount: 0,
      taskGroups: 0
    },
    loading: false,
    refetch: jest.fn()
  }))
  useGetCreateTaskOperationMock.mockImplementation(() => ({
    data: undefined
  }))
  useGetPlaybooksMock.mockImplementation(() => ({
    data: undefined
  }))
  useGetFlagsMock.mockImplementation(() => ({
    flags: undefined,
    loading: false
  }))

  return render(
    <MemoryRouter>
      <TestWrapper>
        <TasksList />
      </TestWrapper>
    </MemoryRouter>
  )
}

describe('TasksList', () => {
  describe('when URL filters are empty', () => {
    it('sets touch counter with `tasks` name', () => {
      arrangeTest()

      expect(useTouchCounterMock).toHaveBeenCalledTimes(1)
      expect(useTouchCounterMock).toHaveBeenCalledWith({
        counterName: CounterName.Tasks,
        skipIfMissing: false
      })
    })
  })

  describe('when URL filters contains `statuses[]=disputed`', () => {
    it('sets touch counter with `tasks` name', () => {
      arrangeTest({
        urlValues: {
          statuses: ['disputed']
        }
      })

      expect(useTouchCounterMock).toHaveBeenCalledTimes(1)
      expect(useTouchCounterMock).toHaveBeenCalledWith({
        counterName: CounterName.DisputedTasks,
        skipIfMissing: true
      })
    })
  })
})
