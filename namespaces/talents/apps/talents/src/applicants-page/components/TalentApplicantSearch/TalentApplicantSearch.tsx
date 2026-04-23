import React, { ReactNode } from 'react'
import { useNotifications } from '@staff-portal/error-handling'
import {
  SearchBar,
  SearchBarCategory,
  createAutocompleteCategory,
  createMultiAutocompleteCategory
} from '@staff-portal/filters'
import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import { AutocompleteHighlightOption } from '@staff-portal/ui'
import {
  ApplicantSkillBadgedSearchInput,
  ApplicantSkillRating
} from '@staff-portal/graphql/staff'
import { Tag } from '@toptal/picasso'
import {
  getSearchBarSkillsAutocomplete,
  SearchBarSkillAutocompleteEdgeFragment
} from '@staff-portal/skills'
import {
  industriesSearchCategory,
  namesSearchCategory,
  emailsSearchCategory,
  languagesSearchCategory,
  getTalentApplicantSearchBarKeywordsAutocomplete,
  TalentSearchBarKeywordAutocompleteEdgeFragment
} from '@staff-portal/talents-list'

import * as S from './styles'

interface Props {
  nestableControls: ReactNode
}

const applicantsSearchBarCategories: SearchBarCategory[] = [
  createMultiAutocompleteCategory<
    string,
    TalentSearchBarKeywordAutocompleteEdgeFragment,
    ApplicantSkillBadgedSearchInput | string
  >({
    numberOfAutocompleteResults: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
    name: 'keywords',
    toQueryParam: value => value,
    fromQueryParam: value => value,
    getKey: value => value,
    fromOption: ({ label, entityType }) => {
      const value = label || ''

      if (entityType === 'skill') {
        const category = applicantsSearchBarCategories.find(
          ({ name }) => name === 'skills'
        ) as SearchBarCategory

        return {
          category,
          value: {
            name: value,
            rating: ApplicantSkillRating.APPLICANT
          }
        }
      }

      if (entityType === 'talent') {
        const category = applicantsSearchBarCategories.find(
          ({ name }) => name === 'names'
        ) as SearchBarCategory<string>

        return { category, value }
      }

      if (entityType === 'language') {
        const category = applicantsSearchBarCategories.find(
          ({ name }) => name === 'languages'
        ) as SearchBarCategory<string>

        return { category, value }
      }

      const category = applicantsSearchBarCategories.find(
        ({ name }) => name === 'keywords'
      ) as SearchBarCategory<string>

      return { category, value }
    },
    getOptions: getTalentApplicantSearchBarKeywordsAutocomplete,
    getOptionKey: ({ key }) => key,
    renderOption: ({ label, labelHighlight, nodeTypes }) => (
      <AutocompleteHighlightOption
        label={label}
        labelHighlight={labelHighlight}
        nodeTypes={nodeTypes}
        titleCase
      />
    ),
    fromInputValue: value => value,
    getBadgeLabel: value => value
  }),
  emailsSearchCategory(),
  namesSearchCategory(),
  languagesSearchCategory(),
  industriesSearchCategory(),
  createAutocompleteCategory<
    ApplicantSkillBadgedSearchInput,
    SearchBarSkillAutocompleteEdgeFragment
  >({
    numberOfAutocompleteResults: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
    name: 'skills',
    toQueryParams: badges => {
      const queryParams = badges.reduce<Record<string, string[]>>(
        (params, { name, rating }) => {
          const ratingLowCase = rating.toLowerCase()

          params[ratingLowCase] = params[ratingLowCase] ?? []
          params[ratingLowCase].push(name)

          return params
        },
        {}
      )

      return queryParams
    },
    fromQueryParams: params => {
      if (typeof params === 'string') {
        return [{ name: params, rating: ApplicantSkillRating.APPLICANT }]
      }

      if (Array.isArray(params)) {
        return params.map(name => ({
          name,
          rating: ApplicantSkillRating.APPLICANT
        }))
      }

      const skillBadges: ApplicantSkillBadgedSearchInput[] = []
      const skillRatings = Object.keys(params) as ApplicantSkillRating[]

      skillRatings.forEach(rating => {
        const paramRatings = params[rating]

        if (Array.isArray(paramRatings)) {
          paramRatings.forEach(name => {
            skillBadges.push({
              name,
              rating: rating.toUpperCase() as ApplicantSkillRating
            })
          })
        }
      })

      return skillBadges
    },
    fromOption: ({ label }) => ({
      name: label || '',
      rating: ApplicantSkillRating.APPLICANT
    }),
    getKey: value => value.name,
    getOptions: getSearchBarSkillsAutocomplete,
    getOptionKey: ({ key }) => key,
    renderOption: ({ label, labelHighlight, nodeTypes }) => (
      <AutocompleteHighlightOption
        label={label}
        labelHighlight={labelHighlight}
        nodeTypes={nodeTypes}
        titleCase
      />
    ),
    fromInputValue: value => ({
      name: value,
      rating: ApplicantSkillRating.APPLICANT
    }),
    getBadgeLabel: value => value.name,
    BadgeComponent: ({ value, onBadgeDelete }) => (
      <Tag titleCase={false} css={S.skill} onDelete={onBadgeDelete}>
        "{value.name}" skills
      </Tag>
    )
  })
]

const TalentApplicantSearch = ({ nestableControls }: Props) => {
  const { showError } = useNotifications()

  return (
    <SearchBar
      name='badges'
      categories={applicantsSearchBarCategories}
      nestableControls={nestableControls}
      onError={() => showError('Unable to fetch items.')}
    />
  )
}

export default TalentApplicantSearch
