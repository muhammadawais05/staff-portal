import React, { useCallback } from 'react'
import { Container, EmptyState } from '@toptal/picasso'
import { ItemsTable } from '@staff-portal/ui'
import {
  Pagination,
  usePagination,
  SortOption,
  SortOrder,
  Filters,
  FiltersSort
} from '@staff-portal/filters'
import { hasAuthorizationError } from '@staff-portal/data-layer-service'
import { Redirect } from '@staff-portal/navigation'
import { getDashboardPath } from '@staff-portal/routes'
import ContentWrapper from '@staff-portal/page-wrapper'
import {
  QueryParams,
  useQueryParamsState
} from '@staff-portal/query-params-state'
import {
  OrderDirection,
  SourcedTalentOrderField
} from '@staff-portal/graphql/staff'

import SourcedTalentsTableSkeletonLoader from '../SourcedTalentsTableSkeletonLoader'
import { useGetSourcedTalents } from '../../data/get-sourced-talents.staff.gql'
import { SourcedTalentFragment } from '../../data/sourced-talent-fragment.staff.gql.types'
import SourcedTalentsItem from '../SourcedTalentsItem/SourcedTalentsItem'
import { SourcedTalentsTableHeader } from '../SourcedTalentsTableHeader'

const SORT_OPTIONS: SortOption[] = [
  {
    text: 'Applied at',
    value: 'CREATED_AT',
    defaultSort: SortOrder.DESC
  },
  { text: 'Full Name', value: 'FULL_NAME' },
  { text: 'Status', value: 'STATUS' },
  { text: 'Talent Type', value: 'TALENT_TYPE' }
]

const NO_RESULTS_MESSAGE = 'You have not sourced any talent yet'
const PAGE_SIZE = 25

interface SourcedTalentsQueryParams extends QueryParams {
  sort?: { target?: string; order?: string }
}

const SourcedTalentsTable = () => {
  const { limit, page, offset, handlePageChange, filterValues } = usePagination(
    {
      limit: PAGE_SIZE
    }
  )
  const [urlValues, setUrlValues] =
    useQueryParamsState<SourcedTalentsQueryParams>()

  const onFilterChange = useCallback(
    (values: SourcedTalentsQueryParams) => {
      setUrlValues(values)
    },
    [setUrlValues]
  )

  const { data, loading, error } = useGetSourcedTalents({
    pagination: { offset, limit },
    order: {
      field:
        (urlValues?.sort?.target as SourcedTalentOrderField) ??
        SORT_OPTIONS[0].value,
      direction:
        (urlValues?.sort?.order?.toUpperCase() as OrderDirection) ??
        (SORT_OPTIONS[0].defaultSort?.toUpperCase() as OrderDirection)
    }
  })

  if (hasAuthorizationError(error, 'sourcedTalents')) {
    return <Redirect to={getDashboardPath()} />
  }

  const renderItem = (item: SourcedTalentFragment, index: number) => (
    <SourcedTalentsItem key={item.id} sourcedTalent={item} index={index} />
  )

  return (
    <ContentWrapper
      title='Sourced Talent'
      itemsCount={data?.sourcedTalents?.totalCount}
      actions={
        <Filters values={filterValues} config={[]} onChange={onFilterChange}>
          {() => <FiltersSort options={SORT_OPTIONS} filtersSize='small' />}
        </Filters>
      }
    >
      <Container top='large' bottom='large'>
        {loading ? (
          <SourcedTalentsTableSkeletonLoader />
        ) : data?.sourcedTalents?.nodes.length === 0 ? (
          <EmptyState.Collection data-testid='sourced-talents-empty-message'>
            {NO_RESULTS_MESSAGE}
          </EmptyState.Collection>
        ) : (
          <ItemsTable<SourcedTalentFragment>
            renderHeader={() => <SourcedTalentsTableHeader />}
            data={data?.sourcedTalents?.nodes || []}
            renderRow={renderItem}
          />
        )}
      </Container>

      <Pagination
        activePage={page}
        onPageChange={handlePageChange}
        limit={limit}
        itemCount={data?.sourcedTalents?.totalCount}
      />
    </ContentWrapper>
  )
}

export default SourcedTalentsTable
