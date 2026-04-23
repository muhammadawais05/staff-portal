import React, { memo } from 'react'
import { Container, Section, TypographyOverflow } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'
import {
  TalentListItemHeader,
  TalentListItemSkeletonLoader
} from '@staff-portal/talents-list'
import { PublicationGigType, mapGigIdToP2P } from '@staff-portal/talents-gigs'

import { useGetCandidateListItem } from './data/get-candidate-list-item/get-candidate-list-item.staff.gql'
import CandidateListItemActions from './components/CandidateListItemActions/CandidateListItemActions'
import CandidateListItemContent from './components/CandidateListItemContent/CandidateListItemContent'
import BlogPostAuthorBadge from '../../components/BlogPostAuthorBadge/BlogPostAuthorBadge'
import * as S from './styles'

type Props = {
  talentId: string
  isBestMatchQueryEnabled: boolean
  request: PublicationGigType
  talentIndex: number
}

const CandidateListItem = ({
  talentId,
  request,
  isBestMatchQueryEnabled,
  talentIndex
}: Props) => {
  const { data: talent, loading } = useGetCandidateListItem(
    talentId,
    talentIndex,
    mapGigIdToP2P(request?.id) ?? ''
  )

  if (loading && !talent) {
    return <TalentListItemSkeletonLoader />
  }

  if (!talent) {
    return null
  }

  const { viewerActiveAvailabilitySubscription, operations, blogPosts } = talent
  const blogPostUrl =
    blogPosts && blogPosts.nodes.length > 0 && blogPosts.nodes[0].url

  return (
    <Section
      data-testid='candidate-list-item'
      variant='withHeaderBar'
      title={
        <Container flex css={S.candidateTitle}>
          <LinkWrapper
            wrapWhen={Boolean(talent.webResource.url)}
            href={talent.webResource.url as string}
            data-testid='talent-link'
          >
            <TypographyOverflow
              as='span'
              weight='inherit'
              size='inherit'
              color='inherit'
            >
              {talent.fullName}
            </TypographyOverflow>
          </LinkWrapper>
          {blogPostUrl && (
            <Container left='xsmall'>
              <BlogPostAuthorBadge
                fullName={talent.fullName}
                url={blogPostUrl}
              />
            </Container>
          )}
        </Container>
      }
      actions={
        <CandidateListItemActions
          talentAvailabilitySubscription={viewerActiveAvailabilitySubscription}
          operations={operations}
          talentId={talent.id}
          talentName={talent.fullName}
          talentResumeUrl={talent.resumeUrl}
          talentSuspended={talent.suspended}
          request={request}
        />
      }
    >
      <TalentListItemHeader
        talentId={talent.id}
        talentName={talent.fullName}
        talentPhoto={talent.photo?.small}
        talentUrl={talent.webResource.url}
        ofacStatus={talent.ofacStatus}
        ofacStatusComment={talent.ofacStatusComment}
        talentPartnerName={talent.talentPartner?.webResource?.text}
        talentPartnerUrl={talent.talentPartner?.webResource?.url}
      />
      <Section>
        <CandidateListItemContent
          talent={talent}
          isBestMatchQueryEnabled={isBestMatchQueryEnabled}
        />
      </Section>
    </Section>
  )
}

export default memo(CandidateListItem)
