import React, { useEffect, useState } from 'react'
import { Form, useForm } from '@toptal/picasso-forms'
import { Props as FormSelectProps } from '@toptal/picasso-forms/Select/Select'

import {
  InvestigationAvailableReason,
  INVESTIGATION_AVAILABLE_REASONS
} from '../../../../../../config'
import { INVESTIGATION_AVAILABLE_REASON_TYPE_TEXT_MAPPING } from '../../../InvestigationCreateModal/config'

type Props = Pick<
  FormSelectProps<string>,
  'name' | 'label' | 'width' | 'required'
>

const ReasonTypeSelect = (props: Props) => {
  const { getState } = useForm()
  const { name } = props

  const options = INVESTIGATION_AVAILABLE_REASONS.map(value => ({
    text: INVESTIGATION_AVAILABLE_REASON_TYPE_TEXT_MAPPING[value],
    value,
    disabled: false
  }))
  const [allOptions, setAllOptions] = useState(options)

  // support for deprecated values,
  // that are not listed in options, but can be received from BE as pre-selected
  useEffect(() => {
    const { values } = getState()
    const value = values[name] as InvestigationAvailableReason | undefined

    if (value && !allOptions.some(option => option.value === value)) {
      const text =
        INVESTIGATION_AVAILABLE_REASON_TYPE_TEXT_MAPPING[value] || 'UNKNOWN'

      setAllOptions([
        {
          disabled: true,
          text,
          value
        },
        ...allOptions
      ])
    }
  }, [name, getState, allOptions, setAllOptions])

  return <Form.Select {...props} options={allOptions} />
}

export default ReasonTypeSelect
