import React from 'react'
import { Option } from '@toptal/picasso/Select'
import { Form } from '@toptal/picasso-forms'
import {
  HowDidYouHearValues,
  PatchClientProfileInput
} from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'
import {
  EditableFieldProps,
  QueryResult,
  EditableField
} from '@staff-portal/editable'
import { NO_VALUE } from '@staff-portal/config'

import { SystemInformationFragment } from '../../data'
import { howDidYouHearOptions } from '../../utils'

interface Props {
  howDidYouHear: SystemInformationFragment['howDidYouHear']
  handleChange: EditableFieldProps<PatchClientProfileInput>['onChange']
  operationDisabled: boolean
  useClientHowDidYouHear: () => QueryResult<HowDidYouHearValues>
}

const HowDidYouHear = ({
  howDidYouHear,
  handleChange,
  operationDisabled,
  useClientHowDidYouHear
}: Props) => {
  return (
    <EditableField<PatchClientProfileInput, HowDidYouHearValues, Option[]>
      disabled={operationDisabled}
      flex
      name='howDidYouHear'
      onChange={handleChange}
      queryValue={useClientHowDidYouHear}
      value={
        howDidYouHearOptions.find(({ value }) => value === howDidYouHear)?.value
      }
      viewer={howDidYouHear ? titleize(howDidYouHear) : NO_VALUE}
      editor={props => (
        <Form.Select
          {...props}
          options={howDidYouHearOptions}
          enableReset
          size='small'
          width='full'
        />
      )}
    />
  )
}

export default HowDidYouHear
