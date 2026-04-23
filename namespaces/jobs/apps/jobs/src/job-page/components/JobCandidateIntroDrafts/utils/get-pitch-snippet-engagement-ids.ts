import { JobCandidateIntroDraftsEngagementFragment } from '../data/get-candidate-intro-drafts'
import { isPitchSnippetEngagement } from './is-pitch-snippet-engagement'

export const getPitchSnippetEngagementIds = (
  engagements: JobCandidateIntroDraftsEngagementFragment[]
): string[] => {
  const pitchSnippetEngagementIds: string[] = []

  for (const engagement of engagements) {
    if (isPitchSnippetEngagement(engagement)) {
      pitchSnippetEngagementIds.push(engagement.id)
    }
  }

  return pitchSnippetEngagementIds
}
