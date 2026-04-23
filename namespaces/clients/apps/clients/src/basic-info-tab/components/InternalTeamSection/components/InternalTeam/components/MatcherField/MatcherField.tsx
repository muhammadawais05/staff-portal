import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { Option } from '@toptal/picasso/Select'
import { UpdateClientMatcherInput } from '@staff-portal/graphql/staff'
import { isOperationEnabled, OperationFragment } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { UserVerticalFragment } from '@staff-portal/verticals'
import { InternalTeamMatcherFragment } from '@staff-portal/clients'

import { SetUpdateClientMatcherDocument } from '../../../../data/set-update-client-matcher.staff.gql.types'
import {
  getClientMatchersForVerticalHook,
  getClientMatchersHook
} from '../../utils'
import { MatcherFieldViewer, MatcherFieldIcon } from './components'
import { adjustClientMatcherValues } from './utils'

interface Props {
  clientId: string
  operation: OperationFragment
  value?: Partial<InternalTeamMatcherFragment>
  vertical: Partial<UserVerticalFragment>
}

const DEFAULT_MATCHER = {
  text: 'Automatic (assigned on first job posting)',
  value: ''
}

const MatcherField = ({ clientId, value, vertical, operation }: Props) => {
  const { node } = value || {}
  const useGetClientMatchersHook = getClientMatchersHook(
    clientId,
    vertical.talentType || ''
  )
  const useGetVerticalMatchersHook = getClientMatchersForVerticalHook(vertical)
  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: SetUpdateClientMatcherDocument,
    initialValues: {
      matcherId: node?.role.id || ''
    },
    requiredValues: {
      clientId,
      verticalId: vertical?.id || ''
    }
  })

  return (
    <EditableField<UpdateClientMatcherInput, string, Option[]>
      flex
      name='matcherId'
      onChange={handleChange}
      value={node?.role?.id}
      disabled={!isOperationEnabled(operation)}
      viewer={<MatcherFieldViewer value={node?.role} />}
      adjustValues={adjustClientMatcherValues}
      queryValue={useGetClientMatchersHook}
      queryOptions={useGetVerticalMatchersHook}
      icon={<MatcherFieldIcon value={value} />}
      editor={({ options = [], ...props }) => (
        <Form.Select
          {...props}
          options={[DEFAULT_MATCHER, ...options]}
          enableReset
          size='small'
          width='full'
        />
      )}
    />
  )
}

export default MatcherField
