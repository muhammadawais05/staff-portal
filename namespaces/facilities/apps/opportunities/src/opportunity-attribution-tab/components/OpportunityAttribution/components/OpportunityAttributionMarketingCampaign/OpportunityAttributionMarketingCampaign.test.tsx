import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { EditableField } from '@staff-portal/editable'

import OpportunityAttributionMarketingCampaign from './OpportunityAttributionMarketingCampaign'
import useOpportunityMarketingCampaignOptions from '../../utils/use-opportunity-marketing-campaign-options'
import { getOpportunityValueHook } from '../../utils/get-opportunity-value-hook'

jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))
jest.mock('../../utils/use-opportunity-marketing-campaign-options', () =>
  jest.fn()
)
jest.mock('../../utils/get-opportunity-value-hook', () => ({
  getOpportunityValueHook: jest.fn()
}))

const mockedEditableField = EditableField as jest.Mock
const mockedGetOpportunityValueHook = getOpportunityValueHook as jest.Mock
const mockedUseOpportunityMarketingCampaignOptions =
  useOpportunityMarketingCampaignOptions as jest.Mock

const arrangeTest = (
  props: ComponentProps<typeof OpportunityAttributionMarketingCampaign>
) => render(<OpportunityAttributionMarketingCampaign {...props} />)

describe('OpportunityAttributionMarketingCampaign', () => {
  it('renders component', () => {
    const getValueMock = () => null
    const onChangeMock = () => null
    const editableFieldMock = jest.fn(() => null)
    const marketingCampaignOptionsMock = jest.fn(() => {
      return {
        opportunityMarketingCampaignOptions: [
          'marketing-campaign-1',
          'marketing-campaign-2'
        ]
      }
    })

    mockedGetOpportunityValueHook.mockReturnValueOnce(getValueMock)
    mockedUseOpportunityMarketingCampaignOptions.mockReturnValueOnce(
      marketingCampaignOptionsMock
    )
    mockedEditableField.mockImplementation(editableFieldMock)

    const opportunityId = 'testOpportunityId'
    const updateOpportunityDisabled = false
    const marketingCampaign = 'marketing-campaign-1'

    arrangeTest({
      opportunityId: opportunityId,
      updateOpportunityDisabled: updateOpportunityDisabled,
      marketingCampaign: marketingCampaign,
      onChange: onChangeMock
    })

    expect(editableFieldMock).toHaveBeenCalledTimes(1)
    expect(editableFieldMock).toHaveBeenCalledWith(
      {
        disabled: updateOpportunityDisabled,
        name: 'marketingCampaign',
        multiline: true,
        updateOnBlur: true,
        onChange: onChangeMock,
        queryValue: getValueMock,
        value: 'marketing-campaign-1',
        viewer: 'marketing-campaign-1',
        editor: expect.any(Function)
      },
      {}
    )
  })
})
