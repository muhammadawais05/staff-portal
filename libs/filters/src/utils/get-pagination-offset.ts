import { NUMBER_OF_ITEMS_DISPLAY_LIMIT } from '@staff-portal/config'

export const getPaginationOffset = (
  page: string | number | undefined,
  pageSize: number,
  maxItems: number = NUMBER_OF_ITEMS_DISPLAY_LIMIT
): number => {
  if (!page) {
    return 0
  }

  const pageNum = Number(page) || 1
  const pageAbs = Math.max(1, pageNum)

  return Math.min((pageAbs - 1) * pageSize, maxItems - pageSize)
}
