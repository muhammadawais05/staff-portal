import React from 'react'
import { Container } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useGetData } from '@staff-portal/data-layer-service'
import { PageLoader } from '@staff-portal/ui'
import { Filters, Pagination } from '@staff-portal/filters'
import { ContentWrapper } from '@staff-portal/page-wrapper'

import SkillNamesListSearchBar from '../../components/SkillNamesListSearchBar'
import { REFRESH_SKILLS_LIST } from '../../messages'
import { GetVerticalsWithCategoriesDocument } from '../../data/get-verticals-with-categories'
import { SkillNamesTable } from '../../components'
import {
  useHandleSkillNamesListFilters,
  useFiltersConfig,
  useGetSkillNamesForSkillNamesList
} from './hooks'

const SkillsList = () => {
  const getVerticalsWithCategories = useGetData(
    GetVerticalsWithCategoriesDocument,
    'verticals'
  )
  const {
    data: verticalsWithCategories,
    loading: loadingVerticalsWithCategories
  } = getVerticalsWithCategories({})

  const {
    page,
    pagination,
    limit,
    filterValues,
    sortOptions,
    resolving,
    handlePageChange,
    handleFilterChange
  } = useHandleSkillNamesListFilters()

  const {
    data: skillNamesData,
    loading: loadingSkillNames,
    refetch
  } = useGetSkillNamesForSkillNamesList({
    filterValues,
    pagination
  })

  const filtersConfig = useFiltersConfig(
    verticalsWithCategories?.nodes,
    loadingVerticalsWithCategories,
    filterValues
  )

  const loading = loadingSkillNames || loadingVerticalsWithCategories

  useMessageListener([REFRESH_SKILLS_LIST], () => refetch?.())

  if (resolving) {
    return <PageLoader />
  }

  if (!skillNamesData) {
    return null
  }

  return (
    <ContentWrapper
      title='Skills'
      itemsCount={skillNamesData.totalCount}
      itemsCountLoading={loadingSkillNames}
    >
      <Filters
        values={filterValues}
        config={filtersConfig}
        onChange={handleFilterChange}
        sortOptions={sortOptions}
      >
        {nestableControls => (
          <SkillNamesListSearchBar nestableControls={nestableControls} />
        )}
      </Filters>
      <Container top='medium' bottom='medium'>
        <SkillNamesTable
          loading={loading}
          verticalsWithCategories={verticalsWithCategories?.nodes}
          data={skillNamesData.skillNames}
        />
      </Container>
      <Pagination
        activePage={page}
        onPageChange={handlePageChange}
        limit={limit}
        itemCount={skillNamesData.totalCount}
        test-id='SkillsList-pagination'
      />
    </ContentWrapper>
  )
}

export default SkillsList
