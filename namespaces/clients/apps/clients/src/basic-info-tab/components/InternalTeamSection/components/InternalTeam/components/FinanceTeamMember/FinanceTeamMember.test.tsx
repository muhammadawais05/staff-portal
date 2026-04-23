import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import {
  OperationCallableTypes,
  RoleV2Scope
} from '@staff-portal/graphql/staff'

import { EditableStaffClient } from '../index'
import FinanceTeamMember from './FinanceTeamMember'

jest.mock('../index', () => ({
  EditableStaffClient: jest.fn()
}))

const editableStaffClientMock = EditableStaffClient as jest.Mock

describe('Finance Team Member', () => {
  it('renders as expected', () => {
    editableStaffClientMock.mockReturnValueOnce(null)

    const clientId = 'clientId'
    const financeTeamMember = {
      id: 'id',
      fullName: 'fullName',
      webResource: { text: 'text' }
    }
    const updateClientFinanceTeamMember = {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }

    render(
      <FinanceTeamMember
        clientId={clientId}
        financeTeamMember={financeTeamMember}
        updateClientFinanceTeamMember={updateClientFinanceTeamMember}
      />
    )

    expect(editableStaffClientMock).toHaveBeenCalledTimes(1)
    expect(editableStaffClientMock).toHaveBeenCalledWith(
      {
        name: 'financeTeamMemberId',
        clientId,
        value: financeTeamMember,
        operation: updateClientFinanceTeamMember,
        scope: RoleV2Scope.FINANCE_TEAM_MEMBERS,
        queryHook: expect.any(Function),
        mutationDocument: expect.any(Object),
        isSelectedOptionDisabled: true
      },
      {}
    )
  })
})
