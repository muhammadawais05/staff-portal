import React, { useMemo } from 'react'

import { ContactType } from '../../types'
import FormInterviewContactsSelect from '../FormInterviewContactsSelect'
import FormInterviewContactsTags from '../FormInterviewContactsTags'

export interface Props {
  availableContacts: ContactType[]
  interviewContacts: ContactType[]
}

const FormInterviewContacts = ({
  availableContacts,
  interviewContacts
}: Props) => {
  const availableContactsForSelectComponent = availableContacts
  const availableContactsForTagsComponent = useMemo(
    () => [...interviewContacts, ...availableContacts],
    [availableContacts, interviewContacts]
  )

  return (
    <>
      <FormInterviewContactsSelect
        availableContacts={availableContactsForSelectComponent}
      />
      <FormInterviewContactsTags
        availableContacts={availableContactsForTagsComponent}
      />
    </>
  )
}

export default FormInterviewContacts
