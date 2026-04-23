import {
  TalentQuizQuestionKind,
  TalentQuizQuestionsFilter
} from '@staff-portal/graphql/staff'
import {
  badgesToGql,
  parseStringArray,
  SingleEnumToGqlParam
} from '@staff-portal/filters'

import { GetTalentQuizQuestionsListQueryVariables } from '../data/get-talent-quiz-questions-list'

type FilterValues = {
  kind?: string
  talent_type?: string[]
  badges?: {
    keywords?: string[]
  }
  logic?: string
}

const createGqlKindVariable = (filterValues: FilterValues) => {
  if (filterValues.kind) {
    return SingleEnumToGqlParam(TalentQuizQuestionKind)(filterValues.kind)
  }

  return undefined
}

const createGqlTalentTypeVariable = (filterValues: FilterValues) => {
  return parseStringArray(filterValues.talent_type)?.filter(Boolean)
}

const createKeywordsAndLogicVariables = (filterValues: FilterValues) => {
  if (filterValues.badges) {
    return badgesToGql<TalentQuizQuestionsFilter>(
      filterValues.badges as unknown[][],
      filterValues.logic
    )
  }

  return {}
}

const paramsToFilter = (
  filterValues: FilterValues
): TalentQuizQuestionsFilter => {
  const filter = {
    kind: createGqlKindVariable(filterValues),
    talentType: createGqlTalentTypeVariable(filterValues),
    ...createKeywordsAndLogicVariables(filterValues)
  }

  return filter
}

const createGqlFilterVariables = (
  filterValues: FilterValues,
  pagination: { offset: number; limit: number }
): GetTalentQuizQuestionsListQueryVariables => {
  return {
    filter: paramsToFilter(filterValues),
    pagination
  }
}

export default createGqlFilterVariables
