import { getServiceOptions } from './get-service-options'

describe('getServiceOptions', () => {
  it('returns undefined', () => {
    expect(getServiceOptions([], '')).toBeUndefined()

    expect(
      getServiceOptions(
        [{ service: 'Service Name', onlineTests: [] }],
        'Test Service Name'
      )
    ).toBeUndefined()
  })

  it('returns empty list', () => {
    expect(
      getServiceOptions(
        [{ service: 'Service Name', onlineTests: [] }],
        'Service Name'
      )
    ).toHaveLength(0)
  })

  it('returns service options', () => {
    expect(
      getServiceOptions(
        [
          { service: 'Service Name 1', onlineTests: [] },
          {
            service: 'Service Name 2',
            onlineTests: [
              { id: '1', name: 'Test 1', service: 'Service Name 2' },
              { id: '2', name: 'Test 2', service: 'Service Name 2' }
            ]
          }
        ],
        'Service Name 2'
      )
    ).toHaveLength(2)
  })
})
