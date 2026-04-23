import {
  SourcingRequestsListItemFragment,
  SourcingRequestsListItemSkillSetFragment
} from '../../data/sourcing-requests-list-item-fragment/sourcing-requests-list-item-fragment.staff.gql.types'

export const getSourcingRequestSkills = (
  sourcingRequest: SourcingRequestsListItemFragment
) =>
  (sourcingRequest.skillSets?.nodes ?? []).reduce(
    (
      result: {
        mustHaveSkills: SourcingRequestsListItemSkillSetFragment[]
        niceToHaveSkills: SourcingRequestsListItemSkillSetFragment[]
      },
      currentSkillSet
    ) => {
      if (currentSkillSet.niceToHave) {
        result.niceToHaveSkills.push(currentSkillSet)
      } else {
        result.mustHaveSkills.push(currentSkillSet)
      }

      return result
    },
    {
      mustHaveSkills: [],
      niceToHaveSkills: []
    }
  )
