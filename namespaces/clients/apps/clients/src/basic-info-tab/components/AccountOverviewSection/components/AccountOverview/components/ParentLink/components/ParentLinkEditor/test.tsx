import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { Form, useForm } from '@toptal/picasso-forms'
import { TestWrapper } from '@staff-portal/test-utils'
import { CompanyAutocomplete } from '@staff-portal/clients'

import { ParentLinkEditor } from '.'

jest.mock('@staff-portal/clients/src/containers/CompanyAutocomplete', () =>
  jest.fn()
)
jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useForm: jest.fn()
}))

const mockUseForm = useForm as jest.Mock
const onChangeForm = jest.fn()
const companyAutocompleteMock = CompanyAutocomplete as jest.Mock

describe('ParentLinkEditor', () => {
  beforeEach(() => {
    companyAutocompleteMock.mockImplementation(() => null)
    mockUseForm.mockReturnValue({
      change: onChangeForm
    })
  })
  it('renders as expected', () => {
    render(
      <TestWrapper>
        <Form onSubmit={() => {}} initialValues={{}}>
          <ParentLinkEditor
            name='parentId'
            disabled={false}
            value='id'
            onChange={() => {}}
          />
        </Form>
      </TestWrapper>
    )

    expect(companyAutocompleteMock).toHaveBeenCalledTimes(1)
    expect(companyAutocompleteMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'parentId',
        disabled: false,
        initialDisplayValue: 'id',
        placeholder: 'Select company'
      }),
      {}
    )
  })
})
