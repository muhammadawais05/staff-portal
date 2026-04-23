import { gql, useQuery } from '@staff-portal/data-layer-service'
import { QueryParams } from '@staff-portal/query-params-state'
import { OffsetPagination } from '@staff-portal/graphql/staff'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import { GetEmailTemplatesListDocument } from './get-email-templates-list.staff.gql.types'
import createGqlFilterVariables from '../../utils/create-gql-filter-variables'

export default gql`
  query GetEmailTemplatesList(
    $filter: EmailTemplatesFilter
    $order: EmailTemplateOrder!
    $pagination: OffsetPagination!
  ) {
    operations {
      createEmailTemplate {
        ...OperationFragment
      }
    }
    emailTemplates(filter: $filter, pagination: $pagination, order: $order) {
      nodes {
        ...EmailTemplatesListFragment
      }
      totalCount
    }
  }

  fragment EmailTemplatesListFragment on EmailTemplate {
    id
    name
    role {
      id
      fullName
      ...WebResourceFragment
    }
    private
    topscreenClient {
      id
      name
    }
    targetRole {
      title
      value
    }
    operations {
      copyEmailTemplate {
        ...OperationFragment
      }
      destroyEmailTemplate {
        ...OperationFragment
      }
      updateEmailTemplate {
        ...OperationFragment
      }
    }
  }

  ${WEB_RESOURCE_FRAGMENT}
  ${OPERATION_FRAGMENT}
`

interface Props {
  filterValues: QueryParams
  pagination: OffsetPagination
  skip?: boolean
}

export const useGetEmailTemplatesList = ({
  filterValues,
  pagination
}: Props) => {
  const variables = createGqlFilterVariables(filterValues, pagination)

  const { data, ...restOptions } = useQuery(GetEmailTemplatesListDocument, {
    variables,
    throwOnError: true
  })

  return {
    ...restOptions,
    totalCount: data?.emailTemplates?.totalCount,
    emailTemplates: data?.emailTemplates?.nodes,
    operations: data?.operations
  }
}
