import { Container, Typography } from '@toptal/picasso'
import React, { Fragment } from 'react'
import { LinkWrapper } from '@staff-portal/ui'
import { WebResourceFragment } from '@staff-portal/facilities'

export interface Props {
  contacts: WebResourceFragment[]
}

// TODO: extract into a reusable list wrapper
const ActivityContacts = ({ contacts }: Props) => {
  return (
    <Container inline>
      {contacts.map(({ webResource: { url, text } }, index) => (
        <Fragment key={`${url}-${text}`}>
          <LinkWrapper
            wrapWhen={Boolean(url)}
            href={url || undefined}
            target='_blank'
          >
            <Typography inline color='inherit'>
              {text}
            </Typography>
          </LinkWrapper>
          {index < contacts.length - 2 && ', '}
          {index === contacts.length - 2 && ' and '}
        </Fragment>
      ))}
    </Container>
  )
}

export default ActivityContacts
