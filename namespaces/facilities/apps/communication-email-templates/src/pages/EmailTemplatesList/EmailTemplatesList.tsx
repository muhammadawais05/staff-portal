import React from 'react'
import ContentWrapper from '@staff-portal/page-wrapper'
import { Container } from '@toptal/picasso'
import { useTouchCounter, CounterName } from '@staff-portal/counters'
import { Filters, Pagination } from '@staff-portal/filters'
import { NoSearchResultsMessage, TableSkeleton } from '@staff-portal/ui'
import { useMessageListener } from '@toptal/staff-portal-message-bus'

import { useHandleEmailTemplatesFilters, useFiltersConfig } from '../../hooks'
import { useGetEmailTemplatesList } from '../../data'
import {
  EmailTemplatesListSearchBar,
  EmailTemplatesListTable,
  CloneEmailTemplatesButton,
  AddNewTemplateButton
} from '../../components'
import { EmailTemplatesListFragment } from '../../data/use-get-email-templates-list/get-email-templates-list.staff.gql.types'
import { COLUMN_TITLES } from '../../utils'
import { EMAIL_TEMPLATE_UPDATED } from '../../messages'
import { PAGE_SIZES } from '../../config'

const PAGE_TITLE = 'Email Templates'

const NO_RESULTS_MESSAGE =
  'There are no email templates for this search criteria'

export type GroupedEmailTemplates = {
  [key: string]: EmailTemplatesListFragment[]
}

const EmailTemplatesList = () => {
  useTouchCounter({
    counterName: CounterName.TalentApplicants
  })

  const {
    page,
    pagination,
    limit,
    handlePageChange,
    filterValues,
    handleFilterChange,
    sortOptions
  } = useHandleEmailTemplatesFilters()

  const { loading, emailTemplates, operations, totalCount, refetch } =
    useGetEmailTemplatesList({
      filterValues,
      pagination
    })

  useMessageListener(EMAIL_TEMPLATE_UPDATED, () => refetch())

  const { filtersConfig } = useFiltersConfig()

  const emailTemplatesByTargetRole = emailTemplates?.reduce(
    (acc, emailTemplate) => {
      const targetRole = emailTemplate.targetRole.value

      if (!acc[targetRole]) {
        acc[targetRole] = []
      }

      acc[targetRole].push(emailTemplate)

      return acc
    },
    {} as GroupedEmailTemplates
  )

  return (
    <ContentWrapper
      title={PAGE_TITLE}
      browserTitle={PAGE_TITLE}
      itemsCount={totalCount}
      itemsCountLoading={loading}
      actions={
        <>
          <CloneEmailTemplatesButton />
          <Container left='xsmall'>
            <AddNewTemplateButton operation={operations?.createEmailTemplate} />
          </Container>
        </>
      }
    >
      <Filters
        values={filterValues}
        config={filtersConfig}
        onChange={handleFilterChange}
        sortOptions={sortOptions}
        limitOptions={PAGE_SIZES}
      >
        {nestableControls => (
          <EmailTemplatesListSearchBar nestableControls={nestableControls} />
        )}
      </Filters>

      {loading && <TableSkeleton rows={50} cols={COLUMN_TITLES} />}

      {!loading && emailTemplatesByTargetRole && (
        <Container top='xsmall'>
          <EmailTemplatesListTable
            emailTemplatesByTargetRole={emailTemplatesByTargetRole}
          />
        </Container>
      )}

      {!loading && !emailTemplates?.length && (
        <NoSearchResultsMessage message={NO_RESULTS_MESSAGE} />
      )}

      <Container top='medium'>
        <Pagination
          activePage={page}
          onPageChange={handlePageChange}
          limit={limit}
          itemCount={totalCount}
        />
      </Container>
    </ContentWrapper>
  )
}

export default EmailTemplatesList
