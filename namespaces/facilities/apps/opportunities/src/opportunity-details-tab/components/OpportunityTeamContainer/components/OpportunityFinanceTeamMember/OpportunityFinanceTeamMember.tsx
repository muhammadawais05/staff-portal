import React from 'react'
import { Option } from '@toptal/picasso/Select'
import { Form } from '@toptal/picasso-forms'
import { EditableField } from '@staff-portal/editable'
import { isOperationEnabled, OperationFragment } from '@staff-portal/operations'
import {
  RoleV2Scope,
  UpdateClientFinanceTeamMemberInput
} from '@staff-portal/graphql/staff'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import {
  EditableStaffViewer,
  getStaffRolesHook,
  getFinanceTeamMemberHook,
  StaffUserFragment
} from '@staff-portal/staff'

import { SetUpdateFinanceTeamMemberDocument } from '../../data'

interface Props {
  operation: OperationFragment
  financeTeamMember: Partial<StaffUserFragment> | undefined | null
  clientId: string
}

const OpportunityFinanceTeamMember = ({
  operation,
  financeTeamMember,
  clientId
}: Props) => {
  const useGetStaffRoles = getStaffRolesHook(RoleV2Scope.FINANCE_TEAM_MEMBERS)
  const useGetFinanceTeamValue = getFinanceTeamMemberHook(clientId)
  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: SetUpdateFinanceTeamMemberDocument,
    initialValues: { financeTeamMemberId: financeTeamMember?.id },
    requiredValues: { clientId }
  })

  return (
    <EditableField<UpdateClientFinanceTeamMemberInput, string, Option[]>
      disabled={!isOperationEnabled(operation)}
      name='financeTeamMemberId'
      onChange={handleChange}
      value={financeTeamMember?.id}
      queryValue={useGetFinanceTeamValue}
      queryOptions={useGetStaffRoles}
      viewer={<EditableStaffViewer value={financeTeamMember} />}
      editor={({ options = [], ...props }) => (
        <Form.Select
          size='small'
          width='full'
          options={options}
          enableReset
          {...props}
        />
      )}
    />
  )
}

export default OpportunityFinanceTeamMember
