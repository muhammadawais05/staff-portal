import React, { ComponentProps } from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import {
  OperationCallableTypes,
  RoleV2Scope
} from '@staff-portal/graphql/staff'
import { DocumentNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetCurrentUser } from '@staff-portal/current-user'

import EditableStaffTransferButton from './EditableStaffTransferButton'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: () => ({ showModal: () => {} })
}))
jest.mock('@staff-portal/current-user', () => ({
  useGetCurrentUser: jest.fn()
}))

const renderComponent = (
  props: ComponentProps<typeof EditableStaffTransferButton>
) =>
  render(
    <TestWrapper>
      <EditableStaffTransferButton {...props} />
    </TestWrapper>
  )

const mockedUseGetCurrentUser = useGetCurrentUser as jest.Mock

describe('EditableStaffTransferButton', () => {
  describe('when user is not same as staff', () => {
    it('returns null if user is not the same staff', () => {
      const staffId = 'staffId'

      mockedUseGetCurrentUser.mockReturnValue({ id: 'userId' })

      renderComponent({
        clientId: 'clientId',
        mutationDocument: {} as DocumentNode,
        mutationName: 'requestClientClaimerTransfer',
        fieldName: 'fieldName',
        scope: RoleV2Scope.COMPANY_CLAIMERS,
        staffId
      })

      expect(
        screen.queryByTestId('EditableStaffTransferButton-transfer-button')
      ).toBeNull()
    })
  })

  describe('when user is same as staff', () => {
    it('renders a transfer button', () => {
      const staffId = 'staffId'

      mockedUseGetCurrentUser.mockReturnValue({ id: staffId })

      renderComponent({
        clientId: 'clientId',
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        },
        mutationDocument: {} as DocumentNode,
        mutationName: 'requestClientClaimerTransfer',
        fieldName: 'fieldName',
        scope: RoleV2Scope.COMPANY_CLAIMERS,
        staffId
      })

      expect(
        screen.getByTestId('EditableStaffTransferButton-transfer-button')
      ).toBeInTheDocument()
    })
  })
})
