import {
  Button,
  Container,
  // eslint-disable-next-line no-restricted-imports
  Link as PicassoLink,
  Typography,
  SkeletonLoader
} from '@toptal/picasso'
import React from 'react'
import { Link } from '@staff-portal/navigation'

import { usePerformedActionsQuery } from '../../data'
import { SearchChroniclesVariables } from '../../types'
import RecentActivityListItem from '../RecentActivityListItem'
import * as S from './styles'

export interface Props extends SearchChroniclesVariables {
  fullHistoryUrl: string
}

const Loader = () => (
  <>
    {[...new Array(4)].map((_, index) => (
      // Skeleton loader, no unique identifier
      // eslint-disable-next-line react/no-array-index-key
      <Container padded='small' css={S.item} key={index}>
        <SkeletonLoader.Typography rows={2} />
        <Container top='xsmall'>
          <SkeletonLoader.Typography style={{ width: 200 }} />
        </Container>
      </Container>
    ))}
    <Container padded='medium'>
      <SkeletonLoader.Button />
    </Container>
  </>
)

const RecentActivityList = ({
  limit = 5,
  fullHistoryUrl,
  ...variables
}: Props) => {
  const {
    data: entries,
    error,
    loading,
    hasMore
  } = usePerformedActionsQuery({
    limit,
    ...variables
  })

  if (loading) {
    return <Loader />
  }

  if (error) {
    return (
      <Container padded='medium'>
        <Typography size='medium'>
          Recent activity is temporarily unable to load. Please try again later.
        </Typography>
      </Container>
    )
  }

  if (!entries.length) {
    return (
      <Container padded='medium'>
        <Typography size='medium'>No recent activity.</Typography>
      </Container>
    )
  }

  return (
    <>
      {entries.map(entry => (
        <Container padded='small' css={S.item} key={entry.performedAction.id}>
          <RecentActivityListItem
            entry={entry}
            fullHistoryUrl={fullHistoryUrl}
          />
        </Container>
      ))}

      {hasMore && (
        <Container padded='medium'>
          <Button
            as={Link as typeof PicassoLink}
            variant='secondary'
            fullWidth
            href={fullHistoryUrl}
          >
            Show Full History
          </Button>
        </Container>
      )}
    </>
  )
}

RecentActivityList.displayName = 'RecentActivityList'

export default RecentActivityList
