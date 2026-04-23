import { Button, Container } from '@toptal/picasso'
import { Pencil16, Close16, Check16 } from '@toptal/picasso/Icon'
import { Form, FieldWrapper } from '@toptal/picasso-forms'
import { ChangedOptions } from '@toptal/picasso/Autocomplete'
import { useNotifications } from '@toptal/picasso/utils'
import React, { useState, ChangeEvent } from 'react'
import { NO_VALUE } from '@staff-portal/config'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteHighlightOptionWithPhoto
} from '@staff-portal/ui'
import { useDebouncedAutocomplete } from '@staff-portal/utils'

import {
  useGetMeetingAttendeesAutocomplete,
  useAssignAttendee,
  MeetingAttendeeAutocompleteEdgeFragment
} from './data'

const ERROR_MESSAGE = 'Unable to assign attendee.'

type FormAutocompleteProps = Omit<AutocompleteProps, 'onChange'> & {
  onChange: (value: string) => void
}

interface AssignMeetingAttendeeForm {
  attendeeId: string
}

export interface Props {
  meetingId: string
}

const getKey = (item: MeetingAttendeeAutocompleteEdgeFragment) => item.node?.id

const renderAttendeeOption = ({
  label,
  labelHighlight,
  nodeTypes,
  photo
}: MeetingAttendeeAutocompleteEdgeFragment) => {
  return (
    <AutocompleteHighlightOptionWithPhoto
      label={label}
      labelHighlight={labelHighlight}
      nodeTypes={nodeTypes}
      photo={photo?.thumb}
    />
  )
}

const MeetingAttendeeField = ({ meetingId }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [isEditMode, setIsEditMode] = useState(false)

  const {
    getMeetingAttendees,
    data: meetingAttendees,
    loading: loadingMeetingAttendees
  } = useGetMeetingAttendeesAutocomplete()

  const { search, searching, searchTerm, setSearchTerm, searchOptions } =
    useDebouncedAutocomplete({
      onSearch: (term: string) => {
        getMeetingAttendees({ term })
      },
      searchOptions: meetingAttendees,
      loadingOptions: loadingMeetingAttendees
    })

  const [assignAttendee] = useAssignAttendee({
    onError: () => showError(ERROR_MESSAGE)
  })

  const handleFocus = (event: ChangeEvent<{ select: () => void }>) =>
    event.target.select()

  const handleChange = (
    term: string,
    { isSelected }: ChangedOptions,
    props: FormAutocompleteProps
  ) => {
    setSearchTerm(term)
    props.onChange('')

    if (!isSelected) {
      search(term)
    }
  }

  const handleSelect = (
    { node, label }: MeetingAttendeeAutocompleteEdgeFragment,
    props: FormAutocompleteProps
  ) => {
    setSearchTerm(label as string)

    if (node) {
      props.onChange(node.id)
    }
  }

  const handleEdit = () => {
    setIsEditMode(true)
  }

  const handleSubmit = async ({ attendeeId }: AssignMeetingAttendeeForm) => {
    const { data } = await assignAttendee({
      variables: { meetingId, attendeeId }
    })

    const attendeeName =
      data?.assignMeetingAttendee?.meeting?.attendee?.webResource.text

    return handleMutationResult({
      mutationResult: data?.assignMeetingAttendee,
      successNotificationMessage: `${attendeeName} was successfully assigned to meeting.`
    })
  }

  const handleCancel = () => {
    setSearchTerm('')
    setIsEditMode(false)
  }

  if (!isEditMode) {
    return (
      <>
        {NO_VALUE}
        <Button.Circular
          variant='flat'
          icon={<Pencil16 />}
          onClick={handleEdit}
          aria-label='Edit Note'
        />
      </>
    )
  }

  return (
    <Form<AssignMeetingAttendeeForm> onSubmit={handleSubmit}>
      <Container flex>
        <FieldWrapper name='attendeeId' required>
          {(props: FormAutocompleteProps) => (
            <Autocomplete<MeetingAttendeeAutocompleteEdgeFragment>
              {...props}
              loading={searching}
              value={searchTerm}
              testIds={{
                input: 'autocomplete'
              }}
              options={searchOptions}
              getKey={getKey}
              enableReset={false}
              renderOption={renderAttendeeOption}
              onFocus={handleFocus}
              onChange={(term, options) => handleChange(term, options, props)}
              onSelect={selectedUser => handleSelect(selectedUser, props)}
              noOptionsText='No results'
            />
          )}
        </FieldWrapper>
        <Container left='small' flex alignItems='center'>
          <Container>
            <Form.SubmitButton
              data-testid='meeting-attendee-field-submit-button'
              buttonType='circular'
              variant='flat'
              size='small'
              aria-label='Approve'
              icon={<Check16 />}
            />
          </Container>
          <Container left='xsmall'>
            <Button.Circular
              variant='flat'
              icon={<Close16 />}
              onClick={handleCancel}
              aria-label='Cancel'
            />
          </Container>
        </Container>
      </Container>
    </Form>
  )
}

export default MeetingAttendeeField
