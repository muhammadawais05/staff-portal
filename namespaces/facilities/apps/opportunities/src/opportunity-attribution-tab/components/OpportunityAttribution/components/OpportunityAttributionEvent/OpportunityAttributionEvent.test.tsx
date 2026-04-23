import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { EditableField } from '@staff-portal/editable'

import OpportunityAttributionEvent from './OpportunityAttributionEvent'
import useOpportunityEventOptions from '../../utils/use-opportunity-event-options'
import { getOpportunityValueHook } from '../../utils/get-opportunity-value-hook'

jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))
jest.mock('../../utils/use-opportunity-event-options', () => jest.fn())
jest.mock('../../utils/get-opportunity-value-hook', () => ({
  getOpportunityValueHook: jest.fn()
}))

const mockedEditableField = EditableField as jest.Mock
const mockedGetOpportunityValueHook = getOpportunityValueHook as jest.Mock
const mockedUseOpportunityEventOptions = useOpportunityEventOptions as jest.Mock

const arrangeTest = (
  props: ComponentProps<typeof OpportunityAttributionEvent>
) => render(<OpportunityAttributionEvent {...props} />)

describe('OpportunityAttributionEvent', () => {
  it('renders component', () => {
    const getValueMock = () => null
    const onChangeMock = () => null
    const editableFieldMock = jest.fn(() => null)
    const eventOptionsMock = jest.fn(() => {
      return { opportunityEventOptions: ['event-1', 'event-2'] }
    })

    mockedGetOpportunityValueHook.mockReturnValueOnce(getValueMock)
    mockedUseOpportunityEventOptions.mockReturnValueOnce(eventOptionsMock)
    mockedEditableField.mockImplementation(editableFieldMock)

    const opportunityId = 'testOpportunityId'
    const updateOpportunityDisabled = false
    const event = 'event-1'

    arrangeTest({
      opportunityId: opportunityId,
      updateOpportunityDisabled: updateOpportunityDisabled,
      event: event,
      onChange: onChangeMock
    })

    expect(editableFieldMock).toHaveBeenCalledTimes(1)
    expect(editableFieldMock).toHaveBeenCalledWith(
      {
        disabled: updateOpportunityDisabled,
        name: 'event',
        multiline: true,
        updateOnBlur: true,
        onChange: onChangeMock,
        queryValue: getValueMock,
        value: 'event-1',
        viewer: 'event-1',
        editor: expect.any(Function)
      },
      {}
    )
  })
})
