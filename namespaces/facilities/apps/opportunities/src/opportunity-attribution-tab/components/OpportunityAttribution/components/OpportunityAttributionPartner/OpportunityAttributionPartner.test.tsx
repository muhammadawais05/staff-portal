import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { EditableField } from '@staff-portal/editable'

import OpportunityAttributionPartner from './OpportunityAttributionPartner'
import useOpportunityPartnerOptions from '../../utils/use-opportunity-partner-options'
import { getOpportunityValueHook } from '../../utils/get-opportunity-value-hook'

jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))
jest.mock('../../utils/use-opportunity-partner-options', () => jest.fn())
jest.mock('../../utils/get-opportunity-value-hook', () => ({
  getOpportunityValueHook: jest.fn()
}))

const mockedEditableField = EditableField as jest.Mock
const mockedGetOpportunityValueHook = getOpportunityValueHook as jest.Mock
const mockedUseOpportunityPartnerOptions =
  useOpportunityPartnerOptions as jest.Mock

const arrangeTest = (
  props: ComponentProps<typeof OpportunityAttributionPartner>
) => render(<OpportunityAttributionPartner {...props} />)

describe('OpportunityAttributionPartner', () => {
  it('renders component', () => {
    const getValueMock = () => null
    const onChangeMock = () => null
    const editableFieldMock = jest.fn(() => null)
    const partnerOptionsMock = jest.fn(() => {
      return { opportunityPartnerOptions: ['partner-1', 'partner-2'] }
    })

    mockedGetOpportunityValueHook.mockReturnValueOnce(getValueMock)
    mockedUseOpportunityPartnerOptions.mockReturnValueOnce(partnerOptionsMock)
    mockedEditableField.mockImplementation(editableFieldMock)

    const opportunityId = 'testOpportunityId'
    const updateOpportunityDisabled = false
    const partner = 'partner-1'

    arrangeTest({
      opportunityId: opportunityId,
      updateOpportunityDisabled: updateOpportunityDisabled,
      partner: partner,
      onChange: onChangeMock
    })

    expect(editableFieldMock).toHaveBeenCalledTimes(1)
    expect(editableFieldMock).toHaveBeenCalledWith(
      {
        disabled: updateOpportunityDisabled,
        name: 'partner',
        multiline: true,
        updateOnBlur: true,
        onChange: onChangeMock,
        queryValue: getValueMock,
        value: 'partner-1',
        viewer: 'partner-1',
        editor: expect.any(Function)
      },
      {}
    )
  })
})
