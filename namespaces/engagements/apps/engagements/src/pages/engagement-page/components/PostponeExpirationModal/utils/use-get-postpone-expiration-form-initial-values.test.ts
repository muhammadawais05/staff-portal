import { renderHook } from '@testing-library/react-hooks'
import MockDate from 'mockdate'

import useGetPostponeExpirationFormInitialValues from './use-get-postpone-expiration-form-initial-values'

describe('#useGetPostponeExpirationFormInitialValues', () => {
  describe('when current day is Tuesday', () => {
    it(`sets "expirationDate" on Friday`, () => {
      MockDate.set('2021-08-24T10:20')

      const { result } = renderHook(() =>
        useGetPostponeExpirationFormInitialValues()
      )

      expect(result.current).toStrictEqual({
        expirationDate: '2021-08-27'
      })
    })
  })

  describe('when current day is Wednesday', () => {
    it(`sets "expirationDate" on Monday`, () => {
      MockDate.set('2021-08-25T10:20')
      const { result } = renderHook(() =>
        useGetPostponeExpirationFormInitialValues()
      )

      expect(result.current).toStrictEqual({
        expirationDate: '2021-08-30'
      })
    })
  })
})
