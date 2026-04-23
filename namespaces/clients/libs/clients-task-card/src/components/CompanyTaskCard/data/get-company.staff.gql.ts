import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'
import { FIRST_TASK_CARD_BATCH_KEY } from '@staff-portal/tasks'

import { TASK_CARD_COMPANY_FRAGMENT } from '../../../data'
import { GetTaskCardCompanyDocument } from './get-company.staff.gql.types'

export default gql`
  query GetTaskCardCompany($companyId: ID!) {
    node(id: $companyId) {
      ... on Client {
        ...TaskCardCompanyFragment
      }
    }
  }

  ${TASK_CARD_COMPANY_FRAGMENT}
`
export const useGetCompany = (companyId: string) => {
  const { data, ...restOptions } = useQuery(GetTaskCardCompanyDocument, {
    throwOnError: true,
    variables: { companyId },
    context: { [BATCH_KEY]: FIRST_TASK_CARD_BATCH_KEY }
  })

  return {
    data: data?.node,
    ...restOptions
  }
}
