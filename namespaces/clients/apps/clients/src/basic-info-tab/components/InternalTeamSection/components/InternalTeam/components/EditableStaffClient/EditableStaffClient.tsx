import React from 'react'
import { EditableStaff, EditableStaffProps } from '@staff-portal/staff'
import { INTERNAL_TEAM_UPDATE } from '@staff-portal/clients'
import { QueryResult } from '@staff-portal/editable'

type EditableStaffClientRequiredInput = { clientId: string }

type EditableStaffClientProps<
  TMutationInput extends EditableStaffClientRequiredInput
> = Omit<EditableStaffProps<TMutationInput>, 'queryHook'> & {
  clientId: string
  queryHook: (clientId: string) => () => QueryResult<string>
}

const EditableStaffClient = <
  TMutationInput extends EditableStaffClientRequiredInput
>(
  props: EditableStaffClientProps<TMutationInput>
) => {
  const { clientId, queryHook } = props

  return (
    <EditableStaff<TMutationInput>
      {...props}
      queryHook={queryHook(clientId)}
      requiredValues={{ clientId } as TMutationInput}
      mutationResultOptions={{
        successMessageEmitOptions: {
          type: INTERNAL_TEAM_UPDATE,
          payload: { clientId: props.clientId }
        }
      }}
    />
  )
}

export default EditableStaffClient
