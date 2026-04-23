import { useQuery, gql } from '@staff-portal/data-layer-service'

import { GetLanguagesDocument } from './get-languages.staff.gql.types'
import { LANGUAGE_FRAGMENT } from '../language-fragment/language-fragment.staff.gql'

export default gql`
  query GetLanguages {
    languages {
      nodes {
        ...LanguageFragment
      }
    }
  }

  ${LANGUAGE_FRAGMENT}
`

export const useGetLanguages = ({
  onError
}: {
  onError?: () => void
} = {}) => {
  const { data, ...restOptions } = useQuery(GetLanguagesDocument, {
    onError,
    fetchPolicy: 'cache-first'
  })

  return {
    languages: data?.languages.nodes,
    ...restOptions
  }
}
