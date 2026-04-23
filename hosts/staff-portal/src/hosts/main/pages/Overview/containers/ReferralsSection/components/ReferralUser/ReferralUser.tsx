import React from 'react'
import { UserBadge, TypographyOverflow } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'

import { ReferralFragment } from '../../data/referred-role-edge-fragment/referred-role-edge-fragment.staff.gql.types'

interface Props {
  referral: ReferralFragment
}

const ReferralUser = ({
  referral: {
    webResource: { text, url },
    photo
  }
}: Props) => {
  return (
    <UserBadge
      name={text}
      avatar={photo?.thumb}
      renderName={name => (
        <LinkWrapper wrapWhen={Boolean(url)} href={url as string}>
          <TypographyOverflow
            size='medium'
            weight='semibold'
            color='inherit'
            as='span'
          >
            {name}
          </TypographyOverflow>
        </LinkWrapper>
      )}
    />
  )
}

export default ReferralUser
