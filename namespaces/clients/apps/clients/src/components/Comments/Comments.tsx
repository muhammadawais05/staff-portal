import React, { memo } from 'react'
import { CHRONICLES_DEFAULT_POLL_INTERVAL } from '@staff-portal/config'
import { useGetNode } from '@staff-portal/data-layer-service'
import { ContainerLoader } from '@staff-portal/ui'
import { Container } from '@toptal/picasso'
import { usePerformedActionsQuery } from '@staff-portal/chronicles'

import { GetCommentsDocument } from './data'
import CommentsContent from './components/CommentsContent'
import CommentsSkeleton from './components/CommentsSkeleton'
import { getCommentsFeedsParameter, isCommentsSectionVisible } from './utils'

export const LIMIT = 50

interface Props {
  companyId: string
}

const Comments = memo(({ companyId }: Props) => {
  const { data: commentsInfo, loading: loadingCommentsInfo } = useGetNode(
    GetCommentsDocument
  )({
    clientId: companyId
  })

  const feeds = getCommentsFeedsParameter(companyId)

  const {
    data: comments,
    loading: loadingComments,
    error
  } = usePerformedActionsQuery(
    { limit: LIMIT, feeds },
    { pollInterval: CHRONICLES_DEFAULT_POLL_INTERVAL }
  )

  const { commentsAccessible, cumulativeStatus } = commentsInfo ?? {
    commentsAccessible: false
  }

  const visible = isCommentsSectionVisible({
    loadingAccessInfo: loadingCommentsInfo,
    areCommentsAccessible: !!commentsAccessible,
    loadingComments,
    comments
  })

  if (!visible) {
    return null
  }

  return (
    <Container top='medium'>
      <ContainerLoader
        loading={false}
        showSkeleton={loadingCommentsInfo || loadingComments}
        skeletonComponent={<CommentsSkeleton />}
      >
        <CommentsContent
          sectionVariant='withHeaderBar'
          cumulativeStatus={cumulativeStatus}
          comments={comments}
          error={error}
        />
      </ContainerLoader>
    </Container>
  )
})

export default Comments
