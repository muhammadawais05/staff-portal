import { getRatingNumberValue } from '../get-rating-number-value/get-rating-number-value'
import { TalentSoftSkillFragment } from '../../data/get-talent-soft-skills/get-talent-soft-skills.staff.gql.types'
import { TalentSoftSkills, Rating } from '../../types'

const getCumulativeRatingForSkill = ({ ratings }: TalentSoftSkills) => {
  if (!ratings.length) {
    return 0
  }

  const ratingsSum = ratings
    .map(rating => getRatingNumberValue(rating.value))
    .reduce((itemA, itemB) => itemA + itemB, 0)

  return Math.round((ratingsSum / ratings.length) * 100) / 100
}

const orderRatingsByCreationDate = (ratings: Rating[]) =>
  ratings.sort((ratingA, ratingB) =>
    ratingA.createdAt < ratingB.createdAt ? 1 : -1
  )

export const matchRatingsToSoftSkills = (
  softSkills: TalentSoftSkillFragment[],
  ratings: Rating[]
) => {
  const resultingSoftSkills: TalentSoftSkills[] = softSkills.map(
    ({ id, name, ratingHints }) => ({
      id,
      name,
      cumulativeRating: 0,
      ratings: [],
      ratingHints
    })
  )

  ratings.forEach(rating => {
    const parentSoftSkillIndex = resultingSoftSkills.findIndex(
      softSkill => softSkill.id === rating.softSkill.id
    )

    resultingSoftSkills[parentSoftSkillIndex].ratings.push(rating)
  })

  resultingSoftSkills.forEach((softSkill, index) => {
    resultingSoftSkills[index].cumulativeRating =
      getCumulativeRatingForSkill(softSkill)
    resultingSoftSkills[index].ratings = orderRatingsByCreationDate(
      softSkill.ratings
    )
  })

  return resultingSoftSkills
}
