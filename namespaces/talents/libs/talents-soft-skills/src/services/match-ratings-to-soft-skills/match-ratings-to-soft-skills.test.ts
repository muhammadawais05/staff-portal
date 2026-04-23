import { SoftSkillRatingValue } from '@staff-portal/graphql/staff'

import { createSoftSkillsRatingFragmentMock } from '../../data/get-talent-soft-skills/mocks'
import { matchRatingsToSoftSkills } from './match-ratings-to-soft-skills'
import { Rating } from '../../types'

describe('matchRatingsToSoftSkills()', () => {
  const defaultRatingHints = [
    {
      description: 'Some description',
      title: 'Some title',
      value: SoftSkillRatingValue.RATING_1
    }
  ]

  it('matches ratings to existing soft skills', () => {
    const SOFT_SKILL_ID = 'abc123'
    const SOFT_SKILL_NAME = 'Test Name skd732'
    const ratings = [
      {
        ...createSoftSkillsRatingFragmentMock(SOFT_SKILL_ID)
      }
    ]

    const result = matchRatingsToSoftSkills(
      [
        {
          id: SOFT_SKILL_ID,
          name: SOFT_SKILL_NAME,
          ratingHints: defaultRatingHints
        }
      ],
      ratings
    )

    expect(result[0].name).toEqual(SOFT_SKILL_NAME)
  })

  it('calculates cumulative rating for every soft skill', () => {
    const softSkill = {
      id: '123',
      name: 'TEST_NAME',
      ratingHints: defaultRatingHints
    }

    const ratings = [
      {
        ...createSoftSkillsRatingFragmentMock(softSkill.id),
        value: SoftSkillRatingValue.RATING_2
      },
      {
        ...createSoftSkillsRatingFragmentMock(softSkill.id),
        value: SoftSkillRatingValue.RATING_5
      }
    ]

    const result = matchRatingsToSoftSkills([softSkill], ratings)

    expect(result[0].cumulativeRating).toBe(3.5)
  })

  it('sorts ratings by creation date for every soft skill', () => {
    const softSkill = {
      id: '123',
      name: 'TEST_NAME',
      ratingHints: defaultRatingHints
    }

    const RATING_ID_2010 = 'id-2010'
    const RATING_ID_2020 = 'id-2020'
    const RATING_ID_2030 = 'id-2030'
    const ratings: Rating[] = [
      {
        ...createSoftSkillsRatingFragmentMock(softSkill.id),
        id: RATING_ID_2020,
        createdAt: '2020-01-01T00:00:00.000Z'
      },
      {
        ...createSoftSkillsRatingFragmentMock(softSkill.id),
        id: RATING_ID_2030,
        createdAt: '2030-01-01T00:00:00.000Z'
      },
      {
        ...createSoftSkillsRatingFragmentMock(softSkill.id),
        id: RATING_ID_2010,
        createdAt: '2010-01-01T00:00:00.000Z'
      }
    ]

    const result = matchRatingsToSoftSkills([softSkill], ratings)

    expect(result[0].ratings[0].id).toEqual(RATING_ID_2030)
    expect(result[0].ratings[1].id).toEqual(RATING_ID_2020)
    expect(result[0].ratings[2].id).toEqual(RATING_ID_2010)
  })

  describe('when there are no ratings for the soft skill', () => {
    it('returns empty soft skill', () => {
      const SOFT_SKILL_ID = 'abc123'
      const SOFT_SKILL_NAME = 'Test Name skd732'

      const result = matchRatingsToSoftSkills(
        [
          {
            id: SOFT_SKILL_ID,
            name: SOFT_SKILL_NAME,
            ratingHints: defaultRatingHints
          }
        ],
        []
      )

      expect(result[0].id).toEqual(SOFT_SKILL_ID)
      expect(result[0].name).toEqual(SOFT_SKILL_NAME)
      expect(result[0].cumulativeRating).toBe(0)
      expect(result[0].ratings).toEqual([])
    })
  })
})
