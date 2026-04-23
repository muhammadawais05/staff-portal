import React from 'react'
import { TypographyOverflow } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import { isOperationEnabled } from '@staff-portal/operations'
import { EditableFieldProps, EditableField } from '@staff-portal/editable'
import {
  CompanyOperationFragment,
  isEnterpriseBusiness
} from '@staff-portal/clients'
import { NO_VALUE } from '@staff-portal/config'

import { CompanyOverviewFragment } from '../../../../data'
import { getClientContactNameHook } from '../../utils'
import { adjustContactName } from '../../utils/adjust-values'

interface Props {
  clientId: string
  contactName?: string
  businessType: CompanyOverviewFragment['businessType']
  handleChange: EditableFieldProps<PatchClientProfileInput>['onChange']
  operation: CompanyOperationFragment
}

const AccountOverviewContactName = ({
  clientId,
  contactName,
  businessType,
  handleChange,
  operation
}: Props) => {
  const useClientContactName = getClientContactNameHook(clientId)
  const editingEnabled = !isOperationEnabled(operation)

  return isEnterpriseBusiness(businessType) ? (
    <TypographyOverflow color='inherit' size='medium'>
      {contactName || NO_VALUE}
    </TypographyOverflow>
  ) : (
    <EditableField<PatchClientProfileInput>
      disabled={editingEnabled}
      name='contactName'
      onChange={handleChange}
      queryValue={useClientContactName}
      value={contactName || undefined}
      updateOnBlur
      adjustValues={adjustContactName}
      viewer={contactName || NO_VALUE}
      editor={props => (
        <Form.Input {...props} autoFocus size='small' width='full' />
      )}
    />
  )
}

export default AccountOverviewContactName
