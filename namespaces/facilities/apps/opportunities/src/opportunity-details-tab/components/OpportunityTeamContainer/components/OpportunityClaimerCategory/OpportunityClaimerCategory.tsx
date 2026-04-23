import React from 'react'
import { isOperationEnabled, OperationFragment } from '@staff-portal/operations'
import { NO_VALUE } from '@staff-portal/config'
import { enumToHumanOptions, titleize } from '@staff-portal/string'
import {
  Maybe,
  ClientClaimerCategory,
  UpdateClientClaimerCategoryInput
} from '@staff-portal/graphql/staff'
import { EditableField } from '@staff-portal/editable'
import { Option } from '@toptal/picasso/Select'
import { Form } from '@toptal/picasso-forms'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import { SetUpdateClientClaimerCategoryDocument } from '../../data'
import { getClientClaimerCategoryHook } from '../../utils'

interface Props {
  operation: OperationFragment
  claimerCategory: Maybe<ClientClaimerCategory>
  clientId: string
}

const claimerCategoryOptions = enumToHumanOptions(ClientClaimerCategory)

const OpportunityClaimerCategory = ({
  claimerCategory,
  clientId,
  operation
}: Props) => {
  const useQueryValue = getClientClaimerCategoryHook(clientId)
  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: SetUpdateClientClaimerCategoryDocument,
    initialValues: { claimerCategory: claimerCategory },
    requiredValues: { clientId }
  })

  return (
    <EditableField<UpdateClientClaimerCategoryInput, string, Option[]>
      disabled={!isOperationEnabled(operation)}
      name='claimerCategory'
      onChange={handleChange}
      value={claimerCategory || undefined}
      queryValue={useQueryValue}
      viewer={claimerCategory ? titleize(claimerCategory) : NO_VALUE}
      editor={({ ...props }) => (
        <Form.Select
          size='small'
          width='full'
          enableReset
          {...props}
          options={claimerCategoryOptions}
        />
      )}
    />
  )
}

export default OpportunityClaimerCategory
