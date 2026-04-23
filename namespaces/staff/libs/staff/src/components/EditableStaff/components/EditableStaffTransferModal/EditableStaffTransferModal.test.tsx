import React from 'react'
import { render } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'
import { RoleV2Scope } from '@staff-portal/graphql/staff'
import { DocumentNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import EditableStaffTransferModal from '.'

jest.mock('../../hooks', () => ({
  useRequestTransfer: () => ({})
}))
jest.mock('../../../../utils', () => ({
  useGetStaffRoles: () => ({
    options: { rolesV2: { nodes: [] } }
  })
}))
jest.mock('@toptal/picasso-forms')

const mockedForm = Form as unknown as jest.Mock
const mockedSelect = Form.Select as unknown as jest.Mock
const mockedSubmitButton = Form.SubmitButton as unknown as jest.Mock

const renderComponent = () =>
  render(
    <TestWrapper>
      <EditableStaffTransferModal
        hideModal={() => null}
        clientId='1'
        mutationDocument={{} as DocumentNode}
        mutationName='mutationName'
        fieldName='fieldName'
        scope={RoleV2Scope.COMPANY_CLAIMERS}
      />
    </TestWrapper>
  )

describe('EditableStaffTransferModal', () => {
  beforeEach(() => {
    mockedForm.mockImplementation(({ children }) => children)
    mockedSelect.mockImplementation(() => null)
    mockedSubmitButton.mockImplementation(() => null)
  })

  it('default render', () => {
    renderComponent()

    expect(mockedForm).toHaveBeenCalledTimes(1)
    expect(mockedForm).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        initialValues: expect.objectContaining({ clientId: '1' })
      }),
      {}
    )
    expect(mockedSelect).toHaveBeenCalledTimes(1)
    expect(mockedSelect).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Requested transfer',
        name: 'requestedTransferId'
      }),
      {}
    )
    expect(mockedSubmitButton).toHaveBeenCalledTimes(1)
    expect(mockedSubmitButton).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        children: 'Request Transfer',
        variant: 'positive'
      }),
      {}
    )
  })
})
