import React from 'react'
import { Container, TypographyOverflow } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { Operation } from '@staff-portal/graphql/staff'

import DiscardRecordingButton from './components/DiscardRecordingButton'

export type Props = {
  talentId: string
  prescreeningRecordingUrl: string
  operation: Operation
  isBeingProcessed: boolean
}

export const PrescreeningRecordingField = ({
  talentId,
  prescreeningRecordingUrl,
  operation,
  isBeingProcessed = false
}: Props) => {
  return (
    <Container
      flex
      justifyContent='space-between'
      data-testid='prescreening-recording-field'
    >
      {isBeingProcessed ? (
        <TypographyOverflow>
          The recording is being processed. It may take several minutes.
        </TypographyOverflow>
      ) : (
        <Link target='_blank' href={prescreeningRecordingUrl}>
          Play recording in a new tab
        </Link>
      )}
      <DiscardRecordingButton talentId={talentId} operation={operation} />
    </Container>
  )
}

export default PrescreeningRecordingField
