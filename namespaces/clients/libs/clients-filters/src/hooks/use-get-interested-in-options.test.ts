import { useGetUserVerticals } from '@staff-portal/verticals'
import { renderHook } from '@testing-library/react-hooks'
import pluralize from 'pluralize'

import { useGetInterestedInOptions } from './use-get-interested-in-options'

jest.mock('@staff-portal/verticals', () => ({
  useGetUserVerticals: jest.fn()
}))
jest.mock('pluralize')

const useGetUserVerticalsMock = useGetUserVerticals as jest.Mock
const pluralizeMock = pluralize as unknown as jest.Mock

describe('#useGetInterestedInOptions', () => {
  it('returns correct options and calls external dependencies', () => {
    const optionValue = 'optionValue'
    const optionText = 'optionText'
    const pluralizedOption = 'optionValues'
    const options = [{ text: optionText, value: optionValue }]
    const loading = {} as boolean

    useGetUserVerticalsMock.mockReturnValue({ options, loading })
    pluralizeMock.mockReturnValue(pluralizedOption)

    const { result } = renderHook(() => useGetInterestedInOptions())

    expect(pluralizeMock).toHaveBeenCalledWith(optionValue)
    expect(useGetUserVerticalsMock).toHaveBeenCalledTimes(1)
    expect(result.current).toMatchObject({
      loading,
      interestedInOptions: [{ label: optionText, value: pluralizedOption }]
    })
  })
})
