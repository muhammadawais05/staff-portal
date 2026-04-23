import React from 'react'
import {
  Container,
  Button,
  // eslint-disable-next-line no-restricted-imports
  Link as PicassoLink
} from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { Operation } from '@staff-portal/operations'

import { ClaimAndApproveJobButton } from '../../../../index'
import SearchCandidatesButton from '../../../SearchCandidatesButton'
import { JobListItemFragment } from '../../data'

interface Props {
  job: JobListItemFragment
}

const JobItemListHeaderActions = ({
  job: {
    id,
    searchCandidatesUrl,
    searchApplicantsUrl,
    searchRejectedTalentsUrl,
    sendCandidateUrl,
    searchAllowed,
    operations: { approveJob }
  }
}: Props) => (
  <>
    {searchCandidatesUrl && (
      <Container left='xsmall'>
        <SearchCandidatesButton
          searchCandidatesUrl={searchCandidatesUrl}
          searchApplicantsUrl={searchApplicantsUrl}
          searchRejectedTalentsUrl={searchRejectedTalentsUrl}
          disabled={!searchAllowed}
        />
      </Container>
    )}

    <Operation
      operation={approveJob}
      render={disabled => (
        <Container left='xsmall'>
          <ClaimAndApproveJobButton jobId={id} disabled={disabled} />
        </Container>
      )}
    />

    {sendCandidateUrl && (
      <Container left='xsmall'>
        <Button
          as={Link as typeof PicassoLink}
          variant='positive'
          size='small'
          href={sendCandidateUrl}
          data-testid='send-candidate-link'
        >
          Send Candidate
        </Button>
      </Container>
    )}
  </>
)

export default JobItemListHeaderActions
