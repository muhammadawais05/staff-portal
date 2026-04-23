import React, { useMemo } from 'react'
import { Form } from '@toptal/picasso-forms'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import {
  getTimeZoneFullText,
  useGetAvailableTimeZones
} from '@staff-portal/date-time-utils'
import { EditableField, EditableFieldProps } from '@staff-portal/editable'

import { CompanyOverviewFragment } from '../../../../data/company-overview-fragment.staff.gql.types'
import { getClientTimeZoneHook } from '../../utils/get-client-time-zone-hook'

interface Props {
  editingDisabled: boolean
  timeZone: CompanyOverviewFragment['timeZone']
  clientId: string
  handleChange: EditableFieldProps<PatchClientProfileInput>['onChange']
}

const TimeZone = ({
  editingDisabled,
  timeZone,
  clientId,
  handleChange
}: Props) => {
  const { timezones } = useGetAvailableTimeZones()
  const useClientTimeZone = getClientTimeZoneHook(clientId)
  const options = useMemo(
    () => timezones?.map(({ name, value }) => ({ text: name, value })) || [],
    [timezones]
  )

  return (
    <EditableField<PatchClientProfileInput>
      disabled={editingDisabled}
      flex
      name='timeZoneName'
      onChange={handleChange}
      queryValue={useClientTimeZone}
      value={
        timezones?.find(({ name }) => name === timeZone?.name)?.value || ''
      }
      viewer={getTimeZoneFullText(timeZone)}
      editor={props => (
        <Form.Select
          {...props}
          value={props.value || ''}
          options={options}
          size='small'
          width='auto'
          searchThreshold={0}
        />
      )}
    />
  )
}

export default TimeZone
