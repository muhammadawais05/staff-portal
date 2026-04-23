import { Container } from '@toptal/picasso'
import React, { useEffect } from 'react'
import { ItemsList, NoSearchResultsMessage } from '@staff-portal/ui'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { usePagination, Pagination } from '@staff-portal/filters'
import { useTouchCounter, CounterName } from '@staff-portal/counters'
import { ContentWrapper } from '@staff-portal/page-wrapper'
import { ClientFragment } from '@staff-portal/clients'
import { ObscureClient } from '@staff-portal/clients-applicants'

import CompanyApplicantsChart from '../../components/CompanyApplicantsChart'
import {
  useGetCompanyApplicantsList,
  useMarkCompanyApplicantsAsRead
} from './data'
import * as S from './styles'
import { ClientCard } from '../../../components/ClientCard/ClientCard'

const NO_RESULTS_MESSAGE = 'There are no companies for this search criteria'
const PAGE_SIZE = 25

const getCompanyApplicantKey = ({ id }: ClientFragment) => id
const renderCompanyApplicant = (companyApplicant: ClientFragment) =>
  companyApplicant.obscureLead ? (
    <ObscureClient company={companyApplicant} />
  ) : (
    <ClientCard client={companyApplicant} type='applicant' />
  )

const CompanyApplicants = () => {
  const { handleMutationResult } = useHandleMutationResult()
  const { handlePageChange, page, limit, pagination, resolving } =
    usePagination({ limit: PAGE_SIZE })

  const { data, loading } = useGetCompanyApplicantsList(
    { pagination, isClientsList: false },
    resolving
  )

  useTouchCounter({
    counterName: CounterName.CompanyApplicants
  })

  const [markCompanyApplicantsAsRead] = useMarkCompanyApplicantsAsRead({
    onCompleted: ({ touchCounter: mutationResult }) =>
      handleMutationResult({ mutationResult })
  })

  useEffect(() => {
    if (data.companyApplicants?.some(({ isNew }) => isNew)) {
      markCompanyApplicantsAsRead()
    }
  }, [data.companyApplicants, markCompanyApplicantsAsRead])

  return (
    <ContentWrapper title='Company Applicants' itemsCount={data.totalCount}>
      {data.claimingDurationKpiChartDataUrl && (
        <Container css={S.chartWrapper}>
          <CompanyApplicantsChart
            chartUrl={data.claimingDurationKpiChartDataUrl}
          />
        </Container>
      )}

      <Container top='large'>
        <ItemsList<ClientFragment>
          data={data.companyApplicants}
          loading={loading}
          notFoundMessage={
            <NoSearchResultsMessage message={NO_RESULTS_MESSAGE} />
          }
          itemWithoutSection
          getItemKey={getCompanyApplicantKey}
          renderItem={renderCompanyApplicant}
        />
      </Container>

      <Container top='medium'>
        <Pagination
          itemCount={data.totalCount}
          limit={limit}
          activePage={page}
          onPageChange={handlePageChange}
        />
      </Container>
    </ContentWrapper>
  )
}

export default CompanyApplicants
