import { Tag, TagProps } from '@toptal/picasso'
import React, { forwardRef } from 'react'

import * as S from './styles'

const CustomTag = forwardRef<HTMLDivElement, TagProps>(
  ({ children, ...other }: TagProps, ref) => (
    <Tag
      ref={ref}
      css={other.variant === 'blue' ? S.tagBrown : undefined}
      {...other}
    >
      {children}
    </Tag>
  )
)

export default CustomTag
