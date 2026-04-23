import React from 'react'
import { useForm, FieldWrapper } from '@toptal/picasso-forms'
import { ChangedOptions, Item } from '@toptal/picasso/Autocomplete'
import { DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT } from '@staff-portal/config'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { Autocomplete, AutocompleteHighlightOption } from '@staff-portal/ui'
import { useDebouncedAutocomplete } from '@staff-portal/utils'

import { useGetJobsWithSourcingRequestsAutocomplete , JobAutocompleteEdgeFragment } from './get-jobs-with-sourcing-requests-autocomplete'


const getKey = (item: JobAutocompleteEdgeFragment) => item.node?.id

const getDisplayValue = (skill: JobAutocompleteEdgeFragment | null) =>
  skill?.label ?? ''

const renderJobOption = (item: Item) => {
  const { label, labelHighlight, node } = item as JobAutocompleteEdgeFragment

  return (
    <AutocompleteHighlightOption
      labelHighlight={labelHighlight}
      label={label}
      nodeTypes={node ? [`Job #${decodeEntityId(node.id).id}`] : undefined}
    />
  )
}

const JobWithSourcingRequestInput = () => {
  const form = useForm()

  const {
    getJobsWithSourcingRequests,
    data: jobs,
    loading: loadingJobs
  } = useGetJobsWithSourcingRequestsAutocomplete()

  const { search, searching, searchTerm, setSearchTerm, searchOptions } =
    useDebouncedAutocomplete<JobAutocompleteEdgeFragment>({
      onSearch: (term: string) => {
        getJobsWithSourcingRequests({ term })
      },
      searchOptions: jobs,
      loadingOptions: loadingJobs
    })

  const onChangeHandle = (term: string, { isSelected }: ChangedOptions) => {
    setSearchTerm(term)

    if (!isSelected) {
      search(term)
    }

    if (term === '') {
      form.change('jobId', null)
    }
  }

  const onSelectHandle = ({
    node: selectedJob,
    label
  }: JobAutocompleteEdgeFragment) => {
    setSearchTerm(label as string)

    if (selectedJob) {
      form.change('jobId', selectedJob.id)
    }
  }

  return (
    <FieldWrapper name='jobId' required label='Job ID with Sourcing Request'>
      {() => (
        <Autocomplete<JobAutocompleteEdgeFragment>
          value={searchTerm}
          width='full'
          getKey={getKey}
          loading={searching}
          getDisplayValue={getDisplayValue}
          placeholder='Type Job ID...'
          renderOption={renderJobOption}
          onSelect={onSelectHandle}
          onChange={onChangeHandle}
          options={searchOptions}
          noOptionsText={DEFAULT_AUTOCOMPLETE_NO_OPTIONS_TEXT}
        />
      )}
    </FieldWrapper>
  )
}

export default JobWithSourcingRequestInput
