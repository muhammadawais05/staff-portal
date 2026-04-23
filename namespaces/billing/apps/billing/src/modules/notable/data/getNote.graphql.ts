import { gql } from '@apollo/client'

import { noteItemFragment } from '../../__fragments__/noteItemFragment.graphql'

export default gql`
  query GetNote($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Note {
        ...NoteItem
      }
    }
  }

  ${noteItemFragment}
`
