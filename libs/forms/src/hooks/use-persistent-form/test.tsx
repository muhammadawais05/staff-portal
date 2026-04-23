import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { usePersistentFormContext } from '../../contexts'
import { usePersistentForm } from './use-persistent-form'

jest.mock('../../contexts', () => ({
  __esModule: true,
  usePersistentFormContext: jest.fn()
}))

const PLACEHOLDER = 'Some Placeholder'
const FIELD_NAME = 'fieldName'
const FIELD_VALUE = 'hello'

const mockReturnValues = (setForm?: () => void) => {
  const mockUsePersistentFormContext = usePersistentFormContext as jest.Mock

  mockUsePersistentFormContext.mockReturnValue({
    setForm,
    debounceLimit: 0
  })
}

const Wrapper = ({
  formName,
  localStorageKey
}: Partial<{
  formName?: string
  localStorageKey?: string
}> = {}) => {
  usePersistentForm({ nodeId: '1', formName, localStorageKey })

  return <Form.Input name={FIELD_NAME} placeholder={PLACEHOLDER} />
}

const arrangeTest = (
  props: Partial<{
    formName?: string
    localStorageKey?: string
  }> = {}
) => {
  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <Wrapper {...props} />
      </Form>
    </TestWrapper>
  )
}

describe('usePersistentForm', () => {
  it('calls set form with default configuration', async () => {
    const setFormMock = jest.fn()

    mockReturnValues(setFormMock)
    arrangeTest()

    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER), {
      target: { value: FIELD_VALUE }
    })

    await waitFor(() =>
      expect(setFormMock).toHaveBeenCalledWith(
        { [FIELD_NAME]: FIELD_VALUE },
        {
          formName: 'default',
          localStorageKey: undefined,
          nodeId: '1'
        }
      )
    )
  })

  it('calls set form with custom form name', async () => {
    const setFormMock = jest.fn()
    const FORM_NAME = 'formName'

    mockReturnValues(setFormMock)
    arrangeTest({ formName: FORM_NAME })

    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER), {
      target: { value: FIELD_VALUE }
    })

    await waitFor(() =>
      expect(setFormMock).toHaveBeenCalledWith(
        { [FIELD_NAME]: FIELD_VALUE },
        {
          formName: FORM_NAME,
          localStorageKey: undefined,
          nodeId: '1'
        }
      )
    )
  })

  it('calls set form with custom local storage key', async () => {
    const setFormMock = jest.fn()
    const STORAGE_KEY = 'storageKey'

    mockReturnValues(setFormMock)
    arrangeTest({ localStorageKey: STORAGE_KEY })

    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER), {
      target: { value: FIELD_VALUE }
    })

    await waitFor(() =>
      expect(setFormMock).toHaveBeenCalledWith(
        { [FIELD_NAME]: FIELD_VALUE },
        {
          formName: 'default',
          localStorageKey: STORAGE_KEY,
          nodeId: '1'
        }
      )
    )
  })

  it('calls set form with custom local storage key and form name', async () => {
    const setFormMock = jest.fn()
    const STORAGE_KEY = 'storageKey'
    const FORM_NAME = 'formName'

    mockReturnValues(setFormMock)
    arrangeTest({ localStorageKey: STORAGE_KEY, formName: FORM_NAME })

    fireEvent.change(screen.getByPlaceholderText(PLACEHOLDER), {
      target: { value: FIELD_VALUE }
    })

    await waitFor(() =>
      expect(setFormMock).toHaveBeenCalledWith(
        { [FIELD_NAME]: FIELD_VALUE },
        {
          formName: FORM_NAME,
          localStorageKey: STORAGE_KEY,
          nodeId: '1'
        }
      )
    )
  })
})
