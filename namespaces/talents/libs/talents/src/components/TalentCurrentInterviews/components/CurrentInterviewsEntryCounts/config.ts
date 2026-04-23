import {
  EngagementStatus,
  TalentCurrentInterviewsInterviewStatus
} from '@staff-portal/graphql/staff'

export const statusOrderingMap: Record<string, number> = {
  [EngagementStatus.PENDING]: 0,
  [`${EngagementStatus.REVIEWED}`]: 1,
  [`${EngagementStatus.REVIEWED}_${TalentCurrentInterviewsInterviewStatus.PENDING}`]: 1,
  [`${EngagementStatus.REVIEWED}_${TalentCurrentInterviewsInterviewStatus.SCHEDULED}`]: 2,
  [`${EngagementStatus.REVIEWED}_${TalentCurrentInterviewsInterviewStatus.TIME_REJECTED}`]: 3,
  [`${EngagementStatus.REVIEWED}_${TalentCurrentInterviewsInterviewStatus.TIME_ACCEPTED}`]: 4,
  [`${EngagementStatus.REVIEWED}_${TalentCurrentInterviewsInterviewStatus.MISSED}`]: 5,
  [`${EngagementStatus.REVIEWED}_${TalentCurrentInterviewsInterviewStatus.ACCEPTED}`]: 6,
  [`${EngagementStatus.REVIEWED}_${TalentCurrentInterviewsInterviewStatus.OCCURRED}`]: 7,
  [EngagementStatus.PENDING_EXPIRATION]: 8,
  [EngagementStatus.SCHEDULED]: 9,
  [EngagementStatus.EXPIRATION_POSTPONED]: 10
}
