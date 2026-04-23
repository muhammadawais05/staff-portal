import { sub } from '@staff-portal/date-time-utils'
import { SkillRating, VettedSkillResult } from '@staff-portal/graphql/staff'

import { GET_TALENT_SKILL_SETS } from './get-talent-skill-sets.staff.gql'
import {
  TalentPortfolioItemSkillConnectionFragment,
  TalentEmploymentSkillConnectionFragment,
  TalentCertificationSkillConnectionFragment,
  TalentProfileSkillConnectionFragment,
  TalentEducationSkillConnectionFragment
} from '../../../data/talent-skill-set-connections-fragment'
import { TalentSkillSetsFragment } from '../../../data/talent-skill-sets-fragment'
import { SkillConnection } from '../types'

export type SkillSetMock = {
  id?: string
  rating: SkillRating
  totalConnectionsCount: number
  skillName: string
  skillCategoryTitle: string
  skillCategoryPosition: number
  connections: SkillConnection[]
  vettedResult: {
    result: VettedSkillResult
    createdAt: string
    comment?: string
    performer?: { id: string; fullName: string }
  }
}

export const createTalentProfileSkillMock = (
  data?: Partial<TalentProfileSkillConnectionFragment>
) =>
  ({
    __typename: 'TalentProfile',
    about: 'This part was obfuscated, some content was here',
    github: {
      text: '',
      url: null,
      __typename: 'Link'
    },
    resumeFiles: {
      nodes: [],
      __typename: 'TalentProfileResumeFileConnection'
    },
    website: 'https://example.com',
    ...data
  } as unknown as TalentProfileSkillConnectionFragment)

export const createTalentEducationSkillMock = (
  data?: Partial<TalentEducationSkillConnectionFragment>
) =>
  ({
    __typename: 'TalentEducation',
    degree: "Bachelor's Degree",
    title: 'University of Brasilia',
    ...data
  } as unknown as TalentEducationSkillConnectionFragment)

export const createTalentPortfolioItemSkillMock = (
  data?: Partial<TalentPortfolioItemSkillConnectionFragment>
) =>
  ({
    __typename: 'TalentPortfolioItem',
    title: 'Whisper',
    ...data
  } as unknown as TalentPortfolioItemSkillConnectionFragment)

export const createTalentCertificationSkillMock = (
  data?: Partial<TalentCertificationSkillConnectionFragment>
) =>
  ({
    __typename: 'TalentCertification',
    certificate: 'Microsoft Certified Professional (MCP)',
    institution: 'Microsoft',
    ...data
  } as unknown as TalentCertificationSkillConnectionFragment)

export const createTalentEmploymentSkillMock = (
  data?: Partial<TalentEmploymentSkillConnectionFragment>
) =>
  ({
    __typename: 'TalentEmployment',
    startYear: 2018,
    endYear: 2020,
    position: 'Senior Application Architect | Tech Manager',
    company: 'IBM',
    ...data
  } as unknown as TalentEmploymentSkillConnectionFragment)

export const createTalentSkillSetMock = (data?: Partial<SkillSetMock>) =>
  ({
    id: data?.id || '123',
    rating: data?.rating || 'EXPERT',
    main: false,
    connections: {
      totalCount: data?.totalConnectionsCount || 1,
      nodes: data?.connections || [],
      __typename: 'SkillConnectionSkillableConnection'
    },
    skill: {
      id: '123',
      name: data?.skillName || 'Skill Name',
      category: {
        id: 'test-id',
        title: data?.skillCategoryTitle || 'Category Title',
        position: data?.skillCategoryPosition || 1,
        __typename: 'SkillCategory'
      },
      __typename: 'Skill'
    },
    vettedResult: data?.vettedResult ?? {
      result: VettedSkillResult.EXPERT,
      createdAt: sub(new Date(), { days: 1 }),
      comment: 'TEST_COMMENT',
      performer: {
        id: '123',
        fullName: 'TEST_NAME',
        __typename: 'Staff'
      },
      __typename: 'VettedResult'
    },
    __typename: 'SkillSet'
  } as unknown as TalentSkillSetsFragment['nodes'][0])

export const createGetTalentSkillSetsMock = ({
  talentId,
  skillSets = []
}: {
  talentId: string
  skillSets?: TalentSkillSetsFragment['nodes']
}) => ({
  request: { query: GET_TALENT_SKILL_SETS, variables: { talentId } },
  result: {
    data: {
      node: {
        id: talentId,
        type: 'TEST_TYPE',
        skillSets: {
          totalCount: 85,
          nodes: skillSets,
          __typename: 'TalentSkillSets'
        },
        __typename: 'Talent'
      }
    }
  }
})

export const createGetTalentSkillSetsFailedMock = ({
  talentId
}: {
  talentId: string
}) => ({
  request: { query: GET_TALENT_SKILL_SETS, variables: { talentId } },
  error: new Error('Network error occurred')
})
