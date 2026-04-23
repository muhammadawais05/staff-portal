import React from 'react'
import { Tag, Tooltip, TypographyOverflow } from '@toptal/picasso'

import { getLabelVariant } from './utils'
import RoleFlagWithCustomTooltip from './RoleFlagWithCustomTooltip'
import {
  PropsWithCustomTooltip,
  PropsWithCustomTooltipAndActions,
  PropsWithPlainTooltip
} from './types'

export type Props =
  | PropsWithPlainTooltip
  | PropsWithCustomTooltip
  | PropsWithCustomTooltipAndActions

const RoleFlag = ({ title, color, ...restProps }: Props) => {
  const label = (
    <Tag
      variant={color ? getLabelVariant(color) : undefined}
      titleCase={false}
      data-testid='role-flag'
    >
      <TypographyOverflow
        disableTooltip
        as='span'
        color='inherit'
        weight='inherit'
        size='inherit'
      >
        {title}
      </TypographyOverflow>
    </Tag>
  )

  if (restProps.plainTooltip) {
    return (
      <Tooltip interactive content={restProps.comment}>
        {label}
      </Tooltip>
    )
  }

  if (!restProps.comment && !restProps.showTooltipActions) {
    return label
  }

  return (
    <RoleFlagWithCustomTooltip title={title} {...restProps}>
      {label}
    </RoleFlagWithCustomTooltip>
  )
}

export default RoleFlag
