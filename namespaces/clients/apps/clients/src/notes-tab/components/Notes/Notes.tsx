import { Container } from '@toptal/picasso'
import React from 'react'

import DraftJobSection from '../DraftJobSection'
import NoteSection from '../NoteSection'

export interface Props {
  companyId: string
  companyName: string
}

const Notes = ({ companyId, companyName }: Props) => {
  return (
    <Container>
      <DraftJobSection companyId={companyId} />

      <NoteSection companyId={companyId} companyName={companyName} />
    </Container>
  )
}

export default Notes
