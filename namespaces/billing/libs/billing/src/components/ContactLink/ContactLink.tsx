import { TypographyOverflow } from '@toptal/picasso'
import React, { FC, ReactElement, memo } from 'react'
import { Maybe } from '@staff-portal/graphql/staff'

import { EMPTY_DATA } from '../../_lib/helpers'
import LinkWrapper from '../LinkWrapper'
import { WebResourceFragment } from '../../__fragments__/webResourceFragment.graphql.types'

const displayName = 'ContactLink'

interface Props {
  contact?: Maybe<{
    fullName: string
    webResource: WebResourceFragment
  }>
  emptyState?: ReactElement
  'data-testid'?: string
}

const ContactLink: FC<Props> = memo<Props>(
  ({ contact, emptyState = EMPTY_DATA, ...rest }) => {
    const testId = rest['data-testid'] || displayName

    if (!contact) {
      return <span data-testid={`${testId}-empty`}>{emptyState}</span>
    }

    const { webResource, fullName } = contact

    return (
      <LinkWrapper
        href={webResource?.url}
        target='_blank'
        data-testid={`${testId}-link`}
      >
        <TypographyOverflow color='inherit'>{fullName}</TypographyOverflow>
      </LinkWrapper>
    )
  }
)

ContactLink.displayName = displayName

export default ContactLink
