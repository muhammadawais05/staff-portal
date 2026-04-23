import { Talent } from '@staff-portal/graphql/staff'

import { OperationValue } from '~integration/types'
import {
  getTalentListResponse,
  getTalentsListFilterOptionsResponse,
  getClaimersResponse,
  getTalentTypesResponse,
  getSourcersResponse,
  getFlagsResponse,
  getJobCandidatesResponse,
  getJobFavoriteTalentsResponse,
  getTalentListItemResponse,
  getTalentListJobDataResponse,
  getTalentsListJobFilterOptionsResponse,
  getTalentStatsSectionResponse,
  getTalentWorkExperiencePortfolioItemsResponse,
  getTalentEmploymentsSectionResponse,
  getTalentResumePublicationsResponse,
  getTalentSkillsWithExperienceResponse,
  getMatchQualitySectionResponse
} from '~integration/mocks/responses/talents/talent-list'
import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'
import {
  getCountriesResponse,
  getRoleFlagsResponse,
  getTalentSoftSkillsResponse,
  getTalentWorkloadResponse,
  getUserVerticalsResponse
} from '~integration/mocks/responses'
import talentJobListItemMock from '~integration/mocks/talent-job-list-item-mock'

export const talentListPageStubs = (props?: {
  talents?: Partial<Talent>[]
}): { [key: string]: OperationValue } => {
  const talent = talentJobListItemMock()
  const jobId = '123'

  return {
    GetTalentsList: getTalentListResponse(
      props?.talents ?? [
        {
          id: talent.id,
          __typename: 'Talent'
        } as unknown as Talent
      ]
    ),
    GetUserOperation: {
      data: {
        operations: {
          createTalent: enabledOperationMock(),
          __typename: 'QueryOperations'
        }
      }
    },
    GetTalentListItem: getTalentListItemResponse(talent),
    GetJobCandidates: getJobCandidatesResponse(talent.id, jobId),
    GetTalentListJobData: getTalentListJobDataResponse(jobId),
    GetTalentsListJobFilterOptions:
      getTalentsListJobFilterOptionsResponse(jobId),
    GetRoleFlags: getRoleFlagsResponse(),
    GetJobFavoriteTalents: getJobFavoriteTalentsResponse(jobId),
    GetTalentWorkload: getTalentWorkloadResponse(),
    GetTalentStatsSection: getTalentStatsSectionResponse(),
    GetTalentEmploymentsSection: getTalentEmploymentsSectionResponse(),
    GetTalentWorkExperiencePortfolioItems:
      getTalentWorkExperiencePortfolioItemsResponse(),
    GetTalentResumePublications: getTalentResumePublicationsResponse(),
    GetTalentSkillsWithExperience: getTalentSkillsWithExperienceResponse(),
    GetMatchQualitySection: getMatchQualitySectionResponse(),
    GetTalentSoftSkills: getTalentSoftSkillsResponse(),
    GetUserVerticals: getUserVerticalsResponse(),
    GetTalentsListFilterOptions: getTalentsListFilterOptionsResponse(),
    GetClaimers: getClaimersResponse(),
    GetCountries: getCountriesResponse(),
    GetTalentTypes: getTalentTypesResponse(),
    GetFlags: getFlagsResponse(),
    GetSourcers: getSourcersResponse()
  }
}
