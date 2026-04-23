import { TalentCoachingEngagementNote } from '@staff-portal/graphql/staff'
import { gql, useQuery } from '@staff-portal/data-layer-service'
import { NOTE_ANSWER_WITH_OPTIONS_FRAGMENT } from '@staff-portal/notes'

import { GetCoachingEngagementNoteAnswersDocument } from './get-coaching-engagement-note-default-answers.staff.gql.types'

export default gql`
  query GetCoachingEngagementNoteAnswers(
    $id: ID!
    $noteType: TalentCoachingEngagementNote!
    $isForEdit: Boolean!
  ) {
    node(id: $id) {
      ... on TalentCoachingEngagement {
        id
        defaultNoteAnswers(filter: { noteType: $noteType }) {
          nodes {
            ...NoteAnswerWithOptionsFragment
          }
        }
      }
    }
  }

  ${NOTE_ANSWER_WITH_OPTIONS_FRAGMENT}
`

export const useGetCoachingEngagementNoteDefaultAnswers = ({
  id,
  noteType,
  onCompleted
}: {
  id: string
  noteType: TalentCoachingEngagementNote
  onCompleted?: () => void
}) => {
  const { data, ...restOptions } = useQuery(
    GetCoachingEngagementNoteAnswersDocument,
    {
      variables: {
        id,
        noteType,
        isForEdit: false
      },
      onCompleted
    }
  )

  return {
    answers: data?.node?.defaultNoteAnswers.nodes,
    ...restOptions
  }
}
