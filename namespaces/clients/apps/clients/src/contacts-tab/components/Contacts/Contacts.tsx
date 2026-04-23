import React, { useState, useCallback } from 'react'
import { Section, Checkbox, Container, SkeletonLoader } from '@toptal/picasso'
import { ContainerLoader, DetailedListSkeleton } from '@staff-portal/ui'
import { Pagination, usePagination } from '@staff-portal/filters'

import { useGetClientContacts } from '../../data'
import { Representatives } from './Representatives'
import AddContactButton from '../AddContactButton'

type Props = {
  companyId: string
}

const PAGE_SIZE = 25

// TODO: Improve contacts ordering in https://toptal-core.atlassian.net/browse/SPB-3247
const CompanyContactsSection = ({ companyId }: Props) => {
  const { limit, page, handlePageChange, pagination, normalizePage } =
    usePagination({
      limit: PAGE_SIZE
    })

  const [showDescendants, setShowDescendants] = useState(false)

  const {
    representatives,
    totalCount,
    hasChildrenCompanies,
    operations,
    initialLoading,
    loading
  } = useGetClientContacts({
    clientId: companyId,
    pagination,
    filter: { showDescendants }
  })

  normalizePage(totalCount)

  const showSubsidiaryContactsToggle = useCallback(
    (_: unknown, checked: boolean) => {
      setShowDescendants(checked)
      handlePageChange(1)
    },
    [setShowDescendants, handlePageChange]
  )

  const actions = initialLoading ? (
    <SkeletonLoader.Button size='small' />
  ) : (
    <>
      {hasChildrenCompanies && (
        <Container>
          <Checkbox
            label='Show subsidiary contacts'
            checked={showDescendants}
            onChange={showSubsidiaryContactsToggle}
          />
        </Container>
      )}

      {operations && (
        <Container left='small'>
          <AddContactButton
            companyId={companyId}
            operation={operations.createCompanyRepresentative}
          />
        </Container>
      )}
    </>
  )

  return (
    <Section title='Contacts' variant='withHeaderBar' actions={actions}>
      <ContainerLoader
        loading={loading}
        showSkeleton={initialLoading}
        skeletonComponent={
          <Container data-testid='loader'>
            <Container flex bottom='small'>
              <Container right='small'>
                <SkeletonLoader.Media variant='avatar' size='small' />
              </Container>
              <SkeletonLoader.Header />
            </Container>
            <Container top={1.5}>
              <DetailedListSkeleton
                labelColumnWidth={8}
                columns={2}
                items={14}
              />
            </Container>
          </Container>
        }
      >
        <Container>
          {representatives && (
            <Representatives
              companyId={companyId}
              representatives={representatives}
            />
          )}
        </Container>

        <Container top='medium'>
          <Pagination
            itemCount={totalCount}
            limit={limit}
            activePage={page}
            onPageChange={handlePageChange}
          />
        </Container>
      </ContainerLoader>
    </Section>
  )
}

export default CompanyContactsSection
