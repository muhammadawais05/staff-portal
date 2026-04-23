import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { EditableField } from '@staff-portal/editable'

import OpportunityAttributionOffering from './OpportunityAttributionOffering'
import useOpportunityOfferingOptions from '../../utils/use-opportunity-offering-options'
import { getOpportunityValueHook } from '../../utils/get-opportunity-value-hook'

jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))
jest.mock('../../utils/use-opportunity-offering-options', () => jest.fn())
jest.mock('../../utils/get-opportunity-value-hook', () => ({
  getOpportunityValueHook: jest.fn()
}))

const mockedEditableField = EditableField as jest.Mock
const mockedGetOpportunityValueHook = getOpportunityValueHook as jest.Mock
const mockedUseOpportunityOfferingOptions =
  useOpportunityOfferingOptions as jest.Mock

const arrangeTest = (
  props: ComponentProps<typeof OpportunityAttributionOffering>
) => render(<OpportunityAttributionOffering {...props} />)

describe('OpportunityAttributionOffering', () => {
  it('renders component', () => {
    const getValueMock = () => null
    const onChangeMock = () => null
    const editableFieldMock = jest.fn(() => null)
    const offeringOptionsMock = jest.fn(() => {
      return { opportunityOfferingOptions: ['offering-1', 'offering-2'] }
    })

    mockedGetOpportunityValueHook.mockReturnValueOnce(getValueMock)
    mockedUseOpportunityOfferingOptions.mockReturnValueOnce(offeringOptionsMock)
    mockedEditableField.mockImplementation(editableFieldMock)

    const opportunityId = 'testOpportunityId'
    const updateOpportunityDisabled = false
    const offering = 'offering-1'

    arrangeTest({
      opportunityId: opportunityId,
      updateOpportunityDisabled: updateOpportunityDisabled,
      offering: offering,
      onChange: onChangeMock
    })

    expect(editableFieldMock).toHaveBeenCalledTimes(1)
    expect(editableFieldMock).toHaveBeenCalledWith(
      {
        disabled: updateOpportunityDisabled,
        name: 'offering',
        multiline: true,
        updateOnBlur: true,
        onChange: onChangeMock,
        queryValue: getValueMock,
        value: 'offering-1',
        viewer: 'offering-1',
        editor: expect.any(Function)
      },
      {}
    )
  })
})
