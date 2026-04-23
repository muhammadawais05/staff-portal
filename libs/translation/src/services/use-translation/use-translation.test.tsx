import React, { ReactNode } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { useTranslation as useTranslationI18next } from 'react-i18next'

import { useTranslation } from './use-translation'
import I18nNsProvider from '../../containers/I18nNsProvider/I18nNsProvider'

jest.mock('react-i18next')

const mockedUseTranslationI18next = useTranslationI18next as jest.Mock

const wrapper = ({ children }: { children: ReactNode }) => (
  <I18nNsProvider ns='invoices'>{children}</I18nNsProvider>
)

describe('useTranslation', () => {
  describe('when there is no shared prefix', () => {
    it(`calls i18next's useTranslation function with added prefixes`, () => {
      renderHook(() => useTranslation('common', { useSuspense: true }), {
        wrapper
      })

      expect(mockedUseTranslationI18next).toHaveBeenCalledTimes(1)
      expect(mockedUseTranslationI18next).toHaveBeenCalledWith(
        ['invoices/common'],
        { useSuspense: true }
      )

      jest.clearAllMocks()

      renderHook(() => useTranslation(['common', 'billing']), {
        wrapper
      })

      expect(mockedUseTranslationI18next).toHaveBeenCalledTimes(1)
      expect(mockedUseTranslationI18next).toHaveBeenCalledWith([
        'invoices/common',
        'invoices/billing'
      ])
    })
  })

  describe('when there is a shared prefix', () => {
    it(`calls i18next's useTranslation function without added prefixes`, () => {
      renderHook(() => useTranslation('shared/common'), {
        wrapper
      })

      expect(mockedUseTranslationI18next).toHaveBeenCalledTimes(1)
      expect(mockedUseTranslationI18next).toHaveBeenCalledWith([
        'shared/common'
      ])

      jest.clearAllMocks()

      renderHook(() => useTranslation(['shared/common', 'shared/billing']), {
        wrapper
      })

      expect(mockedUseTranslationI18next).toHaveBeenCalledTimes(1)
      expect(mockedUseTranslationI18next).toHaveBeenCalledWith([
        'shared/common',
        'shared/billing'
      ])
    })
  })

  describe('when there is a mix of namespaces with shared and without shared prefixes', () => {
    it(`calls i18next's useTranslation function`, () => {
      renderHook(() => useTranslation(['shared/common', 'common', 'billing']), {
        wrapper
      })

      expect(mockedUseTranslationI18next).toHaveBeenCalledTimes(1)
      expect(mockedUseTranslationI18next).toHaveBeenCalledWith([
        'shared/common',
        'invoices/common',
        'invoices/billing'
      ])
    })
  })

  describe('when ns is passed as an array', () => {
    it('i18next returns a custom translation function that is adding prefixes', () => {
      const mockedT = jest.fn()

      mockedUseTranslationI18next.mockReturnValue({ t: mockedT })

      const {
        result: { current }
      } = renderHook(() => useTranslation(['common']), {
        wrapper
      })

      current.translate('save')

      expect(mockedT).toHaveBeenCalledTimes(1)
      expect(mockedT).toHaveBeenCalledWith('invoices/save')

      jest.clearAllMocks()

      current.translate('shared/save')

      expect(mockedT).toHaveBeenCalledTimes(1)
      expect(mockedT).toHaveBeenCalledWith('shared/save')
    })
  })

  describe('when ns is passed as a string', () => {
    it('i18next returns a custom translation function that is not adding prefixes', () => {
      const mockedT = jest.fn()

      mockedUseTranslationI18next.mockReturnValue({ t: mockedT })

      const {
        result: { current }
      } = renderHook(() => useTranslation('common'), {
        wrapper
      })

      current.translate('save')

      expect(mockedT).toHaveBeenCalledTimes(1)
      expect(mockedT).toHaveBeenCalledWith('save')
    })
  })
})
