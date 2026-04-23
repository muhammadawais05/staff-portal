import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { EditableField } from '@staff-portal/editable'

import OpportunityAttributionSource from './OpportunityAttributionSource'
import useOpportunitySourceOptions from '../../utils/use-opportunity-source-options'
import { getOpportunityValueHook } from '../../utils/get-opportunity-value-hook'

jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))
jest.mock('../../utils/use-opportunity-source-options', () => jest.fn())
jest.mock('../../utils/get-opportunity-value-hook', () => ({
  getOpportunityValueHook: jest.fn()
}))

const mockedEditableField = EditableField as jest.Mock
const mockedGetOpportunityValueHook = getOpportunityValueHook as jest.Mock
const mockedUseOpportunitySourceOptions =
  useOpportunitySourceOptions as jest.Mock

const arrangeTest = (
  props: ComponentProps<typeof OpportunityAttributionSource>
) => render(<OpportunityAttributionSource {...props} />)

describe('OpportunityAttributionSource', () => {
  it('renders component', () => {
    const getValueMock = () => null
    const onChangeMock = () => null
    const editableFieldMock = jest.fn(() => null)
    const sourceOptionsMock = jest.fn(() => {
      return { opportunitySourceOptions: ['source-1', 'source-2'] }
    })

    mockedGetOpportunityValueHook.mockReturnValueOnce(getValueMock)
    mockedUseOpportunitySourceOptions.mockReturnValueOnce(sourceOptionsMock)
    mockedEditableField.mockImplementation(editableFieldMock)

    const opportunityId = 'testOpportunityId'
    const updateOpportunityDisabled = false
    const source = 'source-1'

    arrangeTest({
      opportunityId: opportunityId,
      updateOpportunityDisabled: updateOpportunityDisabled,
      source: source,
      onChange: onChangeMock
    })

    expect(editableFieldMock).toHaveBeenCalledTimes(1)
    expect(editableFieldMock).toHaveBeenCalledWith(
      {
        disabled: updateOpportunityDisabled,
        name: 'source',
        multiline: true,
        updateOnBlur: true,
        onChange: onChangeMock,
        queryValue: getValueMock,
        value: 'source-1',
        viewer: 'source-1',
        editor: expect.any(Function)
      },
      {}
    )
  })
})
