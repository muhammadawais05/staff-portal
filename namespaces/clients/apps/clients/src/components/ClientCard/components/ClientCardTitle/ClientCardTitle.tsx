import React from 'react'
import { TypographyOverflow, Typography, Container } from '@toptal/picasso'
import { LinkWrapper, TypographyOverflowLink } from '@staff-portal/ui'
import { ClientFragment } from '@staff-portal/clients'
import { getClientProfilePath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'

import { ClientCardBadges } from '../ClientCardBadges'

export interface Props {
  client: ClientFragment
}

export const ClientCardTitle = ({ client }: Props) => {
  const { id, fullName: companyName, pendingCallbackRequest } = client

  const title = pendingCallbackRequest ? '(Pending Call Request)' : undefined

  const companyLink = getClientProfilePath(decodeEntityId(id).id)

  return (
    <Container flex alignItems='center'>
      <TypographyOverflowLink>
        <LinkWrapper
          wrapWhen={Boolean(companyLink)}
          href={companyLink as string}
        >
          <TypographyOverflow
            size='medium'
            weight='semibold'
            color='inherit'
            as='span'
            data-testid='CompanyApplicantTitle'
          >
            {companyName}
          </TypographyOverflow>
        </LinkWrapper>
      </TypographyOverflowLink>
      {title && (
        <Container left='xsmall'>
          <Typography size='small'>{title}</Typography>
        </Container>
      )}
      <Container left='xsmall'>
        <ClientCardBadges client={client} />
      </Container>
    </Container>
  )
}
