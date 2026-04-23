import React from 'react'
import { Option } from '@toptal/picasso/Select'
import { Form } from '@toptal/picasso-forms'
import {
  ClientClaimerCategory,
  UpdateClientClaimerCategoryInput
} from '@staff-portal/graphql/staff'
import { INTERNAL_TEAM_UPDATE } from '@staff-portal/clients'
import { titleize, enumToHumanOptions } from '@staff-portal/string'
import { isOperationEnabled, OperationFragment } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { NO_VALUE } from '@staff-portal/config'

import { InternalTeamFragment } from '../../../../data'
import { getClientClaimerCategoryHook } from '../../utils'
import { SetUpdateClientClaimerCategoryDocument } from '../../../../data/set-update-client-claimer-category.staff.gql.types'

interface Props {
  clientId: string
  value: InternalTeamFragment['claimerCategory']
  operation: OperationFragment
}

const ClaimerCategory = ({
  clientId,
  value: claimerCategory,
  operation
}: Props) => {
  const useGetClientClaimerCategory = getClientClaimerCategoryHook(clientId)
  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: SetUpdateClientClaimerCategoryDocument,
    requiredValues: { clientId },
    initialValues: { claimerCategory },
    mutationResultOptions: {
      successMessageEmitOptions: {
        type: INTERNAL_TEAM_UPDATE,
        payload: { clientId }
      }
    }
  })

  return (
    <EditableField<UpdateClientClaimerCategoryInput, string, Option[]>
      disabled={!isOperationEnabled(operation)}
      name='claimerCategory'
      onChange={handleChange}
      value={claimerCategory || undefined}
      queryValue={useGetClientClaimerCategory}
      viewer={claimerCategory ? titleize(claimerCategory) : NO_VALUE}
      editor={props => (
        <Form.Select
          {...props}
          options={enumToHumanOptions(ClientClaimerCategory)}
          size='small'
          width='full'
        />
      )}
    />
  )
}

export default ClaimerCategory
