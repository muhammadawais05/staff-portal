import { useField } from '@toptal/picasso-forms'
import React from 'react'

import { TagItem } from '../../types/TagItem'
import TagList from '../../components/TagList'
import { toggle } from '../../utils/toggle'

interface TagListFieldProps {
  name: string
  data: TagItem[]
  title: string
  testId: string
  /**
   * How many tags the user can select
   */
  maxLimit?: number
  /**
   * Tooltip text that will be displayed once the maxLimit is reached
   */
  maxLimitWarning?: string
}

const TagListField = ({ name, data, ...rest }: TagListFieldProps) => {
  const {
    input: { value, onChange, onBlur }
  } = useField(name)

  if (data.length === 0) {
    return null
  }

  return (
    <TagList
      data={data}
      value={value}
      toggleItem={(id: string) => {
        onChange(toggle(value.slice(), id))
        onBlur()
      }}
      {...rest}
    />
  )
}

export default TagListField
