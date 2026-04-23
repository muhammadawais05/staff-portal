import { ColorType } from '@toptal/picasso'
import {
  TalentCoachingEngagementStatus,
  TalentCoachingEngagementCampaignSlug
} from '@staff-portal/graphql/staff'

export const COACHING_CAMPAIGN_MAPPING: Record<
  TalentCoachingEngagementCampaignSlug,
  string
> = {
  [TalentCoachingEngagementCampaignSlug.NEWCOMERS]: 'Newcomer'
}

export const COACHING_STATUS_MAPPING: Record<
  TalentCoachingEngagementStatus,
  { text: string; color: ColorType }
> = {
  [TalentCoachingEngagementStatus.PENDING_CLAIM]: {
    text: 'Pending claim',
    color: 'yellow'
  },
  [TalentCoachingEngagementStatus.PENDING_COACH_REVIEW]: {
    text: 'Pending coach review',
    color: 'yellow'
  },
  [TalentCoachingEngagementStatus.CONTACTED]: {
    text: 'Contacted',
    color: 'inherit'
  },
  [TalentCoachingEngagementStatus.COMPLETED]: {
    text: 'Completed',
    color: 'green'
  },
  [TalentCoachingEngagementStatus.SOURCED]: {
    text: 'Sourced',
    color: 'inherit'
  },
  [TalentCoachingEngagementStatus.SKIPPED]: {
    text: 'Skipped',
    color: 'inherit'
  }
}
