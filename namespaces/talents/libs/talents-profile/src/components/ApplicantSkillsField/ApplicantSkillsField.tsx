import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Tag } from '@toptal/picasso'
import { Item } from '@toptal/picasso/TagSelector'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import deepEqual from 'deep-equal'
import { UpdateTalentApplicantSkillsInput } from '@staff-portal/graphql/staff'
import { InlineTagSelector, EditableField } from '@staff-portal/editable'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import {
  TALENT_UPDATED,
  useGetTalentApplicationSkillsAutoComplete,
  useUpdateTalentApplicantSkills
} from '@staff-portal/talents'
import { useDebouncedAutocomplete } from '@staff-portal/utils'

import { TalentProfileGeneralDataFragment } from '../TalentGeneralSection/data/get-talent-profile-general-data'
import { getTalentProfileApplicantSkillsHook } from '../TalentGeneralSection/hooks/get-talent-profile-applicant-skills-hook'
import {
  parseApplicantSkills,
  parseNewApplicantSkillNames
} from '../../utils/parse-selected-skills'
import {
  getSkillName,
  prepareApplicantSkills,
  prepareApplicationSkills
} from './utils'

type Props = {
  talentId: string
  applicantSkills?: TalentProfileGeneralDataFragment['applicantSkills']
}

const ApplicantSkillsField = ({ talentId, applicantSkills }: Props) => {
  const { handleMutationResult } = useHandleMutationResult()
  const [selectedSkills, setSelectedSkills] = useState<Item[]>([])
  const [skillOptions, setSkillOptions] = useState<Item[] | null>(null)
  const emitMessage = useMessageEmitter()

  useMemo(() => {
    setSelectedSkills(prepareApplicantSkills(applicantSkills))
  }, [applicantSkills])

  const [updateTalentApplicantSkills] = useUpdateTalentApplicantSkills({
    onCompleted: data => {
      if (data.updateTalentApplicantSkills?.success) {
        emitMessage(TALENT_UPDATED, { talentId })
      }
    }
  })

  const useTalentApplicantSkills = getTalentProfileApplicantSkillsHook(talentId)

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
          talentOrVerticalId: talentId,
          term,
          ...otherOptions
        }),
      searchOptions: skillOptions,
      loadingOptions: loadingApplicationSkills
    })

  const onOtherOptionSelect = useCallback(
    (newValue: string) =>
      setSelectedSkills(
        selectedSkills
          ? [...selectedSkills, { text: newValue, value: newValue }]
          : [{ text: newValue, value: newValue }]
      ),
    [selectedSkills]
  )

  const handleChange = useCallback(
    async (
      key: keyof UpdateTalentApplicantSkillsInput,
      values: Partial<UpdateTalentApplicantSkillsInput>
    ) => {
      const value = values[key]

      if (deepEqual(value, prepareApplicantSkills(applicantSkills))) {
        return
      }

      const applicantSkillIds = parseApplicantSkills(selectedSkills)
      const newApplicantSkillNames = parseNewApplicantSkillNames(selectedSkills)

      const { data } = await updateTalentApplicantSkills({
        variables: {
          input: { applicantSkillIds, talentId, newApplicantSkillNames }
        }
      })

      return handleMutationResult({
        mutationResult: data?.updateTalentApplicantSkills
      })
    },
    [
      selectedSkills,
      applicantSkills,
      handleMutationResult,
      talentId,
      updateTalentApplicantSkills
    ]
  )

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
    [selectedSkills, search, setSearchTerm]
  )

  return (
    <EditableField<UpdateTalentApplicantSkillsInput, Item[]>
      onChange={handleChange}
      value={selectedSkills}
      name='applicantSkillIds'
      queryValue={useTalentApplicantSkills}
      editor={({ onReset, ...props }) => (
        <InlineTagSelector
          {...props}
          loading={searching}
          onInputChange={handleInputChange}
          getDisplayValue={getSkillName}
          inputValue={searchTerm}
          setSelectedValues={setSelectedSkills}
          options={searchOptions}
          showOtherOption
          onOtherOptionSelect={onOtherOptionSelect}
          onReset={() => {
            setSelectedSkills(prepareApplicantSkills(applicantSkills))
            onReset?.()
          }}
          width='full'
        />
      )}
      viewer={
        <Tag.Group>
          {applicantSkills?.nodes.map(({ name, id }) => (
            <Tag key={id} titleCase>
              {name}
            </Tag>
          ))}
        </Tag.Group>
      }
    />
  )
}

export default ApplicantSkillsField
