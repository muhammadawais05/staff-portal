export type PossiblyRelatedMeetingType = {
  id: string
  scheduledAt: string
  organizer: {
    fullName: string
  }
}

export type PossiblyRelatedMeetingsType = {
  totalCount: number
  nodes: PossiblyRelatedMeetingType[]
}
