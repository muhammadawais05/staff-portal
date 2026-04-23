import React from 'react'
import { Maybe } from '@staff-portal/graphql/staff'
import { Typography } from '@toptal/picasso'

import BaseEmailComposerField from '../BaseEmailComposerField/BaseEmailComposerField'
import * as S from './styles'

export type Props = {
  senderId?: Maybe<string>
  claimerId?: Maybe<string>
  clientPartnerId?: Maybe<string>
  claimerSignOff?: Maybe<string>
  clientPartnerSignOff?: Maybe<string>
}

const SignatureField = ({
  senderId,
  claimerId,
  clientPartnerId,
  claimerSignOff,
  clientPartnerSignOff
}: Props) => {
  const signature =
    senderId === claimerId
      ? claimerSignOff
      : senderId === clientPartnerId
      ? clientPartnerSignOff
      : undefined

  if (!signature) {
    return null
  }

  return (
    <BaseEmailComposerField label='Signature'>
      <Typography size='small' weight='semibold' as='div'>
        <div
          css={S.signatureField}
          dangerouslySetInnerHTML={{ __html: signature }}
        />
      </Typography>
    </BaseEmailComposerField>
  )
}

export default SignatureField
