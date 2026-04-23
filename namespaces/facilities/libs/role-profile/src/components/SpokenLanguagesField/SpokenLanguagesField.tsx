import { Container } from '@toptal/picasso'
import React from 'react'
import { NO_VALUE } from '@staff-portal/config'
import { Language } from '@staff-portal/graphql/staff'

export type Props = {
  languages: Language[]
}

const SpokenLanguagesField = ({ languages }: Props) => {
  const languageList = languages.map(lang => lang.name).join(', ')

  return (
    <Container as='span' data-testid='spoken-languages-field'>
      {languages.length ? languageList : NO_VALUE}
    </Container>
  )
}

export default SpokenLanguagesField
