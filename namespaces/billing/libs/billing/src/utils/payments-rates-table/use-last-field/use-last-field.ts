import { useState } from 'react'

import { FieldName } from '../types'

export type LastFieldStateType = {
  lastFocusedFieldName: FieldName
  lastModifiedFieldName: FieldName
  lastModifiedFieldValue: string
}

export type HandleLastFieldType = (
  key: keyof LastFieldStateType,
  value: FieldName | string
) => void

export const useLastField = () => {
  const [state, setState] = useState<LastFieldStateType>({
    lastFocusedFieldName: 'talentHourlyRate',
    lastModifiedFieldName: 'talentHourlyRate',
    lastModifiedFieldValue: ''
  })

  const updateField: HandleLastFieldType = (key, value) =>
    setState({ ...state, [key]: value })

  return {
    ...state,
    updateField,
    setFields: setState
  }
}
