import { renderHook } from '@testing-library/react-hooks'
import { useGetFlags } from '@staff-portal/facilities'

import { useFlagsFilter } from './use-flags-filter'

jest.mock('@staff-portal/facilities', () => ({
  ...jest.requireActual('@staff-portal/facilities'),
  useGetFlags: jest.fn()
}))

const useGetFlagsMock = useGetFlags as jest.Mock
const loading = {}

describe('useFlagsFilter', () => {
  it.each([
    [
      'flags are provided',
      {
        flags: [
          { id: 'test-flag-id', title: 'test-flag-label' },
          { id: 'foo-id', title: null }
        ],
        expectedOptions: [
          { id: 'test-flag-id', label: 'test-flag-label' },
          { id: 'foo-id', label: '' }
        ]
      }
    ],
    [
      'flags are null',
      {
        flags: null,
        expectedOptions: []
      }
    ]
  ])(
    'returns correct filter config when %s',
    (_description, { flags, expectedOptions }) => {
      useGetFlagsMock.mockReturnValue({ loading, flags })

      const { result } = renderHook(() => useFlagsFilter())

      expect(useGetFlagsMock).toHaveBeenCalledTimes(1)
      expect(useGetFlagsMock).toHaveBeenCalledWith({
        roleType: 'CLIENT'
      })

      expect(result.current).toMatchObject({
        type: 'TYPE_SELECTOR',
        name: 'flag_ids',
        label: 'Flags',
        placeholder: 'Not Selected',
        loading,
        options: expectedOptions
      })
    }
  )
})
