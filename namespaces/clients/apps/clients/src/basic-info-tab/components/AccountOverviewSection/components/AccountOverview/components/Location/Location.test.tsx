import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { getCountriesHook, EditableCountry } from '@staff-portal/facilities'

import { getClientLocationHook } from '../../utils'
import { adjustLocation } from '../../utils/adjust-values'
import Location from '.'

jest.mock('../../utils')
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))
jest.mock('@staff-portal/facilities', () => ({
  ...jest.requireActual('@staff-portal/facilities'),
  getCountriesHook: jest.fn(),
  EditableCountry: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers/src/hooks')

const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const getClientLocationHookMock = getClientLocationHook as jest.Mock
const getCountriesHookMock = getCountriesHook as jest.Mock
const editableCountryMock = EditableCountry as jest.Mock
const editableFieldMock = EditableField as jest.Mock

const arrangeTest = (props: ComponentProps<typeof Location>) => {
  render(<Location {...props} />)
}

describe('Location', () => {
  beforeEach(() => {
    useEditableFieldChangeHandlerMock.mockReturnValueOnce('handleChange')
    getClientLocationHookMock.mockReturnValueOnce('query')
    getCountriesHookMock.mockReturnValueOnce('options')
    editableCountryMock.mockReturnValue(null)
    editableFieldMock.mockReturnValue(null)
  })

  it('renders as expected', () => {
    arrangeTest({
      city: 'cityValue',
      country: {
        name: 'countryName',
        id: 'countryId'
      },
      clientId: 'clientId',
      editingDisabled: false
    })

    expect(editableFieldMock).toHaveBeenCalledWith(
      expect.objectContaining({
        adjustValues: adjustLocation,
        disabled: false,
        flex: true,
        name: 'location',
        onChange: 'handleChange',
        editor: expect.any(Function),
        queryValue: 'query',
        queryOptions: 'options',
        viewer: 'cityValue, countryName',
        initialValues: {
          location: {
            cityName: 'cityValue',
            countryId: 'countryId'
          }
        }
      }),
      {}
    )
  })
})
