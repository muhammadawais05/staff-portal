import { Pagination } from '@staff-portal/filters'
import React from 'react'
import { Container } from '@toptal/picasso'

declare interface Props {
  itemCount: number
  page?: string | number
  pageSize?: number
  onPageChange: (page: number) => void
}

const displayName = 'ListPagination'

const ListPagination = ({ itemCount, page, pageSize, onPageChange }: Props) => {
  return (
    <Container data-testid={displayName}>
      <Pagination
        activePage={page}
        onPageChange={onPageChange}
        limit={pageSize}
        itemCount={itemCount}
      />
    </Container>
  )
}

ListPagination.displayName = displayName

export default ListPagination
