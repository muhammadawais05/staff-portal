import {
  BadgedLogic,
  DateFilter,
  EmailMessageOrder,
  EmailMessageOrderFieldEnum,
  OrderDirectionEnum
} from '@staff-portal/graphql/lens'
import {
  gql,
  useLazyQuery,
  decodeEntityId,
  LENS_CONTEXT
} from '@staff-portal/data-layer-service'
import { Sort, LogicOperator } from '@staff-portal/filters'
import { EMAIL_MESSAGE_FRAGMENT } from '@staff-portal/communication'

import {
  GetEmailMessagesListDocument,
  GetEmailMessagesListQueryVariables
} from './get-email-messages-list.lens.gql.types'
import { SearchBarAutocompleteClientFragment } from '../../pages/EmailMessageList/data/get-search-bar-user-autocomplete'
import { EmailMessagesSearchBarClientFragment } from '../../pages/EmailMessageList/data/get-email-messages-search-bar-users'
import {
  EmailFilterType as BadgeItem,
  AutocompleteUser,
  PrefetchedUser
} from '../../types'
import { isPrefetchedUser } from '../../utils'

export const GET_EMAIL_MESSAGES_LIST: typeof GetEmailMessagesListDocument = gql`
  query GetEmailMessagesList(
    $badges: EmailMessageBadgedSearch
    $categories: [String!]
    $exclude_categories: [String!]
    $logic: BadgedLogic
    $page: Int
    $pageSize: PageSize
    $sent_at: DateFilter
    $order: EmailMessageOrder
  ) {
    emailMessages(
      badges: $badges
      categories: $categories
      excludeCategories: $exclude_categories
      logic: $logic
      page: $page
      pageSize: $pageSize
      sentAt: $sent_at
      order: $order
    ) {
      totalCount
      maxCount
      entities {
        ...EmailMessageFragment
      }
      __typename
    }
  }
  ${EMAIL_MESSAGE_FRAGMENT}
`

const GQL_VARIABLES_VALUES_MAP_BY_KEY = () => ({
  logic: {
    [LogicOperator.AND]: BadgedLogic.AND,
    [LogicOperator.OR]: BadgedLogic.OR
  } as { [key: string]: BadgedLogic }
})

const isPrefetchedUserClient = (
  roleOrClient: PrefetchedUser
): roleOrClient is EmailMessagesSearchBarClientFragment =>
  decodeEntityId(roleOrClient.id).type === 'Client'

const isAutocompleteUserClient = (
  roleOrClient: AutocompleteUser['node']
): roleOrClient is SearchBarAutocompleteClientFragment =>
  !!roleOrClient && decodeEntityId(roleOrClient.id).type === 'Client'

const extractContactValues = (
  client:
    | EmailMessagesSearchBarClientFragment
    | SearchBarAutocompleteClientFragment
) =>
  client.representatives.nodes.map(representative =>
    representative.contacts.nodes.map(({ value }) => value)
  )

const mapUsersToEmails = (users?: AutocompleteUser[]) => {
  if (!users) {
    return
  }

  return users
    .map(user => {
      if (isPrefetchedUser(user)) {
        if (isPrefetchedUserClient(user)) {
          return extractContactValues(user)
        }

        return [user.contacts.nodes.map(({ value }) => value)]
      }
      if (isAutocompleteUserClient(user.node)) {
        return extractContactValues(user.node)
      }

      const contacts = user.node?.contacts.nodes ?? []

      return [contacts.map(({ value }) => value)]
    })
    .flat()
}

const mapBadgeItemToValue = (items: BadgeItem[] | undefined) =>
  items?.map(({ text }) => text)

const getOrder = (order: Sort | undefined): EmailMessageOrder | undefined =>
  order && {
    field: order.target.toUpperCase() as EmailMessageOrderFieldEnum,
    direction: order.order.toUpperCase() as OrderDirectionEnum
  }

type Badges = {
  email: BadgeItem[] | undefined
  from: BadgeItem[] | undefined
  to: BadgeItem[] | undefined
  user_ids?: AutocompleteUser[]
  message_id?: BadgeItem[]
}

const getQueryBadges = (
  filterBadges: Badges | undefined
): GetEmailMessagesListQueryVariables['badges'] =>
  filterBadges && {
    email: mapBadgeItemToValue(filterBadges.email),
    from: mapBadgeItemToValue(filterBadges.from),
    to: mapBadgeItemToValue(filterBadges.to),
    userEmails: mapUsersToEmails(filterBadges.user_ids),
    messageId: mapBadgeItemToValue(filterBadges.message_id)
  }

const mapEmailMessagesListFilterValuesToQueryVariables = (
  filterValues: Record<string, unknown>
): GetEmailMessagesListQueryVariables => ({
  categories: filterValues.categories as string[],
  exclude_categories: filterValues.exclude_categories as string[],
  logic: (filterValues.logic &&
    GQL_VARIABLES_VALUES_MAP_BY_KEY().logic[filterValues.logic as string]) as
    | BadgedLogic
    | undefined,
  badges: getQueryBadges(filterValues.badges as Badges | undefined),
  sent_at: filterValues.sent_at as DateFilter,
  order: getOrder(filterValues.sort as Sort | undefined),
  page: filterValues.page
    ? parseInt(filterValues.page as string) || 1
    : undefined,
  pageSize: filterValues.pageSize as number | undefined
})

export const useGetLazyEmailMessagesList = (roleOrClientId?: string) => {
  const [fetch, { data, loading, error, refetch }] = useLazyQuery(
    GET_EMAIL_MESSAGES_LIST,
    {
      context: { type: LENS_CONTEXT, roleId: roleOrClientId }
    }
  )

  const fetchEmailMessages = (filterValues: Record<string, unknown>) => {
    fetch({
      variables: mapEmailMessagesListFilterValuesToQueryVariables(filterValues)
    })
  }
  const refetchEmailMessages = (filterValues?: Record<string, unknown>) => {
    refetch?.(
      filterValues &&
        mapEmailMessagesListFilterValuesToQueryVariables(filterValues)
    )
  }

  const getEmailMessages = refetch ? refetchEmailMessages : fetchEmailMessages

  return {
    getEmailMessages,
    data,
    loading,
    error
  }
}
