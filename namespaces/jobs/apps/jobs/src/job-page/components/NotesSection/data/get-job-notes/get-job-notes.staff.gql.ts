import { useMemo } from 'react'
import {
  gql,
  useQuery,
  isNetworkLoading
} from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'
import { ACTIVITY_FRAGMENT } from '@staff-portal/activities'
import {
  NOTE_QUESTION_WITH_OPTION_FRAGMENT,
  NOTE_OPERATION_FRAGMENT,
  NOTE_FRAGMENT,
  getNotesFromNodes
} from '@staff-portal/notes'

import { GetJobNotesDocument } from './get-job-notes.staff.gql.types'

export const GET_JOB_NOTES: typeof GetJobNotesDocument = gql`
  query GetJobNotes($jobId: ID!) {
    node(id: $jobId) {
      ...JobNoteFragment
    }
  }

  fragment JobNoteFragment on Job {
    id
    title
    operations {
      addJobMatchingNote {
        ...OperationFragment
      }
      createActivity {
        ...OperationFragment
      }
    }
    matchingNoteQuestions {
      nodes {
        ...NoteQuestionWithOptionsFragment
      }
    }
    notes(order: { field: UPDATED_AT, direction: DESC }) {
      operations {
        createNote {
          ...NoteOperationFragment
        }
      }
    }
    activitiesAndNotes(
      order: { field: OCCURRED_AT, direction: DESC }
      pagination: { offset: 0, limit: 1000 }
    ) {
      totalCount
      nodes {
        __typename
        ...ActivityFragment
        ...NoteFragment
      }
    }
  }

  ${NOTE_FRAGMENT}
  ${NOTE_OPERATION_FRAGMENT}
  ${NOTE_QUESTION_WITH_OPTION_FRAGMENT}
  ${OPERATION_FRAGMENT}
  ${ACTIVITY_FRAGMENT}
`

export const useGetJobNotes = (jobId: string) => {
  const { data, error, loading, networkStatus, ...restOptions } = useQuery(
    GET_JOB_NOTES,
    {
      throwOnError: true,
      variables: { jobId }
    }
  )

  const notes = useMemo(
    () =>
      data?.node?.activitiesAndNotes?.nodes &&
      getNotesFromNodes(data?.node?.activitiesAndNotes?.nodes),
    [data]
  )

  return {
    data: data?.node,
    notes,
    error,
    loading,
    networkLoading: isNetworkLoading({ data, loading, networkStatus }),
    ...restOptions
  }
}
