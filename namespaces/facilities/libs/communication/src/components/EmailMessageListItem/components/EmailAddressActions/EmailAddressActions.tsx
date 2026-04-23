import React, { useState } from 'react'
import { Tooltip, Button, Container, Typography } from '@toptal/picasso'
import { ClickAwayListener } from '@toptal/picasso/utils'
import { useModal } from '@staff-portal/modals-service'

import BlacklistEmailModal from '../BlacklistEmailModal'
import AssociateUserModal from '../AssociateUserModal'
import EmailAddressBlacklisted from '../EmailAddressBlacklisted'
import * as S from './styles'

export interface Props {
  emailAddress: string
  path?: string
  blacklisted: boolean
}

const EmailAddressActions = ({ blacklisted, emailAddress }: Props) => {
  const { showModal: showAssociateUserModal } = useModal(AssociateUserModal, {
    emailAddress
  })

  const { showModal: showBlacklistEmailModal } = useModal(BlacklistEmailModal, {
    emailAddress
  })

  const [emailManipulationTooltipIsShown, setEmailManipulationTooltipIsShown] =
    useState(false)

  const openEmailManipulationTooltip = () =>
    setEmailManipulationTooltipIsShown(true)
  const closeEmailManipulationTooltip = () =>
    setEmailManipulationTooltipIsShown(false)

  if (blacklisted) {
    return <EmailAddressBlacklisted emailAddress={emailAddress} />
  }

  const emailManipulationTooltipContent = (
    <Container>
      <Button
        size='small'
        onClick={() => {
          closeEmailManipulationTooltip()
          showAssociateUserModal()
        }}
        variant='primary'
        data-testid='associate-user'
      >
        Associate user
      </Button>
      <Button
        size='small'
        onClick={() => {
          closeEmailManipulationTooltip()
          showBlacklistEmailModal()
        }}
        variant='negative'
        data-testid='blacklist-email'
      >
        Blacklist email
      </Button>
    </Container>
  )

  return (
    <>
      <ClickAwayListener onClickAway={closeEmailManipulationTooltip}>
        <Container inline>
          <Tooltip
            open={emailManipulationTooltipIsShown}
            interactive
            content={emailManipulationTooltipContent}
          >
            <Typography
              css={S.withPointerCursor}
              underline='dashed'
              onClick={openEmailManipulationTooltip}
              data-testid='email-unknown'
            >
              {emailAddress}
            </Typography>
          </Tooltip>
        </Container>
      </ClickAwayListener>
    </>
  )
}

export default EmailAddressActions
