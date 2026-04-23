import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { UpdateClientLegalNameInput } from '@staff-portal/graphql/staff'
import { isOperationEnabled } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { CompanyOperationFragment } from '@staff-portal/clients'
import { NO_VALUE } from '@staff-portal/config'

import { CompanyOverviewFragment } from '../../../../data'
import { getClientLegalAndFullNameHook } from '../../utils'
import { SetUpdateClientLegalNameDocument } from '../../../../data/set-update-client-legal-name.staff.gql.types'
import { adjustLegalName } from '../../utils/adjust-values'

interface Props {
  clientId: string
  value: CompanyOverviewFragment['legalName' | 'fullName']
  operation: CompanyOperationFragment
}

const LegalName = ({ clientId, value, operation }: Props) => {
  const useClientLegalAndFullName = getClientLegalAndFullNameHook(clientId)
  const onChange = useEditableFieldChangeHandler({
    mutationDocument: SetUpdateClientLegalNameDocument,
    initialValues: { legalName: value ?? '' },
    requiredValues: { clientId }
  })

  return (
    <EditableField<UpdateClientLegalNameInput>
      disabled={!isOperationEnabled(operation)}
      name='legalName'
      onChange={onChange}
      queryValue={useClientLegalAndFullName}
      value={value || undefined}
      updateOnBlur
      adjustValues={adjustLegalName}
      viewer={value || NO_VALUE}
      editor={props => (
        <Form.Input {...props} autoFocus size='small' width='full' />
      )}
    />
  )
}

export default LegalName
