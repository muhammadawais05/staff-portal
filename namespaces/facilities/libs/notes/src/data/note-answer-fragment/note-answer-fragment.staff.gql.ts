import { gql } from '@staff-portal/data-layer-service'

export const NOTE_QUESTION_FRAGMENT = gql`
  fragment NoteQuestionFragment on NoteQuestion {
    id
    label
    group {
      label
    }
  }
`

export const NOTE_QUESTION_EDGE_FRAGMENT = gql`
  fragment NoteQuestionEdgeFragment on NoteQuestionEdge {
    node {
      ...NoteQuestionFragment
    }
  }

  ${NOTE_QUESTION_FRAGMENT}
`

export const NOTE_QUESTION_WITH_OPTION_FRAGMENT = gql`
  fragment NoteQuestionWithOptionsFragment on NoteQuestion {
    kind
    hint
    commentType
    additionalCommentsHint
    required
    gradingWeight
    activeOptions {
      nodes {
        id
        label
        value
      }
    }

    ...NoteQuestionFragment
  }

  ${NOTE_QUESTION_FRAGMENT}
`

export const NOTE_QUESTION_EDGE_WITH_OPTION_FRAGMENT = gql`
  fragment NoteQuestionEdgeWithOptionFragment on NoteQuestionEdge {
    renderedLabel
    node {
      ...NoteQuestionWithOptionsFragment
    }
  }

  ${NOTE_QUESTION_WITH_OPTION_FRAGMENT}
`

export const NOTE_ANSWER_COMMON_FRAGMENT = gql`
  fragment NoteAnswerCommonFragment on NoteAnswer {
    id
    label
    value
    comment
    displayText
  }
`

export const NOTE_ANSWER_FRAGMENT = gql`
  fragment NoteAnswerFragment on NoteAnswer {
    ...NoteAnswerCommonFragment

    questionEdge {
      node {
        ...NoteQuestionFragment
      }
    }
  }

  ${NOTE_ANSWER_COMMON_FRAGMENT}
  ${NOTE_QUESTION_FRAGMENT}
`

export const NOTE_ANSWER_WITH_OPTIONS_FRAGMENT = gql`
  fragment NoteAnswerWithOptionsFragment on NoteAnswer {
    ...NoteAnswerCommonFragment

    id @include(if: $isForEdit)
    option {
      id
    }

    questionEdge {
      ...NoteQuestionEdgeWithOptionFragment
    }
  }

  ${NOTE_ANSWER_COMMON_FRAGMENT}
  ${NOTE_QUESTION_EDGE_WITH_OPTION_FRAGMENT}
`
