import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { EditableField } from '@staff-portal/editable'

import { getClientCareerPagesHook } from '../../../../utils'
import InDepthCompanyResearchCareerPages from './InDepthCompanyResearchCareerPages'
import { useUpdateClientCareerPages } from './data'

jest.mock('./data', () => ({
  useUpdateClientCareerPages: jest.fn()
}))
jest.mock('@staff-portal/editable', () => ({
  EditableField: jest.fn()
}))
jest.mock('../../../../utils', () => ({
  getClientCareerPagesHook: jest.fn()
}))

const mockedEditableField = EditableField as jest.Mock
const mockedGetClientCareerPagesHook = getClientCareerPagesHook as jest.Mock
const mockedUseUpdateClientCareerPages = useUpdateClientCareerPages as jest.Mock

const arrangeTest = (
  props: ComponentProps<typeof InDepthCompanyResearchCareerPages>
) => render(<InDepthCompanyResearchCareerPages {...props} />)

describe('InDepthCompanyResearchCareerPages', () => {
  it('renders component', () => {
    const getValueMock = () => null
    const onChangeMock = () => null
    const editableFieldMock = jest.fn(() => null)

    mockedGetClientCareerPagesHook.mockReturnValueOnce(getValueMock)
    mockedUseUpdateClientCareerPages.mockReturnValueOnce({
      handleChange: onChangeMock
    })
    mockedEditableField.mockImplementation(editableFieldMock)
    const value = [
      {
        __typename: 'CareerPage' as const,
        id: '',
        primary: false
      }
    ]
    const name = 'careerPages'
    const disabled = false

    arrangeTest({
      value,
      name,
      disabled,
      clientId: '123'
    })

    expect(editableFieldMock).toHaveBeenCalledTimes(1)
    expect(editableFieldMock).toHaveBeenCalledWith(
      {
        name,
        onChange: onChangeMock,
        queryValue: getValueMock,
        value,
        viewer: expect.any(Object),
        editor: expect.any(Function),
        disabled,
        fullWidthEditor: true
      },
      {}
    )
  })
})
