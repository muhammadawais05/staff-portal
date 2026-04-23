import { gql } from '@staff-portal/data-layer-service'

import {
  NOTE_ANSWER_FRAGMENT,
  NOTE_ANSWER_WITH_OPTIONS_FRAGMENT
} from '../note-answer-fragment'
import { NOTE_ATTACHMENT_FRAGMENT } from '../note-attachment-fragment'
import { NOTE_OPERATION_FRAGMENT } from '../note-operation-fragment'
import {
  NOTE_SOFT_SKILL_RATING_FRAGMENT,
  NOTE_SOFT_SKILL_RATING_WITH_HINTS_FRAGMENT
} from '../note-soft-skill-rating-fragment'

export const NOTE_COMMON_FRAGMENT = gql`
  fragment NoteCommonFragment on Note {
    id
    comment
    createdAt
    newSalesCall
    checklistSalesCall
    status
    title
    updatedAt
    attachment {
      ...NoteAttachmentFragment
    }
    creator {
      ... on Node {
        id
      }

      ... on WebResource {
        webResource {
          text
          url
        }
      }
    }
    operations {
      removeNote {
        ...NoteOperationFragment
      }
      removeNoteAttachment {
        ...NoteOperationFragment
      }
      updateNote {
        ...NoteOperationFragment
      }
    }
    __typename
  }

  ${NOTE_ATTACHMENT_FRAGMENT}
  ${NOTE_OPERATION_FRAGMENT}
`

export const NOTE_FRAGMENT = gql`
  fragment NoteFragment on Note {
    ...NoteCommonFragment

    answers {
      nodes {
        ...NoteAnswerFragment
      }
    }

    softSkillRatings {
      nodes {
        ...NoteSoftSkillRatingFragment
      }
    }
  }

  ${NOTE_COMMON_FRAGMENT}
  ${NOTE_ANSWER_FRAGMENT}
  ${NOTE_SOFT_SKILL_RATING_FRAGMENT}
`

export const NOTE_WITH_OPTIONS_FRAGMENT = gql`
  fragment NoteWithOptionFragment on Note {
    ...NoteCommonFragment

    answers {
      nodes {
        ...NoteAnswerWithOptionsFragment
      }
    }

    softSkillRatings {
      nodes {
        ...NoteSoftSkillRatingWithHintsFragment
      }
    }
  }

  ${NOTE_COMMON_FRAGMENT}
  ${NOTE_ANSWER_WITH_OPTIONS_FRAGMENT}
  ${NOTE_SOFT_SKILL_RATING_WITH_HINTS_FRAGMENT}
`
