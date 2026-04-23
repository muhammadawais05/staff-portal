import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Pencil16, Trash16 } from '@toptal/picasso/Icon'
import { Link } from '@staff-portal/navigation'
import { isOperationHidden } from '@staff-portal/operations'

import { TalentInfractionFragment } from '../../data/talent-infraction-fragment'
import {
  useTalentInfractionEditModal,
  useTalentInfractionRemoveModal
} from '../../hooks'
import * as S from './styles'

interface Props {
  infraction: TalentInfractionFragment
  onRemove: () => void
}

const TalentInfractionTitle = ({ infraction, onRemove }: Props) => {
  const { changeInfraction, removeInfraction } = infraction.operations
  const {
    showModal: showRemoveInfractionModal,
    renderModal: renderRemoveInfractionModal
  } = useTalentInfractionRemoveModal({
    infractionId: infraction.id,
    onRemove
  })
  const {
    showModal: showEditTalentInfractionModal,
    renderModal: renderEditTalentInfractionModal
  } = useTalentInfractionEditModal(infraction)

  return (
    <>
      <Container flex justifyContent='space-between' css={{ width: '100%' }}>
        <Container left='small' bottom='xsmall'>
          <Typography variant='heading' size='small'>
            {infraction.summary}
          </Typography>
        </Container>

        <Container css={S.actionsContainer}>
          {!isOperationHidden(changeInfraction) && (
            <Link
              onClick={showEditTalentInfractionModal}
              data-testid='edit-infraction'
              // TODO: never worked as expected
              // disabled={isOperationDisabled(changeInfraction)}
            >
              <Pencil16 color='dark-grey' />
            </Link>
          )}

          {!isOperationHidden(removeInfraction) && (
            <Link
              onClick={showRemoveInfractionModal}
              data-testid='delete-infraction'
              // TODO: never worked as expected
              // disabled={isOperationDisabled(removeInfraction)}
            >
              <Trash16 color='red' />
            </Link>
          )}
        </Container>
      </Container>
      {renderRemoveInfractionModal()}
      {renderEditTalentInfractionModal()}
    </>
  )
}

export default TalentInfractionTitle
