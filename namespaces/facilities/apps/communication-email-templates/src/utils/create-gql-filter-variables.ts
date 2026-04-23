import {
  OrderDirection,
  OffsetPagination,
  EmailTemplateOrderField,
  EmailTemplateBadgesFilter
} from '@staff-portal/graphql/staff'
import { QueryParams } from '@staff-portal/query-params-state'
import {
  SortOrder,
  Sort,
  getSortBy,
  parseBoolean,
  parseStringArray
} from '@staff-portal/filters'

import { GetEmailTemplatesListQueryVariables } from '../data/use-get-email-templates-list/get-email-templates-list.staff.gql.types'
import { DEFAULT_SORT } from '../config'

export const badgesToGql = <T>(badges: unknown[][]): T => {
  const badgesVariables =
    badges &&
    Object.entries(badges).reduce(
      (acc, [name, values]) => ({
        ...acc,
        [name]: values
      }),
      {}
    )

  return {
    ...badgesVariables
  } as T
}

const createGqlFilterVariables = (
  filterValues: QueryParams,
  pagination: OffsetPagination
): GetEmailTemplatesListQueryVariables => {
  const { order, target } = getSortBy(
    filterValues.sort as Sort | undefined,
    SortOrder.ASC,
    DEFAULT_SORT
  )

  const targetRoles = parseStringArray<string>(filterValues.target_roles)

  const source = parseBoolean(filterValues.source)

  const badgesFilter = badgesToGql<EmailTemplateBadgesFilter>(
    filterValues?.badges as unknown[][]
  )

  return {
    filter: {
      badges: {
        names: badgesFilter.names || []
      },
      targetRoles,
      private: source
    },
    order: {
      direction: order as unknown as OrderDirection,
      field: target.toUpperCase() as EmailTemplateOrderField
    },
    pagination
  }
}

export default createGqlFilterVariables
