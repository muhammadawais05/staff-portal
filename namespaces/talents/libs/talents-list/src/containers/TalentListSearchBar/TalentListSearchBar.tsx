import React, { ReactNode } from 'react'
import { Typography, Tag, Select, Container } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { DEFAULT_AUTOCOMPLETE_RESULTS_SIZE } from '@staff-portal/config'
import {
  SkillBadgedSearchInput,
  SkillRating
} from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'
import { AutocompleteHighlightOption } from '@staff-portal/ui'
import {
  createInputCategory,
  createAutocompleteCategory,
  createMultiAutocompleteCategory,
  SearchBar,
  SearchBarCategory,
  SearchBarCategories
} from '@staff-portal/filters'
import {
  SearchBarSkillAutocompleteEdgeFragment,
  getSearchBarSkillsAutocomplete
} from '@staff-portal/skills'

import * as S from './styles'
import { TalentSearchBarKeywordAutocompleteEdgeFragment } from './data/get-talent-search-bar-keywords-autocomplete/get-talent-search-bar-keywords-autocomplete.staff.gql.types'
import { getTalentSearchBarKeywordsAutocomplete } from './data/get-talent-search-bar-keywords-autocomplete/get-talent-search-bar-keywords-autocomplete.staff.gql'
import {
  emailsSearchCategory,
  namesSearchCategory,
  industriesSearchCategory,
  languagesSearchCategory
} from '../../services'

const RATING_OPTIONS = [
  SkillRating.COMPETENT,
  SkillRating.STRONG,
  SkillRating.EXPERT
].map(value => ({
  text: titleize(value),
  value
}))

export const searchBarCategories: SearchBarCategories = [
  createAutocompleteCategory<
    SkillBadgedSearchInput,
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
        return [{ name: params, rating: SkillRating.COMPETENT }]
      }

      if (Array.isArray(params)) {
        return params.map(name => ({ name, rating: SkillRating.COMPETENT }))
      }

      const skillBadges: SkillBadgedSearchInput[] = []
      const skillRatings = Object.keys(params) as SkillRating[]

      skillRatings.forEach(rating => {
        const paramRatings = params[rating]

        if (Array.isArray(paramRatings)) {
          paramRatings.forEach(name => {
            skillBadges.push({
              name,
              rating: rating.toUpperCase() as SkillRating
            })
          })
        }
      })

      return skillBadges
    },
    fromOption: ({ label }) => ({
      name: label || '',
      rating: SkillRating.COMPETENT
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
    fromInputValue: value => ({ name: value, rating: SkillRating.COMPETENT }),
    getBadgeLabel: value => value.name,
    BadgeComponent: ({ value, onBadgeChange, onBadgeDelete }) => {
      const handleRatingChange = (newRating: SkillRating) => {
        if (!onBadgeChange) {
          return
        }

        onBadgeChange({ name: value.name, rating: newRating })
      }

      const skillContainer = [
        S.skill,
        value.rating === SkillRating.COMPETENT && S.competentSkill,
        value.rating === SkillRating.STRONG && S.strongSkill,
        value.rating === SkillRating.EXPERT && S.expertSkill
      ]

      return (
        <Tag css={skillContainer} onDelete={onBadgeDelete}>
          <Container flex inline alignItems='center'>
            <Container right='xsmall'>
              <Typography
                titleCase
                color='inherit'
                weight='semibold'
                size='xsmall'
              >
                {value.name}
              </Typography>
            </Container>
            <Select
              size='small'
              css={S.ratingSelect}
              menuWidth='6.5rem'
              options={RATING_OPTIONS}
              onChange={e => handleRatingChange(e.target.value as SkillRating)}
              value={value.rating}
            />
          </Container>
        </Tag>
      )
    }
  }),
  createMultiAutocompleteCategory<
    string,
    TalentSearchBarKeywordAutocompleteEdgeFragment,
    SkillBadgedSearchInput | string
  >({
    numberOfAutocompleteResults: DEFAULT_AUTOCOMPLETE_RESULTS_SIZE,
    name: 'keywords',
    toQueryParam: value => value,
    fromQueryParam: value => value,
    getKey: value => value,
    fromOption: ({ label, entityType }) => {
      const value = label || ''

      if (entityType === 'skill_name') {
        const category = searchBarCategories.find(
          ({ name }) => name === 'skills'
        ) as SearchBarCategory<SkillBadgedSearchInput>

        return {
          category,
          value: {
            name: value,
            rating: SkillRating.COMPETENT
          }
        }
      }

      if (entityType === 'talent') {
        const category = searchBarCategories.find(
          ({ name }) => name === 'names'
        ) as SearchBarCategory<string>

        return { category, value }
      }

      if (entityType === 'language') {
        const category = searchBarCategories.find(
          ({ name }) => name === 'languages'
        ) as SearchBarCategory<string>

        return { category, value }
      }

      const category = searchBarCategories.find(
        ({ name }) => name === 'keywords'
      ) as SearchBarCategory<string>

      return { category, value }
    },
    getOptions: getTalentSearchBarKeywordsAutocomplete,
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
  createInputCategory({ name: 'jobSkills', label: 'job skills' })
]

export interface Props {
  nestableControls: ReactNode
}

const TalentListSearchBar = ({ nestableControls }: Props) => {
  const { showError } = useNotifications()

  return (
    <SearchBar
      name='badges'
      categories={searchBarCategories}
      nestableControls={nestableControls}
      onError={() => showError('Unable to fetch items.')}
    />
  )
}

export default TalentListSearchBar
