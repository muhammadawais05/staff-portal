import React from 'react'
import {
  Scalars,
  UpdateClientActualSignDateInput
} from '@staff-portal/graphql/staff'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'
import { isOperationEnabled } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { CompanyOperationFragment } from '@staff-portal/clients'
import { NO_VALUE } from '@staff-portal/config'

import { CompanyOverviewFragment } from '../../../../data'
import { SetUpdateClientActualSignDateDocument } from '../../../../data/set-update-client-actual-sign-date.staff.gql.types'
import { getClientActualSignDateHook } from '../../utils/get-client-actual-sign-date-hook'

export interface Props {
  clientId: string
  value: CompanyOverviewFragment['actualSignDate']
  operation: CompanyOperationFragment
}

const ActualSignDate = ({ clientId, value, operation }: Props) => {
  const useClientActualSignDate = getClientActualSignDateHook(clientId)
  const onChange = useEditableFieldChangeHandler({
    mutationDocument: SetUpdateClientActualSignDateDocument,
    initialValues: { actualSignDate: value ?? '' },
    requiredValues: { clientId }
  })

  const parsedDate = parseAndFormatDate(value, { dateFormat: 'MMMM d, yyyy' })

  return (
    <EditableField<
      UpdateClientActualSignDateInput,
      Scalars['Date'] | null | undefined
    >
      disabled={!isOperationEnabled(operation)}
      name='actualSignDate'
      onChange={onChange}
      queryValue={useClientActualSignDate}
      value={value || null}
      updateOnBlur
      viewer={parsedDate || NO_VALUE}
      editor={props => (
        <FormDatePickerWrapper {...props} size='small' autoFocus />
      )}
    />
  )
}

export default ActualSignDate
