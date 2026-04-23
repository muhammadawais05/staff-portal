import React from 'react'
import { isOperationEnabled, OperationFragment } from '@staff-portal/operations'
import { NO_VALUE } from '@staff-portal/config'
import { enumToHumanOptions, titleize } from '@staff-portal/string'
import {
  Maybe,
  ClientPartnerCategory,
  UpdateClientPartnerCategoryInput
} from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { Option } from '@toptal/picasso/Select'
import { Form } from '@toptal/picasso-forms'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import { SetUpdateClientPartnerCategoryDocument } from '../../data'
import { getClientPartnerCategoryHook } from '../../utils'

interface Props {
  operation: OperationFragment
  clientPartnerCategory: Maybe<ClientPartnerCategory>
  clientId: string
}

const clientPartnerCategoryOptions = enumToHumanOptions(ClientPartnerCategory)

const OpportunityClientPartnerCategory = ({
  clientPartnerCategory,
  clientId,
  operation
}: Props) => {
  const useQueryValue = getClientPartnerCategoryHook(clientId)
  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: SetUpdateClientPartnerCategoryDocument,
    initialValues: { clientPartnerCategory },
    requiredValues: { clientId }
  })

  return (
    <EditableField<UpdateClientPartnerCategoryInput, string, Option[]>
      disabled={!isOperationEnabled(operation)}
      name='clientPartnerCategory'
      onChange={handleChange}
      value={clientPartnerCategory || undefined}
      queryValue={useQueryValue}
      viewer={
        clientPartnerCategory ? titleize(clientPartnerCategory) : NO_VALUE
      }
      editor={({ ...props }) => (
        <Form.Select
          size='small'
          width='full'
          enableReset
          {...props}
          options={clientPartnerCategoryOptions}
        />
      )}
    />
  )
}

export default OpportunityClientPartnerCategory
