import React from 'react'

import { EditableFieldProps } from '../../types'
import EditableField from '../EditableField'
import { getYesOrNoDisplay } from './utils'
import { YesOrNoEditor } from './components'

export const YesOrNoDropdown = <TMutationInput, TQueryOptions>({
  value,
  name,
  ...rest
}: Omit<
  EditableFieldProps<TMutationInput, number, TQueryOptions>,
  'editor' | 'viewer'
>) => (
  <EditableField<TMutationInput, number, TQueryOptions>
    {...rest}
    name={name}
    value={value}
    viewer={getYesOrNoDisplay(value)}
    adjustValues={values => ({
      ...values,
      [name]: Boolean(values[name])
    })}
    editor={YesOrNoEditor}
  />
)

export default YesOrNoDropdown
