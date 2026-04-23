import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react-test-renderer'

import { useLastField } from './use-last-field'

describe('useLastField', () => {
  it('has default state', () => {
    const { result } = renderHook(useLastField)

    expect(result.current.lastFocusedFieldName).toBe('talentHourlyRate')
    expect(result.current.lastModifiedFieldName).toBe('talentHourlyRate')
    expect(result.current.lastModifiedFieldValue).toBe('')
  })

  it('can change single field', () => {
    const { result } = renderHook(useLastField)

    expect(result.current.lastFocusedFieldName).toBe('talentHourlyRate')

    act(() => {
      result.current.updateField('lastFocusedFieldName', 'myTestField')
    })

    expect(result.current.lastFocusedFieldName).toBe('myTestField')
  })

  it('can change all fields', () => {
    const { result } = renderHook(useLastField)

    act(() => {
      result.current.setFields({
        lastFocusedFieldName: 'companyHourlyRate',
        lastModifiedFieldName: 'companyPartTimeRate',
        lastModifiedFieldValue: '100'
      })
    })

    expect(result.current.lastFocusedFieldName).toBe('companyHourlyRate')
    expect(result.current.lastModifiedFieldName).toBe('companyPartTimeRate')
    expect(result.current.lastModifiedFieldValue).toBe('100')
  })
})
