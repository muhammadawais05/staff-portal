import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { PatchClientProfileInput } from '@staff-portal/graphql/staff'
import {
  EditableFieldProps,
  QueryResult,
  EditableField
} from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { SystemInformationFragment } from '../../data'

interface Props {
  howDidYouHearDetails: SystemInformationFragment['howDidYouHearDetails']
  handleChange: EditableFieldProps<PatchClientProfileInput>['onChange']
  operationDisabled: boolean
  useClientHowDidYouHearDetails: () => QueryResult<string>
}

const HowDidYouHearDetails = ({
  howDidYouHearDetails,
  handleChange,
  operationDisabled,
  useClientHowDidYouHearDetails
}: Props) => {
  return (
    <EditableField<PatchClientProfileInput>
      disabled={operationDisabled}
      name='howDidYouHearDetails'
      onChange={handleChange}
      queryValue={useClientHowDidYouHearDetails}
      value={howDidYouHearDetails || undefined}
      updateOnBlur
      viewer={howDidYouHearDetails || NO_VALUE}
      editor={props => (
        <Form.Input {...props} autoFocus size='small' width='full' />
      )}
    />
  )
}

export default HowDidYouHearDetails
