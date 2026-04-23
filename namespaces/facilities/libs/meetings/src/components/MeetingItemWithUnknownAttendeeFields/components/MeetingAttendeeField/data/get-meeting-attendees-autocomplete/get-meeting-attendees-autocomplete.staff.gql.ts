import { DEFAULT_2_LINES_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { gql, useLazyQuery } from '@staff-portal/data-layer-service'

import {
  GetMeetingAttendeeAutocompleteDocument,
  GetMeetingAttendeeAutocompleteQueryVariables
} from './get-meeting-attendees-autocomplete.staff.gql.types'
import { MEETING_ATTENDEE_AUTOCOMPLETE_EDGE_FRAGMENT } from '../meeting-attendee-autocomplete-edge-fragment'

export const GET_MEETING_ATTENDEES_AUTOCOMPLETE: typeof GetMeetingAttendeeAutocompleteDocument = gql`
  query GetMeetingAttendeeAutocomplete(
    $term: String!
    $offset: Int!
    $limit: Int!
  ) {
    autocomplete(
      filter: { term: $term, model: MEETING_ATTENDEE }
      pagination: { offset: $offset, limit: $limit }
    ) {
      edges {
        ...MeetingAttendeeAutocompleteEdgeFragment
      }
    }
  }

  ${MEETING_ATTENDEE_AUTOCOMPLETE_EDGE_FRAGMENT}
`

export const useGetMeetingAttendeesAutocomplete = () => {
  const [fetch, { data, ...options }] = useLazyQuery(
    GET_MEETING_ATTENDEES_AUTOCOMPLETE,
    {
      fetchPolicy: 'cache-first',
      canonizeResults: false
    }
  )

  const getMeetingAttendees = ({
    term,
    offset = 0,
    limit = DEFAULT_2_LINES_AUTOCOMPLETE_RESULTS_SIZE
  }: {
    term: string
  } & Partial<GetMeetingAttendeeAutocompleteQueryVariables>) =>
    fetch({ variables: { term, offset, limit } })

  return {
    getMeetingAttendees,
    data: data?.autocomplete.edges ?? null,
    ...options
  }
}
