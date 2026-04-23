import React from 'react'
import { render } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { isOperationEnabled } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { CompanyOperationFragment } from '@staff-portal/clients'

import { getClientWebsiteHook } from '../../utils/get-client-website-hook'
import Website from '.'
import WebsiteViewer from './WebsiteViewer'

jest.mock('../../utils/get-client-website-hook')
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn(),
  getAdjustSingleStringValue: () => 'adjustFunction'
}))
jest.mock('@staff-portal/operations/src/utils')

const getClientWebsiteHookMock = getClientWebsiteHook as jest.Mock

const editableFieldMock = EditableField as jest.Mock
const isOperationEnabledMock = isOperationEnabled as jest.Mock

const arrangeTest = (operationEnabled: boolean) => {
  const getValue = jest.fn(() => 'query')
  const editableField = jest.fn(() => null)

  getClientWebsiteHookMock.mockImplementation(getValue)

  editableFieldMock.mockImplementation(editableField)
  isOperationEnabledMock.mockImplementation(() => operationEnabled)

  return { getValue, editableField, onChange: () => {} }
}

describe('Website', () => {
  it.each([
    [{ operationEnabled: true, disabled: false }],
    [{ operationEnabled: false, disabled: true }]
  ])('renders as expected', ({ operationEnabled, disabled }) => {
    const url = 'http://test.com'
    const { editableField, onChange } = arrangeTest(operationEnabled)
    const operation: CompanyOperationFragment = {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }

    render(
      <TestWrapper>
        <Website
          clientId='id'
          handleChange={onChange}
          website={url}
          operation={operation}
        />
      </TestWrapper>
    )

    expect(isOperationEnabledMock).toHaveBeenCalledTimes(1)

    expect(editableField).toHaveBeenCalledTimes(1)
    expect(editableField).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: disabled,
        name: 'website',
        onChange: onChange,
        queryValue: 'query',
        adjustValues: 'adjustFunction',
        updateOnBlur: true,
        value: url,
        viewer: expect.objectContaining({
          type: WebsiteViewer,
          props: {
            website: url
          }
        }),
        editor: expect.any(Function)
      }),
      {}
    )
  })
})
