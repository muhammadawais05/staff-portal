import React from 'react'
import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteHighlightOption
} from '@staff-portal/ui'
import { FieldWrapper, useForm } from '@toptal/picasso-forms'
import { useDebouncedAutocomplete } from '@staff-portal/utils'

import { BookingObjectFragment } from './data/get-booking-objects-autocomplete'
import { useGetBookingObjectsAutocomplete } from './data'

export interface Props {
  initialSearchTerm: string
  autoFocus?: boolean
}

const BookingObjectField = ({ initialSearchTerm, autoFocus }: Props) => {
  const form = useForm()

  const {
    getBookingObjects,
    data: bookingObjects,
    loading: loadingBookingObjects
  } = useGetBookingObjectsAutocomplete()

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
      getBookingObjects({ term })
    },
    searchOptions: bookingObjects,
    loadingOptions: loadingBookingObjects,
    initialSearchTerm
  })

  return (
    <FieldWrapper
      autoFocus={autoFocus}
      name='bookingObjectId'
      label='Handle Via'
      required
    >
      {(props: AutocompleteProps) => (
        <Autocomplete<BookingObjectFragment>
          {...props}
          width='full'
          data-lpignore
          loading={searching}
          options={searchOptions}
          value={searchTerm}
          getKey={(item: BookingObjectFragment) => item.node?.id}
          enableReset={false}
          renderOption={({ label, labelHighlight, nodeTypes }) => (
            <AutocompleteHighlightOption
              label={label as string}
              labelHighlight={labelHighlight as string}
              nodeTypes={nodeTypes as string[]}
            />
          )}
          onChange={(term, { isSelected }) => {
            setSearchTerm(term)

            if (!isSelected) {
              search(term)
            }
          }}
          onSelect={({ node, label }) => {
            if (label && node?.id) {
              selectItem(label)
              form.change('bookingObjectId', node.id)
            }
          }}
          onBlur={setToLastValidTerm}
        />
      )}
    </FieldWrapper>
  )
}

export default BookingObjectField
