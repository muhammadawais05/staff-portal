import React, { useMemo } from 'react'
import { Container, ShowMore, Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { getRequestPath } from '@staff-portal/routes'
import { GigFragment } from '@staff-portal/talents-gigs'

import { RequestActions, RequestDetails, SkillsList } from '../../components'
import * as S from './styles'

type Props = {
  request: GigFragment
  currentUserId?: string
}

const RequestsListItem = ({ request, currentUserId }: Props) => {
  const href = useMemo(() => getRequestPath(request.id as string), [request.id])

  return (
    <Container data-testid='p2p-request'>
      <Container
        bottom='small'
        flex
        alignItems='flex-start'
        justifyContent='space-between'
      >
        <Link
          href={href as string}
          data-testid={`request-link-${request.id}`}
          css={S.title}
        >
          <Typography color='inherit' size='medium' weight='semibold'>
            {request.title}
          </Typography>
        </Link>
        <RequestActions request={request} currentUserId={currentUserId} />
      </Container>
      <Container bottom='small'>
        {request.description && (
          <ShowMore rows={2} css={S.description}>
            {request.description}
          </ShowMore>
        )}
      </Container>
      <SkillsList skills={request.skills} editMode={false} padded />
      <RequestDetails request={request} />
    </Container>
  )
}

export default RequestsListItem
