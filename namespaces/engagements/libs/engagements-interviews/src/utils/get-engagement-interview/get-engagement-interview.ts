import { OperationFragment } from '@staff-portal/operations'

type InterviewType<K extends string> = {
  id: string
  operations: {
    [key in K]: OperationFragment
  }
}

export const getEngagementInterview = <K extends string>({
  latestInterview,
  newInterview
}: {
  latestInterview?: InterviewType<K> | null
  newInterview?: InterviewType<K> | null
}): InterviewType<K> | null | undefined => {
  if (latestInterview) {
    return latestInterview
  }

  return newInterview
}
