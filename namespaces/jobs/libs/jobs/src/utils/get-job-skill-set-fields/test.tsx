import { SkillRating } from '@staff-portal/graphql/staff'

import {
  SkillSet,
  getHighestRating,
  groupSkillSetsByCategory,
  generateSkillSetFields,
  SkillRankingMap
} from './get-job-skill-set-fields'

jest.mock('../../components')

const generateSkillSet = (data?: Partial<SkillSet>) =>
  ({
    id: '1',
    rating: 'EXPERT',
    connections: null,
    main: true,
    niceToHave: false,
    ...data,
    skill: {
      id: 'dfg',
      name: 'Node.js',
      ...data?.skill,
      category: {
        id: 'VjEtU2tpbGxDYXRlZ29yeS0zMg',
        title: 'Libraries/APIs',
        position: 1,
        ...data?.skill?.category
      }
    }
  } as SkillSet)

describe('getJobSkillSetFields', () => {
  describe('#getHighestRating', () => {
    it('returns the highest rated skill', () => {
      const skillSets = [
        generateSkillSet({ rating: SkillRating.EXPERT }),
        generateSkillSet({ rating: SkillRating.STRONG }),
        generateSkillSet({ rating: SkillRating.COMPETENT })
      ]

      expect(getHighestRating(skillSets)).toEqual(SkillRankingMap.EXPERT)
    })
  })
  describe('#groupSkillSetsByCategory', () => {
    it('returns the skillsets grouped by the same category', () => {
      const LANGUAGES_CATEGORY = { title: 'Languages', position: 1 }
      const LIBS_CATEGORY = { title: 'Libs/Frameworks', position: 2 }

      const skillSetA = {
        skill: { name: 'React', category: LIBS_CATEGORY }
      } as SkillSet
      const skillSetB = {
        skill: { name: 'Angular', category: LIBS_CATEGORY }
      } as SkillSet
      const skillSetC = {
        skill: { name: 'Node', category: LANGUAGES_CATEGORY }
      } as SkillSet

      const skillSets = [
        generateSkillSet(skillSetA),
        generateSkillSet(skillSetB),
        generateSkillSet(skillSetC)
      ]
      const expected = {
        [LANGUAGES_CATEGORY.title]: {
          position: LANGUAGES_CATEGORY.position,
          skills: [skillSets[2]]
        },
        [LIBS_CATEGORY.title]: {
          position: LIBS_CATEGORY.position,
          skills: [skillSets[0], skillSets[1]]
        }
      }

      const result = groupSkillSetsByCategory(skillSets)

      expect(result).toEqual(expected)
    })
  })

  describe('#generateSkillSetFields', () => {
    it('returns the categories sorted by the skills with the highest rating / position', () => {
      const LANGUAGES_CATEGORY = { title: 'Languages', position: 3 }
      const LIBS_CATEGORY = { title: 'Libs/Frameworks', position: 1 }
      const PLATFORMS_CATEGORY = { title: 'Platforms', position: 2 }

      const skillSetA = {
        rating: SkillRating.STRONG,
        skill: { name: 'Node', category: LANGUAGES_CATEGORY }
      } as SkillSet
      const skillSetB = {
        rating: SkillRating.STRONG,
        skill: { name: 'React', category: LIBS_CATEGORY }
      } as SkillSet
      const skillSetC = {
        rating: SkillRating.EXPERT,
        skill: { name: 'Node', category: PLATFORMS_CATEGORY }
      } as SkillSet

      const skillSets = [
        generateSkillSet(skillSetA),
        generateSkillSet(skillSetB),
        generateSkillSet(skillSetC)
      ]

      const groupedSkillSets = groupSkillSetsByCategory(skillSets)

      const result = generateSkillSetFields(groupedSkillSets)

      expect(result[0].label).toBe(PLATFORMS_CATEGORY.title)
      // If the rating is the same, category position has priority
      expect(result[1].label).toBe(LIBS_CATEGORY.title)
      expect(result[2].label).toBe(LANGUAGES_CATEGORY.title)
    })
  })
})
