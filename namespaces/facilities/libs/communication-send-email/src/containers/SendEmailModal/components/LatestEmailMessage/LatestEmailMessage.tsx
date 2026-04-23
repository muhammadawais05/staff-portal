import React from 'react'
import { Container } from '@toptal/picasso'
import {
  getEmailMessagePath,
  getRoleEmailMessagePath
} from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import {
  EmailMessageListItem,
  EmailMessageWithUsers
} from '@staff-portal/communication'

import { RoleRecipientFragment } from '../../data/fragments'

const ROLE_URL_MAPPING: Record<RoleRecipientFragment['__typename'], string> = {
  Staff: 'staff',
  Talent: 'talents',
  CompanyRepresentative: 'company_representatives',
  Leader: 'leaders',
  TalentPartner: 'talent_partners',
  ReferralPartner: 'referral_partners'
}

const getEmailMessageLinkPath = (
  emailMessageId: string,
  roleRecipient: RoleRecipientFragment
) => {
  if (!roleRecipient) {
    return getEmailMessagePath(emailMessageId)
  }

  const { id } = decodeEntityId(roleRecipient.id)

  return getRoleEmailMessagePath(
    ROLE_URL_MAPPING[roleRecipient.__typename],
    id,
    emailMessageId
  )
}

export interface Props {
  emailMessageWithUsers: EmailMessageWithUsers
  roleRecipient: RoleRecipientFragment
}

const LatestEmailMessage = ({
  emailMessageWithUsers,
  roleRecipient
}: Props) => {
  const emailLinkPath = getEmailMessageLinkPath(
    emailMessageWithUsers.id,
    roleRecipient
  )

  return (
    <Container top='small'>
      <EmailMessageListItem
        isLatest
        roleId={roleRecipient.id}
        title={emailMessageWithUsers.subject}
        emailMessageWithUsers={emailMessageWithUsers}
        path={emailLinkPath}
      />
    </Container>
  )
}

export default LatestEmailMessage
