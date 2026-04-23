import {
  useQuery,
  gql,
  ApolloError,
  useLazyQuery
} from '@staff-portal/data-layer-service'

import { COUNTRY_FRAGMENT } from '../country-fragment'
import { GetCountriesDocument } from './get-countries.staff.gql.types'

export default gql`
  query GetCountries {
    countries {
      nodes {
        ...CountryFragment
      }
    }
  }

  ${COUNTRY_FRAGMENT}
`

export const useGetCountries = ({
  onError
}: {
  onError?: (error: ApolloError) => void
} = {}) => {
  const { data, ...restOptions } = useQuery(GetCountriesDocument, {
    onError,
    fetchPolicy: 'cache-first'
  })

  return {
    countries: data?.countries.nodes,
    ...restOptions
  }
}

export const getCountriesHook = () => () => {
  const [request, { data, loading, error, called }] = useLazyQuery(
    GetCountriesDocument,
    {
      fetchPolicy: 'cache-first',
      throwOnError: true
    }
  )

  return {
    request,
    data: data?.countries?.nodes,
    loading,
    error,
    called
  }
}
