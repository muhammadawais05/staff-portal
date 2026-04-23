import { useField, useForm } from '@toptal/picasso-forms'
import { FieldProps } from '@toptal/picasso-forms/FieldWrapper'
import { ChangedOptions, Item } from '@toptal/picasso/Autocomplete'
import { isString } from '@toptal/picasso/utils'
import React, { useMemo } from 'react'
import { AutocompleteHighlightOption } from '@staff-portal/ui'
import { useDebouncedAutocomplete } from '@staff-portal/utils'

import { ApplicantSkillsAutocompleteFragment } from '../../../data/get-talent-applicant-skills-autocomplete'
import { useGetTalentApplicationSkillsAutoComplete } from '../../../data'
import TalentApplicantSkillsAutocomplete from '../TalentApplicantSkillsAutocomplete'
import { AutocompleteItem, Skill } from '../types'

const getKey = (item: ApplicantSkillsAutocompleteFragment) => item.node?.id

const getDisplayValue = (skill: ApplicantSkillsAutocompleteFragment | null) =>
  skill?.node?.name ?? ''

const getSkillName = (skill: Skill): string =>
  isString(skill) ? skill : skill?.name ?? ''

const renderOption = (item: Item) => {
  const { labelHighlight } = item

  return (
    <AutocompleteHighlightOption labelHighlight={labelHighlight as string} />
  )
}

interface Props extends FieldProps<Skill[] | undefined> {
  talentOrVerticalId: string
  placeholder?: string
  disabled?: boolean
}

export const useTalentApplicantSkillsSelector = ({
  talentOrVerticalId,
  name,
  required = false,
  disabled = false,
  label = 'Applicant Skills',
  placeholder = 'Select skills from autocomplete'
}: Props) => {
  const form = useForm()

  const {
    input: { value: skillsValue }
  } = useField<Skill[]>(name)

  const {
    request: getApplicationSkills,
    data: skills,
    loading: loadingSkills
  } = useGetTalentApplicationSkillsAutoComplete()

  const excludedIds = useMemo(
    () =>
      skillsValue
        .map(item => (isString(item) ? '' : item?.id ?? ''))
        .filter(Boolean),
    [skillsValue]
  )

  const { search, searching, searchTerm, setSearchTerm, searchOptions } =
    useDebouncedAutocomplete({
      onSearch: (term: string) =>
        getApplicationSkills({
          term,
          talentOrVerticalId,
          excludedIds
        }),
      searchOptions: skills,
      loadingOptions: loadingSkills
    })

  const otherOptionAlreadyExists = useMemo(
    () =>
      skillsValue.some(skill => {
        const skillName = getSkillName(skill)

        return skillName.toLowerCase() === searchTerm.toLowerCase()
      }),
    [searchTerm, skillsValue]
  )

  const isSkillAlreadyExist = (skillName: string) =>
    skillsValue.some(skill => {
      const skillTitle = getSkillName(skill)

      return skillTitle.toLowerCase() === skillName.toLowerCase()
    })

  const onChangeHandle = (term: string, { isSelected }: ChangedOptions) => {
    setSearchTerm(term)

    if (!isSelected) {
      search(term)
    }
  }

  const onSelect = ({
    node: skillNode
  }: ApplicantSkillsAutocompleteFragment) => {
    const skillName = getSkillName(skillNode as Skill)

    if (isSkillAlreadyExist(skillName)) {
      return
    }

    setSearchTerm('')
    form.change(name, [...skillsValue, skillNode])
  }

  const onOtherOptionSelect = (otherOption: string) => {
    if (isSkillAlreadyExist(otherOption)) {
      return
    }

    setSearchTerm('')
    form.change(name, [...skillsValue, otherOption])
  }

  const getSkillIndex = (skill: Skill) =>
    skillsValue.findIndex((item: Skill) => {
      if (typeof skill !== typeof item) {
        return false
      }

      if (isString(skill) && isString(item)) {
        return item === skill
      }

      const autocompleteItem = item as AutocompleteItem
      const autocompleteSkill = skill as AutocompleteItem

      return (
        autocompleteItem &&
        autocompleteSkill &&
        autocompleteItem.name === autocompleteSkill.name
      )
    })

  const onSkillDelete = (skill: Skill) => {
    const skillIndex = getSkillIndex(skill)

    if (skillIndex > -1) {
      const newSkillsValue = [...skillsValue]

      newSkillsValue.splice(skillIndex, 1)
      form.change(name, newSkillsValue)
    }
  }

  return {
    setSearchTerm,
    render: () => (
      <TalentApplicantSkillsAutocomplete
        width='full'
        required={required}
        label={label}
        name={name}
        placeholder={placeholder}
        value={searchTerm}
        enableReset={false}
        options={searchOptions}
        getKey={getKey}
        getDisplayValue={getDisplayValue}
        renderOption={renderOption}
        loading={searching}
        disabled={disabled}
        onChange={onChangeHandle}
        showOtherOption={!otherOptionAlreadyExists}
        onSelect={onSelect}
        onOtherOptionSelect={onOtherOptionSelect}
        testIds={{
          input: 'talent-applicant-skills-selector-input'
        }}
        onSkillDelete={onSkillDelete}
        skills={skillsValue}
      />
    )
  }
}
