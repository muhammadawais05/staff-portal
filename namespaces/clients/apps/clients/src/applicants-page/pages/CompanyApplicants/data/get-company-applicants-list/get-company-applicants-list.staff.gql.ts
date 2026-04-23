import { useMemo } from 'react'
import { gql, useQuery } from '@staff-portal/data-layer-service'
import { CLIENT_FRAGMENT } from '@staff-portal/clients'

import {
  GetCompanyApplicantsListDocument,
  GetCompanyApplicantsListQueryVariables
} from './get-company-applicants-list.staff.gql.types'

export const GET_COMPANY_APPLICANTS_LIST = gql`
  query GetCompanyApplicantsList(
    $pagination: OffsetPagination!
    $isClientsList: Boolean!
  ) {
    clientApplicants(pagination: $pagination) {
      nodes {
        ...ClientFragment
      }
      claimingDurationKpiChartDataUrl
      totalCount
    }
  }

  ${CLIENT_FRAGMENT}
`

export const useGetCompanyApplicantsList = (
  variables: GetCompanyApplicantsListQueryVariables,
  skip?: boolean
) => {
  const { data, error, ...restOptions } = useQuery(
    GetCompanyApplicantsListDocument,
    {
      variables,
      skip
    }
  )

  const companyApplicants = data?.clientApplicants?.nodes
  const totalCount = data?.clientApplicants?.totalCount
  const claimingDurationKpiChartDataUrl =
    data?.clientApplicants?.claimingDurationKpiChartDataUrl

  if (error && !companyApplicants) {
    throw error
  }

  const applicantsData = useMemo(
    () => ({
      companyApplicants,
      claimingDurationKpiChartDataUrl,
      totalCount
    }),
    [companyApplicants, claimingDurationKpiChartDataUrl, totalCount]
  )

  return {
    error,
    data: applicantsData,
    ...restOptions
  }
}
