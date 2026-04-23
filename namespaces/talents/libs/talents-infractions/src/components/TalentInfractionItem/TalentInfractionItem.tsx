import React from 'react'
import { Container } from '@toptal/picasso'

import { TalentInfractionFragment } from '../../data/talent-infraction-fragment'
import TalentInfractionContent from '../TalentInfractionContent'
import TalentInfractionTitle from '../TalentInfractionTitle'

interface InfractionItemProps {
  infraction: TalentInfractionFragment
  onRemove: () => void
}

const TalentInfractionItem = ({
  infraction,
  onRemove
}: InfractionItemProps) => {
  return (
    <Container>
      <TalentInfractionTitle infraction={infraction} onRemove={onRemove} />
      <TalentInfractionContent infraction={infraction} />
    </Container>
  )
}

export default TalentInfractionItem
