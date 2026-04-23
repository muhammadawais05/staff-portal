import React, { ReactNode, useCallback } from 'react'
import { Container, Form } from '@toptal/picasso'
import {
  Form as PicassoForm,
  useField,
  useFieldArray
} from '@toptal/picasso-forms'
import { ChangedOptions, Item } from '@toptal/picasso/Autocomplete'
import { DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT } from '@staff-portal/config'
import { SkillRating } from '@staff-portal/graphql/staff'
import { Autocomplete, AutocompleteHighlightOption } from '@staff-portal/ui'
import { useDebouncedAutocomplete } from '@staff-portal/utils'
import {
  useGetVerticalSkillsAutocomplete,
  VerticalSkillAutocompleteEdgeFragment
} from '@staff-portal/skills'

import * as S from './styles'
import { JobSkillSet } from '../../types'

export interface Props {
  defaultSkillCategoryId?: string
  defaultSkillCategoryTitle?: string
  onChange: (skill: JobSkillSet) => void
  label: string
  name: string
  hint?: ReactNode
  placeholder: string
  requiredDecoration?: boolean
  verticalId?: string
  titleCase?: boolean
}

const getKey = (item: VerticalSkillAutocompleteEdgeFragment) => item.node?.id

const getDisplayValue = (skill: VerticalSkillAutocompleteEdgeFragment | null) =>
  skill?.label ?? ''

const renderSkillOption = (item: Item) => {
  const { label, labelHighlight } =
    item as VerticalSkillAutocompleteEdgeFragment

  return (
    <Container
      flex
      alignItems='center'
      justifyContent='space-between'
      css={S.optionWrapper}
    >
      <AutocompleteHighlightOption
        labelHighlight={labelHighlight}
        label={label}
      />
    </Container>
  )
}

const OtherSkillsAutocomplete = ({
  defaultSkillCategoryId,
  defaultSkillCategoryTitle,
  onChange,
  label,
  name,
  hint,
  placeholder,
  requiredDecoration,
  verticalId,
  titleCase
}: Props) => {
  const {
    fields: { value: skills }
  } = useFieldArray<JobSkillSet>('skillSets')

  const {
    meta: { invalid }
  } = useField(name)

  const {
    getVerticalSkills,
    data: skillsOptions = [],
    loading: loadingSkills
  } = useGetVerticalSkillsAutocomplete({
    verticalId
  })

  const { search, searching, searchTerm, setSearchTerm, searchOptions } =
    useDebouncedAutocomplete({
      onSearch: (term: string) => {
        const excludedIds = skills
          .filter(skillSet => !!skillSet.skill.id && !skillSet.destroy)
          .map(skillSet => skillSet.skill.id) as string[]

        getVerticalSkills(term, excludedIds)
      },
      searchOptions: skillsOptions,
      loadingOptions: loadingSkills
    })

  const onChangeHandle = useCallback(
    (term: string, { isSelected }: ChangedOptions) => {
      setSearchTerm(term)

      if (!isSelected) {
        search(term)
      }
    },
    [search, setSearchTerm]
  )

  const onSelect = useCallback(
    (skill: Item) => {
      const { node: selectedSkill } =
        skill as VerticalSkillAutocompleteEdgeFragment

      if (!selectedSkill) {
        return
      }

      const skillSet: JobSkillSet = {
        main: false,
        rating: SkillRating.COMPETENT,
        skill: selectedSkill,
        destroy: false,
        niceToHave: true,
        // eslint-disable-next-line @miovision/disallow-date/no-new-date
        addedAt: new Date().toISOString()
      }

      setSearchTerm('')
      onChange(skillSet)
    },
    [onChange, setSearchTerm]
  )

  const onKeyDownHandle = useCallback(
    (key: string) => {
      if (
        key === 'Enter' &&
        searchTerm &&
        defaultSkillCategoryId &&
        defaultSkillCategoryTitle &&
        !searching &&
        !searchOptions?.length
      ) {
        const skillSet: JobSkillSet = {
          main: false,
          rating: SkillRating.COMPETENT,
          destroy: false,
          niceToHave: true,
          skill: {
            id: undefined,
            category: {
              id: defaultSkillCategoryId,
              title: defaultSkillCategoryTitle
            },
            competentProfilesCount: 0,
            expertProfilesCount: 0,
            strongProfilesCount: 0,
            totalProfilesCount: 0,
            name: searchTerm
          }
        }

        setSearchTerm('')
        onChange(skillSet)
      }
    },
    [
      defaultSkillCategoryId,
      defaultSkillCategoryTitle,
      onChange,
      searchOptions,
      searchTerm,
      searching,
      setSearchTerm
    ]
  )

  return (
    <Form.Field>
      <Form.Label
        requiredDecoration={requiredDecoration ? 'asterisk' : undefined}
        titleCase={titleCase}
      >
        {label}
      </Form.Label>
      <Autocomplete<VerticalSkillAutocompleteEdgeFragment>
        width='full'
        placeholder={placeholder}
        value={searchTerm}
        enableReset={false}
        options={searchOptions}
        getKey={getKey}
        getDisplayValue={getDisplayValue}
        renderOption={renderSkillOption}
        loading={searching}
        onChange={onChangeHandle}
        onSelect={onSelect}
        error={invalid}
        testIds={{
          input: 'other-skills-autocomplete'
        }}
        onKeyDown={({ key }) =>
          defaultSkillCategoryId ? onKeyDownHandle(key) : key
        }
        noOptionsText={DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT}
      />
      {name && <PicassoForm.Input type='hidden' name={name} />}
      {hint && !invalid && <Form.Hint>{hint}</Form.Hint>}
    </Form.Field>
  )
}

export default OtherSkillsAutocomplete
