import React from 'react'
import { Section, Container, Typography } from '@toptal/picasso'
import { PublicationGigStatus } from '@staff-portal/graphql/staff'
import { GigFragment } from '@staff-portal/talents-gigs'

import {
  CandidatesList,
  RequestDetails,
  SkillsList,
  SearchCandidates
} from '../../components'
import * as S from './styles'

type Props = {
  request: GigFragment
}

const Request = ({ request }: Props) => {
  const hideCandidates = request.status === PublicationGigStatus.PENDING

  return (
    <Container bottom='medium'>
      <Section title='Request Description' variant='bordered'>
        <Container bottom='medium'>
          <Typography css={S.description}>{request.description}</Typography>
        </Container>
        <Typography weight='semibold' color='black'>
          Required Skills
        </Typography>
        <SkillsList skills={request.skills} editMode={false} padded />
        <RequestDetails request={request} />
      </Section>
      {!hideCandidates && (
        <Container top='large'>
          <Section
            title='Candidates'
            variant='bordered'
            actions={<SearchCandidates request={request} variant='secondary' />}
          >
            <CandidatesList request={request} />
          </Section>
        </Container>
      )}
    </Container>
  )
}

Request.displayName = 'Request'

export default Request
