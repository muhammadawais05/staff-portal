import { groupOnlineTests } from './group-online-tests'

describe('groupOnlineTests', () => {
  it('returns empty array', () => {
    expect(groupOnlineTests([])).toHaveLength(0)
  })

  it('groups the online tests', () => {
    let result = groupOnlineTests([
      { id: '1', name: 'test 1', service: 'service 1' },
      { id: '2', name: 'test 2', service: 'service 2' },
      { id: '3', name: 'test 3', service: 'service 1' }
    ])

    expect(result).toHaveLength(2)
    expect(result[0].onlineTests).toHaveLength(2)
    expect(result[1].onlineTests).toHaveLength(1)

    result = groupOnlineTests([
      { id: '1', name: 'test 1', service: 'service 1' },
      { id: '2', name: 'test 2', service: 'service 1' },
      { id: '3', name: 'test 3', service: 'service 1' }
    ])

    expect(result).toHaveLength(1)
    expect(result[0].onlineTests).toHaveLength(3)
  })
})
