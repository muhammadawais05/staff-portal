import React from 'react'
import {
  UpdateClientFinanceTeamMemberInput,
  RoleV2Scope
} from '@staff-portal/graphql/staff'
import { CompanyOperationFragment } from '@staff-portal/clients'
import {
  getFinanceTeamMemberHook,
  StaffUserFragment
} from '@staff-portal/staff'

import { EditableStaffClient } from '../../components'
import { SetUpdateFinanceTeamMemberDocument } from '../../../../data/set-update-finance-team-member.staff.gql.types'

export interface Props {
  clientId: string
  financeTeamMember?: StaffUserFragment | null
  updateClientFinanceTeamMember: CompanyOperationFragment
}

const FinanceTeamMember = ({
  clientId,
  financeTeamMember,
  updateClientFinanceTeamMember
}: Props) => (
  <EditableStaffClient<UpdateClientFinanceTeamMemberInput>
    name='financeTeamMemberId'
    clientId={clientId}
    value={financeTeamMember}
    operation={updateClientFinanceTeamMember}
    scope={RoleV2Scope.FINANCE_TEAM_MEMBERS}
    queryHook={getFinanceTeamMemberHook}
    mutationDocument={SetUpdateFinanceTeamMemberDocument}
    isSelectedOptionDisabled
  />
)

export default FinanceTeamMember
