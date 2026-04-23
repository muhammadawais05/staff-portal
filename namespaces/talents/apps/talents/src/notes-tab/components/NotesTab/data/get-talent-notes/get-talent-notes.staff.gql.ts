import {
  gql,
  useQuery,
  isNetworkLoading
} from '@staff-portal/data-layer-service'
import { ACTIVITY_FRAGMENT } from '@staff-portal/activities'
import { NOTE_OPERATION_FRAGMENT, NOTE_FRAGMENT } from '@staff-portal/notes'

import { GetTalentNotesDocument } from './get-talent-notes.staff.gql.types'

export const GET_TALENT_NOTES: typeof GetTalentNotesDocument = gql`
  query GetTalentNotes($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        fullName
        prescreeningRecordingUrl
        vertical {
          id
        }
        operations {
          addTalentSuspiciousActivityReportNote {
            ...NoteOperationFragment
          }
          createFeedbackCallTalentNote {
            ...NoteOperationFragment
          }
          createOnlineTestTalentNote {
            ...NoteOperationFragment
          }
          createTechnicalOneCallTalentNote {
            ...NoteOperationFragment
          }
          createTechnicalTwoCallTalentNote {
            ...NoteOperationFragment
          }
          createEnglishCallTalentNote {
            ...NoteOperationFragment
          }
          createPrescreeningTalentNote {
            ...NoteOperationFragment
          }
          createSourcingCallTalentNote {
            ...NoteOperationFragment
          }
          createActivity {
            ...NoteOperationFragment
          }
          createGeneralInformationTalentNote {
            ...NoteOperationFragment
          }
        }
        activitiesAndNotes(
          filter: {}
          order: { field: OCCURRED_AT, direction: DESC }
          pagination: { offset: 0, limit: 1000 }
        ) {
          nodes {
            __typename
            ...ActivityFragment
            ...NoteFragment
          }
        }
      }
    }
  }

  ${ACTIVITY_FRAGMENT}
  ${NOTE_FRAGMENT}
  ${NOTE_OPERATION_FRAGMENT}
`

export const useGetTalentNotes = (talentId: string) => {
  const { data, error, loading, networkStatus, ...restOptions } = useQuery(
    GET_TALENT_NOTES,
    {
      variables: { talentId }
    }
  )

  const notesData = data?.node

  if (error && !notesData) {
    throw error
  }

  return {
    data: notesData,
    error,
    loading,
    networkLoading: isNetworkLoading({ data, loading, networkStatus }),
    ...restOptions
  }
}
