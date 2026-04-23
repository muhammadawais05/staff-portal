import React, { useCallback } from 'react'
import { render } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { EditableField } from '@staff-portal/editable'

import CompanyRegion from './CompanyRegion'

jest.mock('@staff-portal/editable', () => ({
  __esModule: true,
  EditableField: jest.fn()
}))
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useCallback: jest.fn()
}))

const editableFieldMock = EditableField as jest.Mock
const mockedUseCallback = useCallback as jest.Mock

describe('CompanyRegion', () => {
  it('renders component', () => {
    const operation = {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
    const value = {
      id: 'id',
      name: 'name'
    }
    const handleChange = jest.fn()
    const queryValue = jest.fn()
    const adjustValues = jest.fn()
    const editableField = jest.fn(() => null)
    const mockUseCallback = jest.fn()

    editableFieldMock.mockImplementation(editableField)
    mockedUseCallback.mockReturnValueOnce(mockUseCallback)

    render(
      <TestWrapper>
        <CompanyRegion
          operation={operation}
          value={value}
          name='primaryRegionId'
          handleChange={handleChange}
          queryValue={queryValue}
          adjustValues={adjustValues}
        />
      </TestWrapper>
    )

    expect(editableField).toHaveBeenCalledTimes(1)
    expect(editableField).toHaveBeenCalledWith(
      expect.objectContaining({
        adjustValues,
        disabled: false,
        editor: mockUseCallback,
        flex: true,
        name: 'primaryRegionId',
        onChange: handleChange,
        queryValue: queryValue,
        value: value.id,
        viewer: value.name
      }),
      {}
    )
  })
})
