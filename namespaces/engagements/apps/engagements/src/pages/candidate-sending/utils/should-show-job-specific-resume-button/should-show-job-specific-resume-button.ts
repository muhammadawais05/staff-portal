import { Maybe } from '@staff-portal/graphql/staff'

const shouldShowJobSpecificResumeButton = (
  newEngagementResumeUrl?: Maybe<string>,
  talentResumeUrl?: Maybe<string>
): newEngagementResumeUrl is string =>
  !!newEngagementResumeUrl &&
  !!talentResumeUrl &&
  newEngagementResumeUrl !== talentResumeUrl

export default shouldShowJobSpecificResumeButton
