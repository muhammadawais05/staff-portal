import React, { useMemo } from 'react'
import { Option } from '@toptal/picasso/Select'
import { Form } from '@toptal/picasso-forms'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import {
  EditableFieldProps,
  QueryResult,
  EditableField
} from '@staff-portal/editable'
import { useGetUserVerticals } from '@staff-portal/verticals'
import { NO_VALUE } from '@staff-portal/config'

import { SystemInformationFragment } from '../../data'

interface Props {
  interestedIn: SystemInformationFragment['interestedIn']
  handleChange: EditableFieldProps<PatchClientProfileInput>['onChange']
  operationDisabled: boolean
  useClientInterestedIn: () => QueryResult<string>
}

const InterestedIn = ({
  interestedIn,
  handleChange,
  operationDisabled,
  useClientInterestedIn
}: Props) => {
  const { options } = useGetUserVerticals({
    variables: {
      filter: {
        withPseudo: true
      }
    }
  })

  const interestedInId = useMemo(() => {
    return options?.find(({ text }) => text === interestedIn)?.value
  }, [options, interestedIn])

  return (
    <EditableField<PatchClientProfileInput, string, Option[]>
      disabled={operationDisabled}
      flex
      name='interestedInId'
      onChange={handleChange}
      queryValue={useClientInterestedIn}
      value={interestedInId}
      viewer={interestedIn || NO_VALUE}
      editor={props => (
        <Form.Select
          {...props}
          options={options}
          enableReset
          size='small'
          width='full'
        />
      )}
    />
  )
}

export default InterestedIn
