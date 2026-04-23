import { Container } from '@toptal/picasso'
import { useForm } from '@toptal/picasso-forms'
import React from 'react'
import { CallParticipant } from '@staff-portal/graphql/staff'
import { EditorProps } from '@staff-portal/editable'

import UserFieldAutocomplete from '../UserFieldAutocomplete'

export interface UserFieldEditorProps
  extends EditorProps<CallParticipant, CallParticipant['fullName'], undefined> {
  [key: string]: unknown
  value: string
}

const MENU_WIDTH = '200px'

const UserFieldEditor = (
  props: EditorProps<CallParticipant, CallParticipant['fullName'], undefined>
) => {
  const form = useForm()
  const { onReset, onChange, value, ...inputProps } = props

  return (
    <Container>
      <UserFieldAutocomplete
        {...inputProps}
        menuWidth={MENU_WIDTH}
        initialDisplayValue={value ?? ''}
        width='full'
        onBlur={onReset}
        onSelect={user => {
          form.change(props.name, user.id)
          onChange()
        }}
        placeholder='Select user'
        required
      />
    </Container>
  )
}

export default UserFieldEditor
