import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import {
  TalentInfractionFragment,
  TalentInfractionItem
} from '@staff-portal/talents-infractions'

import * as S from './styles'

interface Props {
  infractions: TalentInfractionFragment[]
  refetch: () => void
}

const InfractionItems = ({ infractions, refetch }: Props) => {
  if (infractions.length === 0) {
    return <Typography size='medium'>No infractions were added yet.</Typography>
  }

  return (
    <Container css={S.container} data-testid='talent-infractions-items'>
      {infractions.map(infraction => (
        <TalentInfractionItem
          key={infraction.id}
          infraction={infraction}
          onRemove={refetch}
        />
      ))}
    </Container>
  )
}

export default InfractionItems
