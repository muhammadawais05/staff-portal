import { act, renderHook } from '@testing-library/react-hooks'
import { useForm } from '@toptal/picasso-forms'

import { useChangeRoleReferrerForm } from '.'

jest.mock('@toptal/picasso-forms')

const mockFormChange = jest.fn()

;(useForm as jest.Mock).mockReturnValue({
  change: mockFormChange
})

describe('useCommission', () => {
  beforeEach(() => {})

  describe('#handleReferrerSelect', () => {
    describe('if the action type is `referrer`', () => {
      beforeEach(() => {
        const { result } = renderHook(() => useChangeRoleReferrerForm())

        act(() => result.current.handleReferrerSelect({ id: 'abc123' }))
      })

      it('triggers the form change function', () => {
        expect(mockFormChange).toHaveBeenCalledWith('referrerId', 'abc123')
      })
    })
  })

  describe('#handleSearchTermChange', () => {
    describe('if the action type is `referrer`', () => {
      beforeEach(() => {
        const { result } = renderHook(() => useChangeRoleReferrerForm())

        act(() => result.current.handleSearchTermChange())
      })

      it('triggers the form change function', () => {
        expect(mockFormChange).toHaveBeenCalledWith('referrerId', undefined)
      })
    })
  })
})
