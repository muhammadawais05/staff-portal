import {
  Button,
  Container,
  // eslint-disable-next-line no-restricted-imports
  Link as PicassoLink,
  Typography
} from '@toptal/picasso'
import React from 'react'
import { Link } from '@staff-portal/navigation'
import { getOperationalIssuesPath } from '@staff-portal/routes'

import { useGetOperationalIssues } from '../../data/get-operational-issues/get-operational-issues.staff.gql'
import OperationalIssuesSkeletonLoader from '../../components/OperationalIssuesSkeletonLoader/OperationalIssuesSkeletonLoader'
import OperationalIssuesItem from '../OperationalIssuesItem/OperationalIssuesItem'

export interface Props {}

const OperationalIssues = () => {
  const { data, loading } = useGetOperationalIssues()
  const operationalIssues = data?.nodes

  if (loading && !operationalIssues) {
    return <OperationalIssuesSkeletonLoader />
  }

  if (!operationalIssues?.length) {
    return (
      <Container padded='small'>
        <Typography size='medium'>
          You currently own no unresolved operational issues.
        </Typography>
      </Container>
    )
  }

  return (
    <>
      {operationalIssues.map(operationalIssue => (
        <OperationalIssuesItem
          key={operationalIssue.id}
          operationalIssue={operationalIssue}
        />
      ))}

      <Container padded='small' flex>
        <Button
          as={Link as typeof PicassoLink}
          href={getOperationalIssuesPath({})}
          variant='secondary'
          fullWidth
        >
          Show All Issues
        </Button>
      </Container>
    </>
  )
}

export default OperationalIssues
