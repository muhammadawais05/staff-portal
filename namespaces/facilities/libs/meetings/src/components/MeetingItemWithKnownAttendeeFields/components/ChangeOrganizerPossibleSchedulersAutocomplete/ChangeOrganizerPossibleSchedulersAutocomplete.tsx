import React from 'react'
import {
  Autocomplete,
  AutocompleteHighlightOption,
  AutocompleteProps
} from '@staff-portal/ui'
import { FieldWrapper, useForm } from '@toptal/picasso-forms'
import { useDebouncedAutocomplete } from '@staff-portal/utils'

import { SchedulerForTransferFragment } from '../../data/scheduler-for-transfer-fragment'
import { PossibleSchedulerFragment } from './data/get-possible-schedulers-autocomplete'
import { useGetPossibleSchedulersAutocomplete } from './data'

interface Props {
  meetingId: string
  onSelect: (scheduler: SchedulerForTransferFragment) => void
}

const getSchedulerLabel = ({
  code,
  role: { fullName }
}: SchedulerForTransferFragment) => `${fullName} - ${code}`

const ChangeOrganizerPossibleSchedulersAutocomplete = ({
  meetingId,
  onSelect
}: Props) => {
  const { change } = useForm()

  const {
    getPossibleSchedulers,
    data: possibleSchedulers,
    loading
  } = useGetPossibleSchedulersAutocomplete(meetingId)

  const {
    search,
    searching,
    searchTerm,
    setSearchTerm,
    searchOptions,
    setToLastValidTerm,
    selectItem
  } = useDebouncedAutocomplete({
    onSearch: (term: string) => {
      getPossibleSchedulers({ term })
    },
    searchOptions: possibleSchedulers,
    loadingOptions: loading
  })

  const handleSchedulerSelect = (scheduler: SchedulerForTransferFragment) => {
    change('schedulerId', scheduler.id)
    onSelect(scheduler)
  }

  return (
    <FieldWrapper name='schedulerId' label='Meeting Scheduler' required>
      {(props: AutocompleteProps) => (
        <Autocomplete<PossibleSchedulerFragment>
          {...props}
          width='full'
          data-lpignore
          placeholder='Search...'
          loading={searching}
          options={searchOptions}
          value={searchTerm}
          getKey={(item: PossibleSchedulerFragment) => item.node?.id}
          enableReset={false}
          renderOption={({ node }: PossibleSchedulerFragment) =>
            node && (
              <AutocompleteHighlightOption label={getSchedulerLabel(node)} />
            )
          }
          onChange={(term, { isSelected }) => {
            setSearchTerm(term)

            if (!isSelected) {
              search(term)
            }
          }}
          onSelect={({ node }: PossibleSchedulerFragment) => {
            if (!node) {
              return
            }

            selectItem(getSchedulerLabel(node))
            handleSchedulerSelect(node)
          }}
          onBlur={setToLastValidTerm}
        />
      )}
    </FieldWrapper>
  )
}

export default ChangeOrganizerPossibleSchedulersAutocomplete
