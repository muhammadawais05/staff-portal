import { EngagementClientInTalentSectionFragment } from '../../data/engagement-client-in-talent-section-fragment'

export const createEngagementClientInTalentSectionMock = (
  client?: Partial<EngagementClientInTalentSectionFragment>
): EngagementClientInTalentSectionFragment => ({
  id: 'client-123',
  netTerms: 123,
  enterprise: false,
  ...client
})
