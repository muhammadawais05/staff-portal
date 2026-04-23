import { TableCellProps } from '@toptal/picasso/TableCell'
import { ReactNode } from 'react'
import { FlattenSimpleInterpolation } from 'styled-components'

export interface HeaderItemProps extends TableCellProps {
  css?: FlattenSimpleInterpolation
}

export enum SkeletonType {
  Typography,
  Media,
  Button
}

export interface SkeletonColumn {
  key?: string
  title?: string
  dataTestId?: string
  bodyDataTestId?: string
  node?: ReactNode
  props?: HeaderItemProps
  skeletonType?: SkeletonType
  skeletonProps?: { [index: string]: string | number | boolean }
}

export interface RowItem {
  dataTestId?: string
  key?: string
}
