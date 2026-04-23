import { decodeEntityId } from '@staff-portal/data-layer-service'
import { titleize } from '@staff-portal/string'
import { FiltersConfig } from '@staff-portal/filters'
import {
  FlagFragment,
  ClaimerFragment,
  GetCountriesQuery,
  CLAIMER_CLAIMED_BY_ME,
  getClaimerOptions
} from '@staff-portal/facilities'
import { GetTalentTypesQuery } from '@staff-portal/verticals'
import { GetSourcersQuery } from '@staff-portal/talents'
import { NOT_SELECTED_OPTION } from '@staff-portal/config'

export const buildTalentTypesOptions = (
  talentTypes?: GetTalentTypesQuery['verticals']['nodes']
) => {
  if (!talentTypes) {
    return []
  }

  return talentTypes
    .map(({ talentType, specializations }) => ({
      id: talentType,
      label: titleize(talentType),
      children: specializations.nodes
        .map(({ id, title }) => ({
          id: decodeEntityId(id).id,
          label: title
        }))
        .sort((firstItem, secondItem) =>
          firstItem.label.localeCompare(secondItem.label)
        )
    }))
    .sort((firstItem, secondItem) =>
      firstItem.label.localeCompare(secondItem.label)
    )
}

export const buildCountryOptions = (
  countries?: GetCountriesQuery['countries']['nodes']
) => {
  if (!countries) {
    return []
  }

  const options = countries.map(({ id, name }) => ({
    value: decodeEntityId(id).id,
    text: name ?? ''
  }))

  return options
}

export const buildSourcerOptions = (
  sourcers?: GetSourcersQuery['roles']['nodes']
) => {
  if (!sourcers) {
    return []
  }

  const options = sourcers.map(({ id, fullName }) => ({
    id: decodeEntityId(id).id,
    label: fullName ?? ''
  }))

  return options
}

export const buildFlagOptions = (flags?: FlagFragment[]) => {
  if (!flags) {
    return []
  }

  return flags.map(({ id, title }) => ({
    text: title,
    value: decodeEntityId(id).id
  }))
}

export const buildClaimerOptions = (
  claimers?: ClaimerFragment[],
  currentUserId?: string
) => {
  if (!claimers) {
    return []
  }

  return getClaimerOptions(claimers, currentUserId, [
    NOT_SELECTED_OPTION,
    CLAIMER_CLAIMED_BY_ME
  ])
}

export const prepareFilters = (filtersList: FiltersConfig) => {
  return filtersList.reduce((list, filter) => {
    if (Array.isArray(filter)) {
      const filteredList = filter.filter(item => !item.hidden)

      if (filteredList.length) {
        list.push(filteredList)
      }

      return list
    }

    if (!filter.hidden) {
      list.push(filter)
    }

    return list
  }, [] as FiltersConfig & FiltersConfig[])
}
