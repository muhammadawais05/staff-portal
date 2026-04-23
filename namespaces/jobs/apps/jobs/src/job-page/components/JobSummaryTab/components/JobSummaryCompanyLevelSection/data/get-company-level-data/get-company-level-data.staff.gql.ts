import { gql, useGetNode } from '@staff-portal/data-layer-service'

import { GetCompanyLevelDataDocument } from './get-company-level-data.staff.gql.types'

export const GET_COMPANY_LEVEL_DATA = gql`
  query GetCompanyLevelData($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        id
        client {
          representatives {
            nodes {
              ...CompanyLevelRepresentativeFragment
            }
          }
          legalName
          contact {
            id
            fullName
            contacts: contacts(filter: { type: [PHONE, EMAIL] }) {
              nodes {
                id
                primary
                type
                value
              }
            }
          }
          timeZone {
            name
          }
        }
        fieldCheck {
          companyTimeZone
        }
      }
    }
  }

  fragment CompanyLevelRepresentativeFragment on CompanyRepresentative {
    id
    main
    position
  }
`

export const useGetCompanyLevelData = (jobId: string) =>
  useGetNode(GetCompanyLevelDataDocument)({ jobId }, { throwOnError: true })
