import { usePagination } from '@staff-portal/filters'

const useHandleCallsPagination = ({ pageSize }: { pageSize: number }) => {
  const { handlePageChange, page, resolving } = usePagination({
    limit: pageSize
  })

  return {
    page,
    handlePageChange,
    resolving
  }
}

export default useHandleCallsPagination
