import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import {
  BusinessTypes,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { EditableField } from '@staff-portal/editable'
import { isEnterpriseBusiness } from '@staff-portal/clients'

import AccountOverviewContactName from '.'
import { getClientContactNameHook } from '../../utils'
import { adjustContactName } from '../../utils/adjust-values'

jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))
jest.mock(
  '@staff-portal/clients/src/services/is-enterprise-business/is-enterprise-business.ts'
)
jest.mock('../../utils')

const editableFieldMock = EditableField as jest.Mock
const getClientContactNameMock = getClientContactNameHook as jest.Mock
const adjustContactNameMock = adjustContactName as jest.Mock
const isEnterpriseBusinessMock = isEnterpriseBusiness as jest.Mock

const arrangeTest = (
  props: Partial<ComponentProps<typeof AccountOverviewContactName>> = {}
) => {
  return render(
    <TestWrapper>
      <AccountOverviewContactName
        clientId='123'
        contactName='John Doe'
        businessType={BusinessTypes.ENTERPRISE_BUSINESS}
        handleChange={() => {}}
        operation={{
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }}
        {...props}
      />
    </TestWrapper>
  )
}

describe('ContactName', () => {
  describe('when company is Enterprise business', () => {
    it('renders non-editable value', () => {
      isEnterpriseBusinessMock.mockImplementation(() => true)
      arrangeTest()

      const nonEditableValue = screen.getByTestId('TypographyOverflow')

      expect(nonEditableValue).toHaveTextContent(/John Doe/)

      expect(editableFieldMock).not.toHaveBeenCalled()
    })
  })

  describe('when company is non-Enterprise business', () => {
    it('renders editable value with expected props', () => {
      const value = 'a'
      const expectedValue = 'a'
      const expectedViewer = 'a'

      const handleChange = () => {}
      const useGetClientNameFn = jest.fn(() => 'query')

      isEnterpriseBusinessMock.mockImplementation(() => false)
      editableFieldMock.mockImplementation(() => null)
      getClientContactNameMock.mockImplementation(useGetClientNameFn)
      arrangeTest({ handleChange, contactName: value })

      const nonEditableValue = screen.queryByTestId('TypographyOverflow')

      expect(nonEditableValue).not.toBeInTheDocument()

      expect(getClientContactNameMock).toHaveBeenCalledTimes(1)
      expect(getClientContactNameMock).toHaveBeenCalledWith('123')

      expect(editableFieldMock).toHaveBeenCalledTimes(1)
      expect(editableFieldMock).toHaveBeenCalledWith(
        expect.objectContaining({
          disabled: false,
          name: 'contactName',
          value: expectedValue,
          onChange: handleChange,
          queryValue: 'query',
          updateOnBlur: true,
          adjustValues: adjustContactNameMock,
          viewer: expectedViewer,
          editor: expect.any(Function)
        }),
        {}
      )
    })

    it('renders nothing for an empty contact name', () => {
      isEnterpriseBusinessMock.mockImplementation(() => true)

      const value = ''

      const handleChange = () => {}

      arrangeTest({ handleChange, contactName: value })

      const nonEditableValue = screen.queryByTestId('TypographyOverflow')

      expect(nonEditableValue).toBeInTheDocument()
      expect(editableFieldMock).toHaveBeenCalledTimes(0)
    })
  })
})
