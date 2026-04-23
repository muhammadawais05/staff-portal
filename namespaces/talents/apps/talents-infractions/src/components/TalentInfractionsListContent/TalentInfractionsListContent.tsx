import React from 'react'
import { Container } from '@toptal/picasso'
import { ItemsList, NoSearchResultsMessage } from '@staff-portal/ui'
import { Pagination } from '@staff-portal/filters'
import {
  TalentInfractionItem,
  TalentInfractionFragment
} from '@staff-portal/talents-infractions'

const NO_RESULTS_MESSAGE = 'There are no infractions for this search criteria.'

export interface Props {
  talentInfractions?: TalentInfractionFragment[]
  totalCount?: number
  page?: string | number
  limit?: number
  loading: boolean
  onPageChange: (page: number) => void
  onRemove: () => void
}

const TalentInfractionsListContent = ({
  talentInfractions,
  totalCount,
  page,
  limit,
  loading,
  onPageChange,
  onRemove
}: Props) => {
  const talentInfractionListData = !loading ? talentInfractions : undefined

  return (
    <>
      <Container top='medium' bottom='medium'>
        <ItemsList<TalentInfractionFragment>
          data={talentInfractionListData}
          loading={loading}
          renderItem={(infraction: TalentInfractionFragment) => (
            <TalentInfractionItem infraction={infraction} onRemove={onRemove} />
          )}
          getItemKey={(infraction: TalentInfractionFragment) => infraction.id}
          notFoundMessage={
            <NoSearchResultsMessage message={NO_RESULTS_MESSAGE} />
          }
        />
      </Container>

      <Pagination
        activePage={page}
        onPageChange={onPageChange}
        limit={limit}
        itemCount={totalCount}
      />
    </>
  )
}

export default TalentInfractionsListContent
