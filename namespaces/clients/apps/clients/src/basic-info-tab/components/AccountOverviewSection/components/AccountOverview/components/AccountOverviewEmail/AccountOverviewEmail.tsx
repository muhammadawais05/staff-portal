import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { isOperationEnabled } from '@staff-portal/operations'
import {
  EditableFieldProps,
  EditableField,
  getAdjustSingleStringValue
} from '@staff-portal/editable'
import { CompanyOperationFragment } from '@staff-portal/clients'
import { LinkOverflow } from '@staff-portal/client-representatives'

import { getClientEmailHook } from '../../utils'

interface Props {
  email: string
  clientId: string
  handleChange: EditableFieldProps<PatchClientProfileInput>['onChange']
  operation: CompanyOperationFragment
}

const AccountOverviewEmail = ({
  clientId,
  email,
  handleChange,
  operation
}: Props) => {
  const useClientEmail = getClientEmailHook(clientId)

  return (
    <EditableField<Pick<PatchClientProfileInput, 'email'>>
      disabled={!isOperationEnabled(operation)}
      name='email'
      onChange={handleChange}
      queryValue={useClientEmail}
      value={email}
      updateOnBlur
      adjustValues={getAdjustSingleStringValue('email')}
      viewer={<LinkOverflow link={{ url: `mailto:${email}`, text: email }} />}
      editor={props => (
        <Form.Input {...props} autoFocus size='small' width='full' />
      )}
    />
  )
}

export default AccountOverviewEmail
