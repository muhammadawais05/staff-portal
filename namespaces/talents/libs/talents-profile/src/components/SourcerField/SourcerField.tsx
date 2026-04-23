import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { NO_VALUE } from '@staff-portal/config'
import { getTalentProfilePath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { TalentProfileOperationsFragment } from '@staff-portal/talents'

import { TalentProfileGeneralDataFragment } from '../TalentGeneralSection/data/get-talent-profile-general-data'
import ChangeSourcerButton from './components/ChangeSourcerButton'

const getSourcerUrl = (
  sourcer?: TalentProfileGeneralDataFragment['sourcer']
) => {
  if (!sourcer?.webResource.url) {
    return null
  }

  return sourcer.__typename === 'Talent'
    ? getTalentProfilePath(decodeEntityId(sourcer.id).id)
    : sourcer.webResource.url
}

export type Props = Pick<TalentProfileGeneralDataFragment, 'id' | 'sourcer'> & {
  changeTalentSourcerOperation: TalentProfileOperationsFragment['changeTalentSourcer']
}

const SourcerField = ({ id, sourcer, changeTalentSourcerOperation }: Props) => {
  const sourcerUrl = getSourcerUrl(sourcer)

  const fieldValue = (
    <Container flex justifyContent='space-between'>
      <Typography size='medium'>
        {sourcerUrl ? (
          <Link href={sourcerUrl}>{sourcer?.webResource.text}</Link>
        ) : (
          NO_VALUE
        )}
      </Typography>
      <ChangeSourcerButton
        talentId={id}
        operation={changeTalentSourcerOperation}
      />
    </Container>
  )

  return fieldValue
}

export default SourcerField
