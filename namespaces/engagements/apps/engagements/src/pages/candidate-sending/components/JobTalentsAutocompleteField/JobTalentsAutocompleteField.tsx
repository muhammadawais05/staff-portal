import React from 'react'
import { useForm, FieldWrapper } from '@toptal/picasso-forms'
import {
  DetailedList,
  Autocomplete,
  AutocompleteProps,
  AutocompleteHighlightOptionWithPhoto
} from '@staff-portal/ui'
import { ChangedOptions } from '@toptal/picasso/Autocomplete'
import { useDebouncedAutocomplete } from '@staff-portal/utils'
import { Container, Section, Typography } from '@toptal/picasso'
import {
  useGetTalentsByNameAutocomplete,
  TalentEdgeAutocompleteFragment
} from '@staff-portal/jobs'
import { titleize } from '@staff-portal/string'
import { validators as PicassoValidators } from '@toptal/picasso-forms/utils'

import { LABEL_COLUMN_WIDTH } from '../../config'
import LabelRequiredPrefix from '../LabelRequiredPrefix/LabelRequiredPrefix'
import { useCandidateSendingContext, useGetRoleTitle } from '../../hooks'
import FieldSkeleton from '../FieldSkeleton/FieldSkeleton'

type Props = {
  jobId: string
  specializationId?: string
}

const JobTalentsAutocompleteField = ({ jobId, specializationId }: Props) => {
  const { change, getState } = useForm()
  const { talentName, setTalentName } = useCandidateSendingContext()

  const getTalentName = () => {
    if (getState().values?.talentId) {
      return talentName
    }
  }

  const { roleTitle, loading: roleTitleLoading } = useGetRoleTitle({
    jobId,
    roleTitleLowerCased: true,
    withSpecializationTitle: true
  })
  const talentRole = roleTitle && titleize(roleTitle)
  const { data, getTalentsByName, loading } = useGetTalentsByNameAutocomplete({
    jobId,
    specializationId
  })
  const {
    search,
    searching,
    searchTerm,
    setSearchTerm,
    selectItem,
    searchOptions
  } = useDebouncedAutocomplete({
    onSearch: (term: string) => getTalentsByName(term),
    searchOptions: data ?? null,
    loadingOptions: loading,
    initialSearchTerm: getTalentName()
  })
  const handleOnChange = (term: string, { isSelected }: ChangedOptions) => {
    setSearchTerm(term)

    if (!isSelected) {
      search(term)
    }

    // Handle reset button and a case when no letters left in the input
    if (!isSelected && !term.length) {
      change('talentId', undefined)
    }
  }
  const handleOnSelect = ({ node, label }: TalentEdgeAutocompleteFragment) => {
    if (node && label) {
      selectItem(label)
      setTalentName(label)
      change('talentId', node.id)
    }
  }

  if (roleTitleLoading) {
    return <FieldSkeleton />
  }

  return (
    <Section variant='withHeaderBar' title='Search Candidate'>
      <Container bottom='medium'>
        <Typography weight='semibold' size='medium'>
          Select the {talentRole} you want to send to this job:
        </Typography>
      </Container>

      <DetailedList
        striped={false}
        divided={false}
        labelColumnWidth={LABEL_COLUMN_WIDTH}
      >
        <DetailedList.Row>
          <DetailedList.Item
            label={
              <>
                <LabelRequiredPrefix />
                {talentRole}
              </>
            }
          >
            <FieldWrapper
              name='talentId'
              hint={`Start typing ${talentRole}'s name`}
              required
              validate={PicassoValidators.required}
            >
              {(props: AutocompleteProps) => (
                <Autocomplete<TalentEdgeAutocompleteFragment>
                  {...props}
                  width='full'
                  loading={searching}
                  value={searchTerm}
                  options={searchOptions}
                  getKey={(item: TalentEdgeAutocompleteFragment) =>
                    item.node?.id
                  }
                  renderOption={(item: TalentEdgeAutocompleteFragment) => (
                    <AutocompleteHighlightOptionWithPhoto
                      label={item.label}
                      nodeTypes={item.nodeTypes}
                    />
                  )}
                  onChange={handleOnChange}
                  onSelect={handleOnSelect}
                  noOptionsText='No results'
                />
              )}
            </FieldWrapper>
          </DetailedList.Item>
        </DetailedList.Row>
      </DetailedList>
    </Section>
  )
}

export default JobTalentsAutocompleteField
