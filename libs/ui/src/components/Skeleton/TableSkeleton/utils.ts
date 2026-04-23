import { SkeletonLoader } from '@toptal/picasso'

import { SkeletonColumn, RowItem, SkeletonType } from './types'

export const getColumns = (
  cols: number | Readonly<SkeletonColumn[]>
): Readonly<SkeletonColumn[]> => {
  if (typeof cols === 'number') {
    return [...Array(cols)].map((item, index) => {
      return { key: index.toString() }
    })
  }

  return cols
}

export const getRows = (rows: number | RowItem[]): RowItem[] => {
  if (typeof rows === 'number') {
    return [...Array(rows)].map((item, index) => {
      return { key: index.toString() }
    })
  }

  return rows
}

export const getSkeletonComponent = (col: SkeletonColumn) => {
  const { skeletonType } = col

  switch (skeletonType) {
    case SkeletonType.Media:
      return SkeletonLoader.Media
    case SkeletonType.Button:
      return SkeletonLoader.Button
    default:
      return SkeletonLoader.Typography
  }
}
