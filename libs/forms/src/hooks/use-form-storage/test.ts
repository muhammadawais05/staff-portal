import { renderHook } from '@testing-library/react-hooks'
import { localStorageService } from '@staff-portal/local-storage-service'

import { useFormStorage } from './use-form-storage'

jest.mock('@staff-portal/local-storage-service')

type FormType = { title: string; comment: string }

const mockReturnValues = () => {
  const store: { [key: string]: unknown } = {}

  const mockedGetItem = localStorageService.getItem as jest.Mock
  const mockedRemoveItem = localStorageService.removeItem as jest.Mock
  const mockedSetItem = localStorageService.setItem as jest.Mock

  mockedGetItem.mockImplementation((key: string) => {
    if (key in store) {
      return store[key]
    }

    return undefined
  })

  mockedRemoveItem.mockImplementation((key: string) => {
    if (key in store) {
      delete store[key]
    }
  })

  mockedSetItem.mockImplementation((key: string, item: unknown) => {
    store[key] = item
  })
}

describe('useFormStorage', () => {
  it('manipulates form local storage item', () => {
    const KEY = 'test_key'
    const FORM_TYPE = 'default'
    const FORM_TITLE = 'Test Form'
    const NEW_FORM_TITLE = 'New Test Form'
    const FORM_COMMENT = 'Form comment'
    const FORM = { title: FORM_TITLE, comment: FORM_COMMENT }

    mockReturnValues()

    const {
      result: {
        current: { setForm, getFormType, getForm, clearFormType, removeForm }
      }
    } = renderHook(() => useFormStorage())

    expect(getFormType(KEY)).toBeUndefined()
    expect(getForm({ key: KEY, formName: FORM_TYPE })).toBeUndefined()

    setForm(FORM, { key: KEY, formName: FORM_TYPE })

    expect(getFormType(KEY)).toBe(FORM_TYPE)
    expect(getForm({ key: KEY, formName: FORM_TYPE })).toBe(FORM)

    setForm(
      { ...FORM, title: NEW_FORM_TITLE },
      { key: KEY, formName: FORM_TYPE }
    )

    expect(getForm<FormType>({ key: KEY, formName: FORM_TYPE })?.title).toBe(
      NEW_FORM_TITLE
    )

    clearFormType(KEY)
    removeForm({ key: KEY, formName: FORM_TYPE })

    expect(getFormType(KEY)).toBeUndefined()
    expect(getForm({ key: KEY, formName: FORM_TYPE })).toBeUndefined()
  })

  it('works with multiple unsaved forms', () => {
    const KEY = 'test_key'
    const FORM_TYPE = 'default'
    const FORM_TITLE = 'Test Form'
    const SECOND_FORM_TITLE = 'Second Test Form'
    const FORM_COMMENT = 'Form comment'
    const FORM = { title: FORM_TITLE, comment: FORM_COMMENT }

    mockReturnValues()

    const {
      result: {
        current: { setForm, getFormType, getForm, removeForm }
      }
    } = renderHook(() => useFormStorage())

    setForm(FORM, { key: KEY, formName: FORM_TYPE })

    const {
      result: {
        current: {
          setForm: setSecondForm,
          getForm: getSecondForm,
          removeForm: removeSecondForm
        }
      }
    } = renderHook(() => useFormStorage())

    setSecondForm(
      { ...FORM, title: SECOND_FORM_TITLE },
      { key: KEY, formName: 'second_form' }
    )

    expect(getFormType(KEY)).toBe('second_form')
    expect(getForm<FormType>({ key: KEY, formName: FORM_TYPE })?.title).toBe(
      FORM_TITLE
    )
    expect(
      getSecondForm<FormType>({ key: KEY, formName: 'second_form' })?.title
    ).toBe(SECOND_FORM_TITLE)

    removeForm({ key: KEY, formName: FORM_TYPE })

    expect(getForm({ key: KEY, formName: FORM_TYPE })).toBeUndefined()
    expect(getSecondForm({ key: KEY, formName: 'second_form' })).toStrictEqual({
      ...FORM,
      title: SECOND_FORM_TITLE
    })

    removeSecondForm({ key: KEY, formName: 'second_form' })

    expect(getSecondForm({ key: KEY, formName: 'second_form' })).toBeUndefined()
    expect(getFormType(KEY)).toBeUndefined()
  })

  it('should cover empty string key', () => {
    mockReturnValues()

    const {
      result: {
        current: { setForm, getFormType, getForm, clearFormType, removeForm }
      }
    } = renderHook(() => useFormStorage())

    expect(getFormType('')).toBeUndefined()
    expect(getForm({ key: '', formName: '' })).toBeUndefined()
    expect(clearFormType('')).toBeUndefined()
    expect(removeForm({ key: '', formName: '' })).toBeUndefined()
    expect(setForm({}, { key: '', formName: '' })).toBeUndefined()
  })

  it('works with wrong form name', () => {
    const KEY = 'test_key'
    const FORM_TYPE = 'default'
    const FORM_TITLE = 'Test Form'
    const FORM_COMMENT = 'Form comment'
    const FORM = { title: FORM_TITLE, comment: FORM_COMMENT }
    const WRONG_KEY = 'wrong_key'
    const WRONG_FORM_NAME = 'wrong_form_name'

    mockReturnValues()

    const {
      result: {
        current: { setForm, getFormType, clearFormType, removeForm }
      }
    } = renderHook(() => useFormStorage())

    setForm(FORM, { key: KEY, formName: FORM_TYPE })

    expect(getFormType(KEY)).toBe(FORM_TYPE)

    clearFormType(WRONG_KEY)

    removeForm({ key: WRONG_KEY, formName: WRONG_FORM_NAME })

    expect(getFormType(KEY)).toBe(FORM_TYPE)
  })
})
