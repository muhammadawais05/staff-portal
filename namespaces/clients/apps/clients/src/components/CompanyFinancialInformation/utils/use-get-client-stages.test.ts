import { renderHook } from '@testing-library/react-hooks'
import { when } from 'jest-when'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { useGetClientStages } from './use-get-client-stages'
import { GetClientStagesDocument } from '../data'

jest.mock('@staff-portal/data-layer-service')

const mockUseLazyQuery = useLazyQuery as jest.Mock

describe('#useGetClientStages', () => {
  it('returns', () => {
    when(mockUseLazyQuery)
      .calledWith(GetClientStagesDocument)
      .mockImplementation(() => [
        () => ({}),
        {
          data: {
            clientStages: [
              'Stage A',
              'Stage B',
              'Stage C',
              'Acquired',
              'IPO',
              'Exited',
              'Late Stage Startup',
              'Seed'
            ]
          },
          loading: false
        }
      ])

    const {
      result: {
        current: { data: options }
      }
    } = renderHook(() => useGetClientStages())

    expect(options).toStrictEqual([
      { value: 'Stage A', text: 'Stage A' },
      { value: 'Stage B', text: 'Stage B' },
      { value: 'Stage C', text: 'Stage C' },
      { value: 'Acquired', text: 'Acquired' },
      { value: 'IPO', text: 'IPO' },
      { value: 'Exited', text: 'Exited' },
      { value: 'Late Stage Startup', text: 'Late Stage Startup' },
      { value: 'Seed', text: 'Seed' }
    ])
  })
})
