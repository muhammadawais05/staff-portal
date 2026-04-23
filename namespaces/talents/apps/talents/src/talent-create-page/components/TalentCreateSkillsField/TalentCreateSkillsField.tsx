import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Form, useForm } from '@toptal/picasso-forms'
import { Item } from '@toptal/picasso/TagSelector'
import { GridItemField } from '@staff-portal/ui'
import { DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT } from '@staff-portal/config'
import { useDebouncedAutocomplete } from '@staff-portal/utils'
import { useGetTalentApplicationSkillsAutoComplete } from '@staff-portal/talents'

import { APPLICANT_SKILLS_FIELD } from '../../config'
import { isSkillLabel, prepareApplicationSkills } from './utils'

interface Props {
  verticalId: string
  talentType: string
}

const TalentCreateSkillsField = ({ verticalId, talentType }: Props) => {
  const { change } = useForm()

  const label = useMemo(
    () => (isSkillLabel(talentType) ? 'Skills' : 'Expertise'),
    [talentType]
  )

  const [selectedSkills, setSelectedSkills] = useState<Item[]>([])
  const [skillOptions, setSkillOptions] = useState<Item[] | null>(null)

  const {
    request: getApplicationSkills,
    loading: loadingApplicationSkills,
    data: applicationSkills
  } = useGetTalentApplicationSkillsAutoComplete()

  useEffect(() => {
    if (applicationSkills) {
      setSkillOptions(prepareApplicationSkills(applicationSkills))
    }
  }, [applicationSkills])

  const { search, searching, searchTerm, setSearchTerm, searchOptions } =
    useDebouncedAutocomplete({
      onSearch: (term, otherOptions) =>
        getApplicationSkills({
          talentOrVerticalId: verticalId,
          term,
          ...otherOptions
        }),
      searchOptions: skillOptions,
      loadingOptions: loadingApplicationSkills
    })

  const handleInputChange = useCallback(
    (term: string) => {
      const selectedIds = selectedSkills
        .filter(skill => skill.value !== skill.text)
        .map(skill => skill.value)

      setSearchTerm(term)

      search(term, {
        excludedIds: selectedIds
      })
    },
    [search, selectedSkills, setSearchTerm]
  )

  const onOtherOptionSelect = useCallback(
    (newValue: string) =>
      change(
        APPLICANT_SKILLS_FIELD,
        selectedSkills
          ? [...selectedSkills, { text: newValue, value: newValue }]
          : [{ text: newValue, value: newValue }]
      ),
    [change, selectedSkills]
  )

  return (
    <GridItemField label={label} required>
      <Form.TagSelector
        name={APPLICANT_SKILLS_FIELD}
        options={searchOptions}
        loading={searching}
        onChange={setSelectedSkills}
        onInputChange={handleInputChange}
        inputValue={searchTerm}
        data-lpignore
        noOptionsText={DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT}
        autoFocus
        width='full'
        required
        placeholder='Select skills from autocomplete'
        showOtherOption
        onOtherOptionSelect={onOtherOptionSelect}
        // hack to keep the field on focus
        onFocus={({ target }) => target.click()}
      />
    </GridItemField>
  )
}

export default TalentCreateSkillsField
