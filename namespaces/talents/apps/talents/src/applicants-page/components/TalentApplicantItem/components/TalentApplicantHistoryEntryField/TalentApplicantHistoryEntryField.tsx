import React from 'react'
import { Typography, SkeletonLoader } from '@toptal/picasso'
import {
  HistoryEntryComment,
  HistoryEntryContent,
  usePerformedActionsQuery
} from '@staff-portal/chronicles'
import { decodeEntityId } from '@staff-portal/data-layer-service'

type HistoryEntryFieldProps = {
  talentId: string
}

const TalentApplicantHistoryEntryField = ({
  talentId
}: HistoryEntryFieldProps) => {
  const { data: entries, loading } = usePerformedActionsQuery(
    {
      limit: 1,
      feeds: [
        [`gid://platform/Talent/${decodeEntityId(talentId).id}`],
        ['screening']
      ]
    },
    {}
  )

  const entry = entries?.[0]

  if (loading && !entry) {
    return <SkeletonLoader.Typography />
  }

  if (!entry) {
    return null
  }

  const { literals, performedAction } = entry
  const hasComment = !!performedAction.comment

  return (
    <>
      <Typography size='medium' as='div'>
        <HistoryEntryContent literals={literals} />
        {hasComment ? ' with comment:' : ''}
      </Typography>
      {hasComment && (
        <Typography size='medium' as='div'>
          <HistoryEntryComment
            comment={performedAction.comment}
            escapeHtml={Boolean(performedAction.performerGID)}
          />
        </Typography>
      )}
    </>
  )
}

export default TalentApplicantHistoryEntryField
