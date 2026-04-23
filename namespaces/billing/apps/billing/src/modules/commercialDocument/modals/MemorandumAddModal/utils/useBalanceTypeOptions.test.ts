import { renderHook } from '@testing-library/react-hooks'

import { useBalanceTypeOptions } from './useBalanceTypeOptions'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (...args: (string | object)[]) => args
  })
}))

describe('useBalanceTypeOptions', () => {
  it('returns array with valid amount of available balance type options', () => {
    const { result } = renderHook(() => useBalanceTypeOptions())

    expect(result.current).toBeInstanceOf(Array)
    expect(result.current).toHaveLength(2)
  })
})
