import { searchTree } from './search-tree'
import { createTreeNodeWithInfoMock } from '../../test-utils/create-tree-node-with-info-mock'

describe('search-tree', () => {
  it('should return original tree when search value is empty', () => {
    const defaultTreeData = createTreeNodeWithInfoMock()

    expect(
      searchTree({
        treeData: defaultTreeData,
        searchValue: '',
        selectedIndex: 0
      })
    ).toEqual({
      searchedTreeData: defaultTreeData,
      matchesCount: 0
    })
  })

  it('should always highlight a matched node', () => {
    expect(
      searchTree({
        treeData: createTreeNodeWithInfoMock(
          {},
          {
            role: { id: '123', fullName: 'Dexter' }
          }
        ),
        searchValue: 'X',
        selectedIndex: 0
      })
    ).toEqual({
      searchedTreeData: createTreeNodeWithInfoMock(
        { selected: true },
        {
          role: { id: '123', fullName: 'Dexter' },
          highlighted: true,
          selected: true
        }
      ),
      matchesCount: 1
    })
  })

  it('should always select among matched nodes using depth-first algorithm', () => {
    expect(
      searchTree({
        treeData: createTreeNodeWithInfoMock(
          {
            children: [
              createTreeNodeWithInfoMock(
                {
                  children: [
                    createTreeNodeWithInfoMock(
                      {},
                      {
                        role: { id: '234', fullName: 'Xenon' }
                      }
                    )
                  ]
                },
                {
                  role: { id: '345', fullName: 'Alex' }
                }
              ),
              createTreeNodeWithInfoMock(
                {},
                {
                  role: { id: '456', fullName: 'Roxas' }
                }
              )
            ]
          },
          {
            role: {
              id: '123',
              fullName: 'No match name'
            }
          }
        ),
        searchValue: 'X',
        selectedIndex: 1
      })
    ).toEqual({
      searchedTreeData: createTreeNodeWithInfoMock(
        {
          children: [
            createTreeNodeWithInfoMock(
              {
                children: [
                  createTreeNodeWithInfoMock(
                    { selected: true },
                    {
                      role: { id: '234', fullName: 'Xenon' },
                      highlighted: true,
                      selected: true
                    }
                  )
                ]
              },
              {
                role: { id: '345', fullName: 'Alex' },
                highlighted: true
              }
            ),
            createTreeNodeWithInfoMock(
              {},
              {
                role: { id: '456', fullName: 'Roxas' },
                highlighted: true
              }
            )
          ]
        },
        {
          role: { id: '123', fullName: 'No match name' }
        }
      ),
      matchesCount: 3
    })
  })
})
