import { useMemo } from 'react'
import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetTalentPartnersDocument } from './get-talent-partners.staff.gql.types'

export default gql`
  query GetTalentPartners {
    talentPartners(
      filter: { scope: ACTIVE }
      order: { field: FULL_NAME, direction: ASC }
      pagination: { limit: 200, offset: 0 }
    ) {
      nodes {
        ... on TalentPartner {
          id
          fullName
        }
      }
    }
  }
`

export const useGetTalentPartners = () => {
  const { data, loading } = useQuery(GetTalentPartnersDocument)

  const options = useMemo(() => {
    const defaultOptions = [{ text: 'None', value: '' }]

    const talentPartnersOptions =
      data?.talentPartners?.nodes.map(item => ({
        text: item.fullName,
        value: item.id
      })) || []

    return [...defaultOptions, ...talentPartnersOptions]
  }, [data])

  return {
    options,
    loading
  }
}
