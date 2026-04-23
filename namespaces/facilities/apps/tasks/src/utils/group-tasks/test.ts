import { groupTasks, TaskWithGroup } from './group-tasks'

const TEST_ID_1 = 'test-id-1'
const TEST_ID_2 = 'test-id-2'
const TEST_ID_3 = 'test-id-3'

describe('groupTasks', () => {
  it('should group tasks by provided group id', () => {
    const groupedTasks = groupTasks([
      {
        node: {
          id: TEST_ID_1
        },
        group: {
          id: '2'
        }
      },
      {
        node: {
          id: TEST_ID_2
        },
        group: {
          id: '2'
        }
      },
      {
        node: {
          id: TEST_ID_3
        },
        group: {
          id: '1'
        }
      }
    ] as TaskWithGroup[])

    expect(groupedTasks).toHaveLength(2)
    expect(groupedTasks).toContainEqual({
      group: { id: '1' },
      tasks: [
        {
          id: TEST_ID_3
        }
      ]
    })
    expect(groupedTasks).toContainEqual({
      group: { id: '2' },
      tasks: [
        {
          id: TEST_ID_1
        },
        {
          id: TEST_ID_2
        }
      ]
    })
  })
})
