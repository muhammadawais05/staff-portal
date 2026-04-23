import React, { useMemo } from 'react'
import { Container, Pagination, SkeletonLoader } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useParams } from '@staff-portal/navigation'
import {
  NoSearchResultsMessage,
  PageLoader,
  SectionWithDetailedListSkeleton
} from '@staff-portal/ui'
import {
  EmailMessageListItem,
  EmailMessageWithUsers
} from '@staff-portal/communication'
import { Filters, SearchBar } from '@staff-portal/filters'

import {
  useFiltersConfig,
  useSearchBarCategories,
  useEmailMessageListFilters
} from './hooks'
import {
  useGetEmailMessagesListWithUsers,
  getEmailMessageListItemPath
} from './utils'
import { getRoleOrClientIdForEntity } from '../../utils'
import EmailMessageListContentWrapper from '../../components/EmailMessageListContentWrapper'
import * as S from './styles'

const renderItems = (
  emailMessagesWithUsers: EmailMessageWithUsers[],
  {
    entityType,
    entityId
  }: {
    entityType?: string
    entityId?: string
  }
) => {
  return emailMessagesWithUsers.map(message => (
    <Container bottom='large' key={message.id}>
      <EmailMessageListItem
        title={message.subject}
        emailMessageWithUsers={message}
        path={getEmailMessageListItemPath({
          id: message.id,
          entityType,
          entityId
        })}
        removeReplies
      />
    </Container>
  ))
}

const NO_RESULTS_MESSAGE = 'There are no messages for this search criteria'

const EmailMessageList = () => {
  const { showError } = useNotifications()

  const { filtersConfig } = useFiltersConfig()

  const { searchBarCategories } = useSearchBarCategories()

  const params = useParams()
  const { entityType, entityId } = params as {
    entityType: string
    entityId: string
  }
  const roleOrClientId = getRoleOrClientIdForEntity(entityType, entityId)

  const {
    getEmailMessages,
    emailMessagesWithUsers,
    totalCount,
    loading,
    emailMessagesError
  } = useGetEmailMessagesListWithUsers({
    onGetUsersByEmailsError: () => showError('Unable to fetch users by email.'),
    roleOrClientId
  })

  const hasMessages = !!emailMessagesWithUsers?.length
  const containerCss = [S.container, loading ? S.disabledContainer : undefined]
  const items = useMemo(
    () => renderItems(emailMessagesWithUsers, { entityType, entityId }),
    [emailMessagesWithUsers, entityType, entityId]
  )

  const {
    page,
    setPage,
    filterValues,
    filterValuesLoading,
    pagesCount,
    handleFilterChange,
    sortOptions
  } = useEmailMessageListFilters({
    searchBarCategories,
    pagination: { perPage: 20, count: totalCount || 0 },
    fetchData: getEmailMessages,
    error: emailMessagesError
  })

  if (totalCount === undefined || filterValuesLoading) {
    return <PageLoader />
  }

  return (
    <EmailMessageListContentWrapper
      itemsCount={totalCount}
      entityId={entityId}
      entityType={entityType}
    >
      <Filters
        values={filterValues}
        config={filtersConfig}
        onChange={handleFilterChange}
        sortOptions={sortOptions}
      >
        {nestableControls => (
          <SearchBar
            name='badges'
            categories={searchBarCategories}
            nestableControls={nestableControls}
            onError={() => showError('Unable to fetch items.')}
          />
        )}
      </Filters>
      <Container top='medium' bottom='medium'>
        {!hasMessages && !loading && (
          <NoSearchResultsMessage message={NO_RESULTS_MESSAGE} />
        )}
        {hasMessages && (
          <Container css={containerCss}>
            {loading
              ? Array.from(Array(10).keys()).map(key => (
                  <SectionWithDetailedListSkeleton
                    key={key}
                    title={<SkeletonLoader.Header />}
                    columns={1}
                    items={3}
                    labelColumnWidth={9}
                  />
                ))
              : items}
          </Container>
        )}
      </Container>
      <Pagination
        activePage={page}
        onPageChange={setPage}
        totalPages={pagesCount}
      />
    </EmailMessageListContentWrapper>
  )
}

export default EmailMessageList
