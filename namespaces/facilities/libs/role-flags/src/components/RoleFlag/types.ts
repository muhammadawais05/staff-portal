import { ReactNode } from 'react'
import { FlagColor } from '@staff-portal/graphql/staff'

import { RoleFlagFragment } from '../../data/role-flag-fragment'

interface CommonProps {
  plainTooltip?: boolean
  title: string
  color?: FlagColor | null
}

interface CustomTooltipProps extends CommonProps {
  plainTooltip?: false
  showTooltipActions?: boolean
  comment?: string | null
  createdAt: string
  updatedAt: string
  flaggedBy?: string
}

export interface PropsWithPlainTooltip extends CommonProps {
  plainTooltip: true
  comment?: ReactNode
}

export interface PropsWithCustomTooltip extends CustomTooltipProps {
  showTooltipActions?: false
}

export interface PropsWithCustomTooltipAndActions extends CustomTooltipProps {
  showTooltipActions: true
  roleFlagId: string
  operations: RoleFlagFragment['operations']
}
