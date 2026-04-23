import { Container, Form, Typography } from '@toptal/picasso'
import { ChangedOptions, Item } from '@toptal/picasso/Autocomplete'
import React from 'react'
import { DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT } from '@staff-portal/config'
import { SkillRating } from '@staff-portal/graphql/staff'
import { Autocomplete, AutocompleteHighlightOption } from '@staff-portal/ui'
import { useDebouncedAutocomplete } from '@staff-portal/utils'

import { JobSkillSet } from '../../types'
import { useGetJobSkillsAutocomplete } from './data'
import { SkillAutocompleteEdgeFragment } from './data/get-job-skills-autocomplete'
import * as S from './styles'

export interface Props {
  jobId: string
  defaultSkillCategoryId: string
  onChange: (skill: JobSkillSet) => void
  label: string
  placeholder: string
  required?: boolean
}

const getKey = (item: SkillAutocompleteEdgeFragment) => item.node?.id

const getDisplayValue = (skill: SkillAutocompleteEdgeFragment | null) =>
  skill?.label ?? ''

const renderSkillOption = (item: Item) => {
  const { label, labelHighlight, node } = item as SkillAutocompleteEdgeFragment
  const totalProfilesCount = node?.totalProfilesCount

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
      <Typography as='span' size='xsmall'>
        {totalProfilesCount} {totalProfilesCount === 1 ? 'profile' : 'profiles'}
      </Typography>
    </Container>
  )
}

const RequiredSkillsAutocomplete = ({
  jobId,
  defaultSkillCategoryId,
  onChange,
  label,
  placeholder,
  required
}: Props) => {
  const {
    getJobSkills,
    data: skills,
    loading: loadingSkills
  } = useGetJobSkillsAutocomplete({
    jobId
  })

  const { search, searching, searchTerm, setSearchTerm, searchOptions } =
    useDebouncedAutocomplete({
      onSearch: (term: string) => {
        getJobSkills({ term })
      },
      searchOptions: skills,
      loadingOptions: loadingSkills
    })

  const onChangeHandle = (term: string, { isSelected }: ChangedOptions) => {
    setSearchTerm(term)

    if (!isSelected) {
      search(term)
    }
  }

  const onSelect = (skill: Item) => {
    const { node: selectedSkill } = skill as SkillAutocompleteEdgeFragment

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
  }

  const onKeyDownHandle = (key: string) => {
    if (key === 'Enter' && searchTerm && !searching && !searchOptions?.length) {
      const skillSet: JobSkillSet = {
        main: false,
        rating: SkillRating.COMPETENT,
        destroy: false,
        niceToHave: true,
        skill: {
          id: `undefined`,
          category: { id: defaultSkillCategoryId, title: '' },
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
  }

  return (
    <>
      <Form.Label requiredDecoration={required ? 'asterisk' : undefined}>
        {label}
      </Form.Label>
      <Autocomplete<SkillAutocompleteEdgeFragment>
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
        onKeyDown={({ key }) => onKeyDownHandle(key)}
        noOptionsText={DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT}
      />
    </>
  )
}

export default RequiredSkillsAutocomplete
