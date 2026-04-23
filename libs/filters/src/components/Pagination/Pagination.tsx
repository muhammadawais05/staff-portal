import { Pagination as PicassoPagination } from '@toptal/picasso'
import { NUMBER_OF_ITEMS_DISPLAY_LIMIT } from '@staff-portal/config'
import React from 'react'

const DEFAULT_PAGE = 1

const parsePage = (page?: string | number) =>
  (page && Number(page)) || DEFAULT_PAGE

const getTotalPages = (limit?: number, itemCount?: number) =>
  limit && itemCount ? Math.ceil(itemCount / limit) : undefined

export interface Props {
  activePage?: string | number
  onPageChange: (page: number) => void
  limit?: number
  itemCount?: number
}

const Pagination = ({
  activePage = DEFAULT_PAGE,
  itemCount,
  limit,
  onPageChange
}: Props) => {
  const totalCount =
    itemCount && Math.min(itemCount, NUMBER_OF_ITEMS_DISPLAY_LIMIT)
  const totalPages = getTotalPages(limit, totalCount)

  if (!totalPages) {
    return null
  }

  return (
    <PicassoPagination
      data-testid='pagination'
      activePage={parsePage(activePage)}
      onPageChange={onPageChange}
      totalPages={totalPages}
    />
  )
}

export default Pagination
