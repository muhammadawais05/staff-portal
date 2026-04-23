import { renderHook } from '@testing-library/react-hooks'

import { useDatepickerTimezoneProps, temporaryOnChangeHandler } from '.'
import { useUserContext } from '../../context/userContext'
import { parse } from '../../dateTime'

jest.mock('../../context/userContext')

describe('_lib/form/helpers', () => {
  it('temporaryOnChangeHandler', () => {
    expect(temporaryOnChangeHandler(parse('2099-12-12').toJSDate())).toBe(
      '2099-12-12'
    )
  })

  it('useDatepickerTimezoneProps', () => {
    const context = {
      datepickerDisplayDateFormat: 'test',
      datepickerEditDateFormat: 'test',
      weekStartsOn: 1,
      currentUser: {
        timeZone: {
          value: 'test'
        }
      }
    }

    useUserContext.mockImplementation(() => context)

    const { result: result1 } = renderHook(() => useDatepickerTimezoneProps())

    expect(result1.current).toEqual({
      onChange: temporaryOnChangeHandler,
      displayDateFormat: 'test',
      editDateFormat: 'test',
      timezone: 'test',
      weekStartsOn: 1
    })

    useUserContext.mockImplementation(() => ({
      ...context,
      datepickerDisplayDateFormat: '',
      datepickerEditDateFormat: '',
      weekStartsOn: 0
    }))

    const { result: result2 } = renderHook(() => useDatepickerTimezoneProps())

    expect(result2.current).toEqual({
      onChange: temporaryOnChangeHandler,
      displayDateFormat: undefined,
      editDateFormat: undefined,
      timezone: 'test',
      weekStartsOn: 0
    })
  })
})
