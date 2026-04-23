import { useFormState } from '@toptal/picasso-forms'
import React, { useMemo } from 'react'

import { ProfileContent, PitcherState } from '../../types'
import { getPreviewData } from '../../utils/getPreviewData'
import Editor from '../Editor'
import Preview from '../Preview'

interface ManualHighlightProps {
  talentId: string
  fullName: string
  roleType: string | null
  inEdit: boolean
  content: ProfileContent
}

const ManualHighlight = ({
  talentId,
  fullName,
  roleType,
  content,
  inEdit
}: ManualHighlightProps) => {
  const { values: stateValues } = useFormState<PitcherState>({
    subscription: { values: true }
  })

  const values = useMemo(
    () => getPreviewData({ content, state: stateValues }),
    [stateValues, content]
  )

  return inEdit ? (
    <Editor
      talentId={talentId}
      fullName={fullName}
      roleType={roleType}
      content={content}
    />
  ) : (
    <Preview roleType={roleType} fullName={fullName} values={values} />
  )
}

export default ManualHighlight
