import { CompanyLevelRepresentativeFragment } from './data/get-company-level-data/get-company-level-data.staff.gql.types'

export const getPocRole = (
  representatives?: CompanyLevelRepresentativeFragment[]
) =>
  representatives?.find(
    representative => !!representative.main && !!representative.position
  )?.position
