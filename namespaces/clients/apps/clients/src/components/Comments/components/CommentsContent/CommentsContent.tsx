import React, { useMemo } from 'react'
import { Helpbox, Container, SectionProps } from '@toptal/picasso'
import { ApolloError } from '@staff-portal/data-layer-service'
import { Entry, HistoryList } from '@staff-portal/chronicles'

import { GetCommentsQuery } from '../../data'
import CommentsSection from '../CommentsSection'
import {
  appendWithCommentLiteral,
  getIsCommentsSectionCollapsedByDefault
} from '../../utils'

type CommentsNode = Exclude<GetCommentsQuery['node'], undefined | null>

interface Props {
  cumulativeStatus?: CommentsNode['cumulativeStatus']
  comments: Entry[]
  error?: ApolloError
  sectionVariant?: SectionProps['variant']
}

const CommentsContent = ({
  cumulativeStatus,
  error,
  comments,
  sectionVariant
}: Props) => {
  const isSectionCollapsedByDefault = useMemo(
    () => getIsCommentsSectionCollapsedByDefault(cumulativeStatus),
    [cumulativeStatus]
  )

  const entries = useMemo(() => appendWithCommentLiteral(comments), [comments])

  return (
    <CommentsSection
      defaultCollapsed={isSectionCollapsedByDefault}
      sectionVariant={sectionVariant}
    >
      {error && (
        <Container bottom='small'>
          <Helpbox>
            <Helpbox.Content>{error.message}</Helpbox.Content>
          </Helpbox>
        </Container>
      )}

      <Container>
        <HistoryList entries={entries} defaultExpanded />
      </Container>
    </CommentsSection>
  )
}

export default CommentsContent
