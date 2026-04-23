import React from 'react'
import { render } from '@testing-library/react'
import {
  BusinessTypes,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { YesOrNoDropdown } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import { getClientDiscountEligibleHook } from '../../utils'
import DiscountEligible from '.'

jest.mock('@staff-portal/editable', () => ({
  YesOrNoDropdown: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers/src/hooks')
jest.mock('../../utils')

const yesOrNoDropdownMock = YesOrNoDropdown as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const getClientDiscountEligibleHookMock =
  getClientDiscountEligibleHook as jest.Mock

describe('DiscountEligible', () => {
  beforeEach(() => {
    yesOrNoDropdownMock.mockReturnValue(null)
    getClientDiscountEligibleHookMock.mockReturnValue('queryValue')
    useEditableFieldChangeHandlerMock.mockReturnValue('onChange')
  })

  it('renders as expected', () => {
    const clientId = 'clientId'
    const operation = {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
    const value = true

    render(
      <DiscountEligible
        value={value}
        clientId={clientId}
        operation={operation}
        businessType={BusinessTypes.ENTERPRISE_BUSINESS}
      />
    )

    expect(getClientDiscountEligibleHookMock).toHaveBeenCalledWith(clientId)
    expect(yesOrNoDropdownMock).toHaveBeenCalledTimes(1)
    expect(yesOrNoDropdownMock).toHaveBeenCalledWith(
      {
        disabled: false,
        name: 'discountEligible',
        onChange: 'onChange',
        queryValue: 'queryValue',
        value: Number(value)
      },
      {}
    )
  })
})
