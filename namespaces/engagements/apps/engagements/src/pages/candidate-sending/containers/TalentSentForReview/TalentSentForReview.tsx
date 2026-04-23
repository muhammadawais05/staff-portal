import { useCopyRichTextToClipBoard } from '@staff-portal/clipboard'
import { useGetNode } from '@staff-portal/data-layer-service'
import {
  GetEngagementPitchSnippetDocument,
  PitchSnippetItem
} from '@staff-portal/engagements-candidate-sending'
import { Link } from '@staff-portal/graphql/staff'
import { Link as NavigationLink } from '@staff-portal/navigation'
import {
  Button,
  Container,
  Link as PicassoLink,
  Typography
} from '@toptal/picasso'
import React, { useRef } from 'react'

import { TalentSentForReviewLoader } from '../../components'

interface Props {
  engagementId: string
  talentType: string
  jobLink?: Link
}

const TalentSentForReview = ({ engagementId, talentType, jobLink }: Props) => {
  const pitchSnippetsContentRef = useRef<HTMLDivElement>(null)
  const { copyRichTextToClipboard } = useCopyRichTextToClipBoard()

  const { data, loading } = useGetNode(GetEngagementPitchSnippetDocument)({
    engagementId
  })

  const handleCopyToClipboard = async () => {
    if (!pitchSnippetsContentRef.current) {
      return
    }

    await copyRichTextToClipboard({
      target: pitchSnippetsContentRef.current,
      successMessage: 'Pitch snippet copied to clipboard.'
    })
  }

  if (loading) {
    return <TalentSentForReviewLoader />
  }

  if (!data) {
    return null
  }

  return (
    <Container
      direction='column'
      flex
      justifyContent='center'
      data-testid='talent-sent-for-review'
    >
      <Container top='medium' bottom='medium'>
        <Typography
          variant='heading'
          size='large'
          align='center'
          data-testid='talent-sent-for-review-header'
        >
          A {talentType} has been successfully sent for internal review!
        </Typography>
      </Container>

      <Container bottom='xsmall'>
        <Typography
          align='center'
          size='medium'
          color='black'
          data-testid='talent-sent-for-review-content'
        >
          Here is a text snippet that you can share with internal reviewers:
        </Typography>
      </Container>

      <Container bottom='xsmall' ref={pitchSnippetsContentRef}>
        <PitchSnippetItem
          hideRole
          hideAllocatedHours
          talent={data.talent}
          engagementUrl={data.resumeUrl}
          hourlyRate={data.talentHourlyRate}
          size='small'
          mode='default'
        />
      </Container>

      <Container align='center'>
        <Button
          variant='positive'
          onClick={handleCopyToClipboard}
          data-testid='talent-sent-for-review-copy-snippet-button'
        >
          Copy Snippet
        </Button>
      </Container>

      <Container top='medium' align='right'>
        <Button
          as={NavigationLink as typeof PicassoLink}
          href={jobLink?.url}
          variant='positive'
          noUnderline
        >
          Jump to Job
        </Button>
      </Container>
    </Container>
  )
}

export default TalentSentForReview
