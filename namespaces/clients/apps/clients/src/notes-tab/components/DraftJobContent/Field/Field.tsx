import React, { ReactNode } from 'react'
import { TypographyProps, GridSize } from '@toptal/picasso'
import { Maybe } from '@staff-portal/graphql/staff'

import DraftJobField from '../../DraftJobField'

interface Props {
  label?: Maybe<ReactNode>
  labelCols?: GridSize
  children?: Maybe<ReactNode>
  childrenWeight?: TypographyProps['weight']
  noContent?: string
}

const DraftJobContentField = ({
  label,
  labelCols = 3,
  childrenWeight = 'semibold',
  ...restProps
}: Props) => (
  <DraftJobField
    label={label}
    labelCols={labelCols}
    childrenWeight={childrenWeight}
    {...restProps}
  />
)

export default DraftJobContentField
