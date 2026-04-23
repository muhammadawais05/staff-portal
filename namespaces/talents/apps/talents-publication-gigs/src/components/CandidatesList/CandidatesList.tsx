import React, { ReactNode } from 'react'
import { Container, Typography, Table } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { TableSkeleton } from '@staff-portal/ui'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { useGetGigCandidates, GigFragment } from '@staff-portal/talents-gigs'

import {
  NO_CANDIDATES_MESSAGE,
  NO_CANDIDATES_MESSAGE_FOR_CLAIMER
} from '../../config'
import CandidateRow from '../CandidateRow'
import * as S from './styles'

const Message = ({ children }: { children: ReactNode }) => {
  return (
    <Container
      padded='large'
      flex
      alignItems='center'
      justifyContent='center'
      data-testid='no-search-results'
    >
      <Typography color='dark-grey' align='center' size='medium'>
        {children}
      </Typography>
    </Container>
  )
}

type Props = {
  request: GigFragment
}

const CandidatesList = ({ request }: Props) => {
  const { candidates, loading, error, refetch } = useGetGigCandidates({
    id: request.id
  })

  const currentUser = useGetCurrentUser()

  if (candidates.length === 0 && loading) {
    return (
      <TableSkeleton
        rows={3}
        cols={3}
        dataTestId='request-candidates-loader'
        variant='striped'
      />
    )
  }

  if (error) {
    return (
      <Message>
        Sorry, something went wrong. Please{' '}
        <Link data-testid='candidates-refresh-link' onClick={() => refetch()}>
          refresh this section
        </Link>
        .
        <br /> If the issue persists, please email us at{' '}
        <Link
          data-testid='support-mail-link'
          target='_blank'
          href='mailto:support@toptal.com'
        >
          support@toptal.com
        </Link>
        .
      </Message>
    )
  }

  if (candidates.length === 0) {
    if (currentUser?.id === request.claimedBy?.role.id) {
      return <Message>{NO_CANDIDATES_MESSAGE_FOR_CLAIMER}</Message>
    }

    return <Message>{NO_CANDIDATES_MESSAGE}</Message>
  }

  return (
    <>
      <Table css={S.candidatesTable} data-testid='candidates-list'>
        <Table.Body>
          {candidates.map(({ reachOut, slackConversation }) => (
            <CandidateRow
              key={reachOut.id}
              reachOut={reachOut}
              slackConversation={slackConversation}
            />
          ))}
        </Table.Body>
      </Table>
      {loading && (
        <TableSkeleton
          rows={3}
          cols={3}
          dataTestId='request-candidates-loader-more'
          variant='striped'
          showHeader={false}
        />
      )}
    </>
  )
}

export default CandidatesList
