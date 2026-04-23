import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { Option } from '@toptal/picasso/Select'
import {
  ClientPartnerCategory,
  UpdateClientPartnerCategoryInput
} from '@staff-portal/graphql/staff'
import { titleize, enumToHumanOptions } from '@staff-portal/string'
import { isOperationEnabled, OperationFragment } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { NO_VALUE } from '@staff-portal/config'

import { InternalTeamFragment } from '../../../../data'
import { getClientPartnerCategoryHook } from '../../utils'
import { SetUpdateClientPartnerCategoryDocument } from '../../../../data/set-update-client-partner-category.staff.gql.types'

interface Props {
  clientId: string
  value: InternalTeamFragment['clientPartnerCategory']
  operation: OperationFragment
}

const PartnerCategory = ({
  clientId,
  value: clientPartnerCategory,
  operation
}: Props) => {
  const useGetClientPartnerCategory = getClientPartnerCategoryHook(clientId)
  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: SetUpdateClientPartnerCategoryDocument,
    requiredValues: { clientId },
    initialValues: { clientPartnerCategory: clientPartnerCategory ?? undefined }
  })

  return (
    <EditableField<UpdateClientPartnerCategoryInput, string, Option[]>
      disabled={!isOperationEnabled(operation)}
      name='clientPartnerCategory'
      onChange={handleChange}
      value={clientPartnerCategory || undefined}
      queryValue={useGetClientPartnerCategory}
      viewer={
        clientPartnerCategory ? titleize(clientPartnerCategory) : NO_VALUE
      }
      editor={props => (
        <Form.Select
          {...props}
          options={enumToHumanOptions(ClientPartnerCategory)}
          size='small'
          width='full'
        />
      )}
    />
  )
}

export default PartnerCategory
