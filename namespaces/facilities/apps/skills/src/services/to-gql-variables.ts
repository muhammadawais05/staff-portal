import {
  LogicOperator,
  OrderDirection,
  SkillNameBadgesFilter,
  SkillNameTalentStatus
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { isNotNullish } from '@staff-portal/utils'
import {
  badgesToGql,
  IdGqlParam,
  Sort,
  parseBoolean,
  parseStringArray,
  SingleEnumToGqlParam
} from '@staff-portal/filters'
import { UserVerticalFragment } from '@staff-portal/verticals'

import { DEFAULT_SORT_FIELD, DEFAULT_SORT_ORDER } from '../config'
import { SkillNamesQueryParams } from '../pages/SkillsList/hooks/use-handle-skill-names-list-filters'
import { GetSkillNamesListQueryVariables } from '../data/get-skill-names-list'

const createGqlVerticalsFilterVariable = (
  verticals?: string[],
  availableVerticals?: UserVerticalFragment[]
) => {
  const gqlVerticals = parseStringArray(verticals)
    ?.map(
      talentType =>
        availableVerticals?.find(vertical => vertical.talentType === talentType)
          ?.talentType
    )
    .filter(isNotNullish)

  return gqlVerticals?.length ? { verticals: gqlVerticals } : {}
}

const createGqlCategoryIdsFilterVariable = (categoryIds?: string[]) => {
  const gqlCategoryIds = parseStringArray<string>(categoryIds)?.map(
    categoryId => encodeEntityId(categoryId, 'SkillCategory')
  )

  return gqlCategoryIds?.length ? { categoryIds: gqlCategoryIds } : {}
}

const createGqlTalentStatusesFilterVariable = (talentStatuses?: string[]) => {
  const gqlTalentStatuses =
    parseStringArray<SkillNameTalentStatus>(talentStatuses)

  return gqlTalentStatuses?.length ? { talentStatuses: gqlTalentStatuses } : {}
}

const createGqlBadgesFilterVariable = (
  badges?: SkillNameBadgesFilter,
  logic?: LogicOperator
) => {
  if (!badges) {
    return {}
  }

  return {
    badges: badgesToGql<SkillNameBadgesFilter>(badges as unknown[][], logic)
  }
}

const createGqlAncestorSkillNameIdFilterVariable = (
  ancestorSkillNameId?: string
) => {
  const gqlAncestorSkillNameId = IdGqlParam()(ancestorSkillNameId)

  return gqlAncestorSkillNameId
    ? { ancestorSkillNameId: gqlAncestorSkillNameId }
    : {}
}

const createGqlOnlyDirectChildFilterVariable = (onlyDirectChild?: string) => {
  const gqlOnlyDirectChild = parseBoolean(onlyDirectChild)

  return onlyDirectChild ? { onlyDirectChild: gqlOnlyDirectChild } : {}
}

const createGqlIsSkillIdentifierFilterVariable = (
  isSkillIdentifier?: string
) => {
  const gqlIsSkillIdentifier = parseBoolean(isSkillIdentifier)

  return isSkillIdentifier ? { isSkillIdentifier: gqlIsSkillIdentifier } : {}
}

const createGqlEditorCheckFilterVariable = (editorCheck?: string) => {
  const gqlEditorCheck = parseBoolean(editorCheck)

  return editorCheck ? { editorCheck: gqlEditorCheck } : {}
}

const createGqlVerticalCheckFilterVariable = (verticalCheck?: string) => {
  const gqlVerticalCheck = parseBoolean(verticalCheck)

  return verticalCheck ? { verticalCheck: gqlVerticalCheck } : {}
}

const createGqlOrderVariable = (sort?: Sort) => {
  const direction = sort?.order
    ? SingleEnumToGqlParam(OrderDirection)(sort.order)
    : DEFAULT_SORT_ORDER
  const order = {
    field: DEFAULT_SORT_FIELD,
    direction
  }

  return { order }
}

export const toGqlVariables = (
  filterValues: SkillNamesQueryParams,
  availableVerticals: UserVerticalFragment[] | undefined,
  pagination: { offset: number; limit: number }
): GetSkillNamesListQueryVariables => {
  const {
    is_skill_identifier: isSkillIdentifier,
    category_ids: categoryIds,
    ancestor_skill_name_id: ancestorSkillNameId,
    only_direct_child: onlyDirectChild,
    talent_statuses: talentStatuses,
    editor_check: editorCheck,
    vertical_check: verticalCheck,
    verticals,
    badges,
    logic,
    sort
  } = filterValues

  return {
    filter: {
      ...createGqlBadgesFilterVariable(badges, logic),
      ...createGqlVerticalsFilterVariable(verticals, availableVerticals),
      ...createGqlCategoryIdsFilterVariable(categoryIds),
      ...createGqlAncestorSkillNameIdFilterVariable(ancestorSkillNameId),
      ...createGqlOnlyDirectChildFilterVariable(onlyDirectChild),
      ...createGqlTalentStatusesFilterVariable(talentStatuses),
      ...createGqlIsSkillIdentifierFilterVariable(isSkillIdentifier),
      ...createGqlEditorCheckFilterVariable(editorCheck),
      ...createGqlVerticalCheckFilterVariable(verticalCheck)
    },
    ...createGqlOrderVariable(sort),
    pagination
  }
}
