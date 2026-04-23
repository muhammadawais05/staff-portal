import { Container, Typography } from '@toptal/picasso'
import { Email16 } from '@toptal/picasso/Icon'
import React, { Fragment, memo } from 'react'
import { Link } from '@staff-portal/navigation'
import { SimpleHtmlFormatter } from '@staff-portal/string'
import { HistoryEntryRow } from '@staff-portal/chronicles'

import { EmailFragmentWithUsers, EmailUser, TimelineRecord } from '../../types'
import * as S from './styles'

export type Props = {
  entry: TimelineRecord<EmailFragmentWithUsers>
  expanded: boolean
  hasConnector: boolean
  onExpandClick: (id: string) => void
}

const UserLink = ({ user }: { user?: EmailUser | null }) => {
  if (!user) {
    return null
  }

  if (!user.webResource) {
    return <Typography as='span'>{user.email}</Typography>
  }

  return (
    <Link href={user.webResource.url || ''} target='_blank'>
      {user.fullName}
    </Link>
  )
}

const CommunicationRecord = ({
  entry: {
    id,
    date,
    entity: { fromUser, toUsers, body, subject }
  },
  expanded,
  hasConnector,
  onExpandClick
}: Props) => (
  <HistoryEntryRow
    id={id}
    icon={<Email16 />}
    date={date}
    content={[
      <Fragment key='to'>
        <UserLink user={fromUser} />
        <Typography as='span'>{' to '}</Typography>
        {toUsers.map((toUser, index) => (
          <Fragment key={toUser?.id}>
            {index > 0 && ', '}
            <UserLink user={toUser} />
          </Fragment>
        ))}
      </Fragment>
    ]}
    comment={
      <Container padded='small' rounded variant='blue'>
        <Typography css={S.emailSubject} weight='semibold'>
          {subject}
        </Typography>
        <Container css={S.emailContent} top='xsmall'>
          <SimpleHtmlFormatter removeReplies text={body ?? ''} />
        </Container>
      </Container>
    }
    expanded={expanded}
    hasConnector={hasConnector}
    onExpandClick={onExpandClick}
  />
)

export default memo(CommunicationRecord)
