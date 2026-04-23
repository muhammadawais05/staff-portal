import {
  gql,
  useGetNode,
  NetworkStatus
} from '@staff-portal/data-layer-service'

import { GetCompanyJobsDocument } from './get-company-jobs.staff.gql.types'

export default gql`
  query GetCompanyJobs(
    $companyId: ID!
    $withDescendants: Boolean!
    $offset: Int!
    $limit: Int!
  ) {
    node(id: $companyId) {
      ... on Client {
        id
        addJobLink {
          enabled
          messages
          url
        }
        children {
          totalCount
        }

        jobs(
          filter: { scope: NON_DRAFT, withDescendants: $withDescendants }
          pagination: { offset: $offset, limit: $limit }
        ) {
          nodes {
            id
          }
          totalCount
        }
      }
    }
  }
`

export const useGetCompanyJobs = ({
  companyId,
  offset,
  limit,
  showSubsidiaries = false
}: {
  companyId: string
  showSubsidiaries: boolean
  offset: number
  limit: number
}) => {
  const { data, loading, networkStatus, ...restOptions } = useGetNode(
    GetCompanyJobsDocument
  )({
    companyId,
    offset,
    limit,
    withDescendants: showSubsidiaries
  })

  return {
    ...restOptions,
    initialLoading: loading && !data,
    // we need to account for network status and display the loading
    // only when `showSubsidiaries` or `page` changes
    loading: loading && networkStatus === NetworkStatus.setVariables,
    jobs: data?.jobs?.nodes,
    totalCount: data?.jobs?.totalCount ?? 0,
    hasChildren: !!data?.children?.totalCount,
    addJobLink: data?.addJobLink
  }
}
