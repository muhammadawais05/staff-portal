import { gql } from '@staff-portal/data-layer-service'
import { NOTE_FRAGMENT } from '@staff-portal/notes'

export const COMMUNITY_LEADER_NOTES_FRAGMENT = gql`
  fragment CommunityLeaderNotesFragment on CommunityLeader {
    leaderNotes {
      totalCount
      nodes {
        ...NoteFragment
      }
    }
  }
  ${NOTE_FRAGMENT}
`
