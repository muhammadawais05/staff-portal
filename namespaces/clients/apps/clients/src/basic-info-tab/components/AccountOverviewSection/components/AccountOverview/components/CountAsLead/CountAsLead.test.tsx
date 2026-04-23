import React from 'react'
import { render } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { YesOrNoDropdown } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import { getClientCountAsLeadHook } from '../../utils'
import CountAsLead from '.'

jest.mock('@staff-portal/editable', () => ({
  YesOrNoDropdown: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers/src/hooks')
jest.mock('../../utils')

const yesOrNoDropdownMock = YesOrNoDropdown as jest.Mock
const useEditableFieldChangeHandlerMock =
  useEditableFieldChangeHandler as jest.Mock
const getClientCountAsLeadHookMock = getClientCountAsLeadHook as jest.Mock

describe('CountAsLead', () => {
  beforeEach(() => {
    yesOrNoDropdownMock.mockReturnValue(null)
    getClientCountAsLeadHookMock.mockReturnValue('queryValue')
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
      <CountAsLead value={value} clientId={clientId} operation={operation} />
    )

    expect(getClientCountAsLeadHookMock).toHaveBeenCalledWith(clientId)
    expect(yesOrNoDropdownMock).toHaveBeenCalledTimes(1)
    expect(yesOrNoDropdownMock).toHaveBeenCalledWith(
      {
        disabled: false,
        name: 'countAsLead',
        onChange: 'onChange',
        queryValue: 'queryValue',
        value: Number(value)
      },
      {}
    )
  })
})
