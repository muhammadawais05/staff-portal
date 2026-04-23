import { assertIsNotNullish } from '@staff-portal/utils'

import createTree from './create-tree'
import { StaffTreeNode } from '../../types'
import { OperationalIssuesStaffTreeCardNodeFragment } from '../../data/get-operational-issues-staff-tree'

describe('createTree()', () => {
  it('should throw error if there is no root element', () => {
    const input: StaffTreeNode[] = [
      {
        issuesCount: null,
        parentIndex: 1,
        positions: [],
        role: { id: 'abc100', fullName: 'Abc 100' }
      },
      {
        issuesCount: null,
        parentIndex: 0,
        positions: [],
        role: { id: 'abc200', fullName: 'Abc 200' }
      }
    ]

    expect(() => createTree(input)).toThrow('Unable to detect root.')
  })

  it('should create the tree structure from staff tree nodes array', () => {
    /*
    Expected structure:

    Abc 300 (root)
    |-- Abc 200
    |-- Abc 400
        |-- Abc 100
        |-- Abc 500
            |-- Test Team
    */

    const ROOT_NAME = 'Abc 300 (root)'
    const input: StaffTreeNode[] = [
      {
        issuesCount: null,
        parentIndex: 3,
        positions: [],
        role: { id: 'abc100', fullName: 'Abc 100' }
      },
      {
        issuesCount: null,
        parentIndex: 2,
        positions: [],
        role: { id: 'abc200', fullName: 'Abc 200' }
      },
      {
        issuesCount: null,
        parentIndex: null,
        positions: [],
        role: { id: 'abc300', fullName: ROOT_NAME }
      },
      {
        issuesCount: null,
        parentIndex: 2,
        positions: [],
        role: { id: 'abc400', fullName: 'Abc 400' }
      },
      {
        issuesCount: null,
        parentIndex: 3,
        positions: [],
        role: { id: 'abc500', fullName: 'Abc 500' }
      },
      {
        name: 'Test Team',
        parentIndex: 4,
        members: {
          edges: [
            {
              issuesCount: 1,
              node: { id: 'abc1000', fullName: 'Abc 1000' }
            },
            {
              issuesCount: 1,
              node: { id: 'abc2000', fullName: 'Abc 2000' }
            }
          ]
        }
      }
    ]

    const result = createTree(input)

    expect(
      (result.info as OperationalIssuesStaffTreeCardNodeFragment).role.fullName
    ).toEqual(ROOT_NAME)
    expect(result.children?.length).toBe(2)
    assertIsNotNullish(result.children)
    expect(result.children[0].children?.length).toBe(0)
    expect(result.children[1].children?.length).toBe(2)
    assertIsNotNullish(result.children[1].children)
    expect(result.children[1].children[1].children?.length).toBe(1)
    assertIsNotNullish(result.children[1].children[1].children)
    expect(
      'members' in result.children[1].children[1].children[0].info
    ).toBe(true)
  })
})
