import {
  gql,
  useQuery,
  filterUnauthorizedErrors
} from '@staff-portal/data-layer-service'
import { titleize } from '@staff-portal/string'
import { ActivityFragment, ACTIVITY_FRAGMENT } from '@staff-portal/activities'
import {
  NoteFragment,
  NOTE_OPERATION_FRAGMENT,
  NOTE_FRAGMENT
} from '@staff-portal/notes'
import { NO_VALUE } from '@staff-portal/config'

import {
  GetCompanyNotesDocument,
  GetCompanyNotesQueryVariables
} from './get-company-notes.staff.gql.types'

export const GET_COMPANY_NOTES: typeof GetCompanyNotesDocument = gql`
  query GetCompanyNotes(
    $companyId: ID!
    $withDescendants: Boolean!
    $scope: ClientActivitiesAndNotesScope!
  ) {
    node(id: $companyId) {
      ... on Client {
        id
        howDidYouHear
        howDidYouHearDetails
        logSalesCallWillChangeClaimer
        engagements(filter: { inStatusHistory: [ACTIVE, END_SCHEDULED] }) {
          totalCount
        }
        operations {
          createGeneralInformationClientNote {
            ...NoteOperationFragment
          }
          logClientSalesCall {
            ...NoteOperationFragment
          }
          checkClientCompliance {
            ...NoteOperationFragment
          }
          createActivity {
            ...NoteOperationFragment
          }
        }
        activitiesAndNotes(
          filter: { withDescendants: $withDescendants, scope: $scope }
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
    }
  }

  ${ACTIVITY_FRAGMENT}
  ${NOTE_FRAGMENT}
  ${NOTE_OPERATION_FRAGMENT}
`

export const useGetCompanyNotes = (
  variables: GetCompanyNotesQueryVariables
) => {
  const { data, error, ...restOptions } = useQuery(GET_COMPANY_NOTES, {
    variables,
    throwOnError: true,
    // needed in order to always get the latest data
    fetchPolicy: 'network-only',
    errorFilters: [filterUnauthorizedErrors]
  })

  let howDidYouHearDisplayValue = NO_VALUE

  if (data?.node?.howDidYouHear) {
    howDidYouHearDisplayValue = `${titleize(data.node.howDidYouHear)}${
      data.node.howDidYouHearDetails
        ? ` (${data.node.howDidYouHearDetails})`
        : ''
    }`
  }

  const notes: (ActivityFragment | NoteFragment)[] = []

  data?.node?.activitiesAndNotes?.nodes.forEach(node => {
    if (node.__typename === 'Activity') {
      notes.push(node)
    }

    if (node.__typename === 'Note') {
      notes.push({
        ...node,
        answers: {
          nodes: [
            ...node.answers.nodes,
            ...(node.newSalesCall || node.checklistSalesCall
              ? [
                  {
                    questionEdge: {
                      node: {
                        id: 'howDidYouHear',
                        label: 'How Did They Hear About Us?',
                        group: { label: '' }
                      }
                    },
                    displayText: howDidYouHearDisplayValue
                  }
                ]
              : [])
          ]
        }
      } as NoteFragment)
    }
  })

  if (error && !notes) {
    throw error
  }

  return {
    notes,
    operations: data?.node?.operations,
    logSalesCallWillChangeClaimer: Boolean(
      data?.node?.logSalesCallWillChangeClaimer
    ),
    isApplied: !data?.node?.engagements?.totalCount,
    error,
    ...restOptions
  }
}
