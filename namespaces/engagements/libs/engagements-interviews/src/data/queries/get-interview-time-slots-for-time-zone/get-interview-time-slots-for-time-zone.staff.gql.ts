import { gql, useGetNode } from '@staff-portal/data-layer-service'
import { InterviewPreferredDurations } from '@staff-portal/graphql/staff'

import { GetInterviewTimeSlotsForTimeZoneDocument } from './get-interview-time-slots-for-time-zone.staff.gql.types'

export default gql`
  query GetInterviewTimeSlotsForTimeZone(
    $interviewId: ID!
    $timeZoneName: String
    $preferredDuration: InterviewPreferredDurations
  ) {
    node(id: $interviewId) {
      ... on Interview {
        id
        timeSlots(
          timeZoneName: $timeZoneName
          preferredDuration: $preferredDuration
        ) {
          date
          hours
        }
      }
    }
  }
`

export const useGetInterviewTimeSlotsForTimeZone = ({
  interviewId,
  timeZoneName,
  preferredDuration,
  skipCondition
}: {
  timeZoneName?: string
  preferredDuration?: InterviewPreferredDurations
  interviewId?: string
  skipCondition?: boolean
}) => {
  const { data, loading, initialLoading } = useGetNode(
    GetInterviewTimeSlotsForTimeZoneDocument
  )(
    {
      interviewId: interviewId as string,
      timeZoneName,
      preferredDuration
    },
    {
      fetchPolicy: 'cache-first',
      skip: !interviewId || !timeZoneName || skipCondition
    }
  )

  return {
    timeSlots: data?.timeSlots,
    timeSlotsLoading: loading,
    timeSlotsInitialLoading: initialLoading
  }
}
