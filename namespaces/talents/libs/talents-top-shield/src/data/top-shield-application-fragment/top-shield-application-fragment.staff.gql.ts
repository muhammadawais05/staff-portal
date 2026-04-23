import { gql } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { TASK_LIST_ITEM_FRAGMENT } from '@staff-portal/tasks-list-item'
import {
  NOTE_OPERATION_FRAGMENT,
  NOTE_FRAGMENT,
  NOTE_ANSWER_WITH_OPTIONS_FRAGMENT
} from '@staff-portal/notes'

import { TOP_SHIELD_APPLICATION_QUARTER_FRAGMENT } from '../top-shield-application-quarter-fragment/top-shield-application-quarter-fragment.staff.gql'

export const TOP_SHIELD_APPLICATION_FRAGMENT = gql`
  fragment TopShieldApplicationFragment on TopShieldApplication {
    id
    contractSignedDate
    initialPitchDate
    scheduledEndDate
    interviewCompletedDate
    startDate
    status
    segment
    skill
    outreachStage
    outreachStatus
    quarters {
      nodes {
        ...TopShieldApplicationQuarterFragment
      }
      totalCount
    }
    notes {
      nodes {
        ...NoteFragment
      }
      totalCount
    }
    tasks {
      nodes {
        ...TaskListItemFragment
      }
      totalCount
    }
    defaultNoteAnswers(filter: { noteType: INTERVIEW }) {
      nodes {
        ...NoteAnswerWithOptionsFragment
      }
    }
    operations {
      addGeneralTopShieldApplicationNote {
        ...OperationFragment
      }
      addTopShieldApplicationInterviewNote {
        ...OperationFragment
      }
      createTopShieldApplicationQuarter {
        ...OperationFragment
      }
      updateContractSignedDate {
        ...OperationFragment
      }
      updateInitialPitchDate {
        ...OperationFragment
      }
      updateInterviewCompletedDate {
        ...OperationFragment
      }
      updateScheduledEndDate {
        ...OperationFragment
      }
      updateSegment {
        ...OperationFragment
      }
      updateSkill {
        ...OperationFragment
      }
      updateStartDate {
        ...OperationFragment
      }
      updateStatus {
        ...OperationFragment
      }
      addGeneralTopShieldApplicationNote {
        ...OperationFragment
      }
      addTopShieldApplicationInterviewNote {
        ...OperationFragment
      }
      updateTopShieldApplicationOutreachStage {
        ...OperationFragment
      }
      updateTopShieldApplicationOutreachStatus {
        ...OperationFragment
      }
    }
  }

  ${TOP_SHIELD_APPLICATION_QUARTER_FRAGMENT}
  ${TASK_LIST_ITEM_FRAGMENT}
  ${NOTE_FRAGMENT}
  ${NOTE_OPERATION_FRAGMENT}
  ${NOTE_ANSWER_WITH_OPTIONS_FRAGMENT}
  ${OPERATION_FRAGMENT}
`
