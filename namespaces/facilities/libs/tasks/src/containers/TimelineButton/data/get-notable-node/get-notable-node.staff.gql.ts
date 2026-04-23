import { gql, useQuery } from '@staff-portal/data-layer-service'
import { NOTE_FRAGMENT } from '@staff-portal/notes'

import { GetNotableNodeDocument } from './get-notable-node.staff.gql.types'

export const GET_NOTABLE_NODE: typeof GetNotableNodeDocument = gql`
  query GetNotableNode($id: ID!) {
    staffNode(id: $id) {
      ...NotableFragment
      ...NotableClientFragment
    }
  }

  fragment NotableFragment on Notable {
    notes {
      nodes {
        ...NoteFragment
      }
    }

    ... on Node {
      id
      __typename
    }

    ... on Talent {
      id
      email
    }

    ... on WebResource {
      webResource {
        url
        text
      }
    }
  }

  fragment NotableClientFragment on Client {
    id
    __typename
    email
    notes {
      nodes {
        ...NoteFragment
      }
    }
    webResource {
      url
      text
    }
  }

  ${NOTE_FRAGMENT}
`

export const useGetNotableNode = (id: string) => {
  const { data, loading, ...rest } = useQuery(GET_NOTABLE_NODE, {
    variables: { id }
  })

  return { data: data?.staffNode, loading, ...rest }
}
