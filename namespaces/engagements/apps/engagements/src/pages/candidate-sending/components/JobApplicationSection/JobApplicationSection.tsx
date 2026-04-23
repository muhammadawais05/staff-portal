import { Container, Section, Typography } from '@toptal/picasso'
import React from 'react'

import { buildRelatedJobApplication } from '../../utils'
import { RelatedJobApplicationFragment } from '../../data/related-job-application-fragment'

const TITLE = 'Job Application'

export type Props = {
  relatedJobApplication: RelatedJobApplicationFragment
}

const JobApplicationSection = ({ relatedJobApplication }: Props) => {
  const { applicationComment, renderDescription } = buildRelatedJobApplication(
    relatedJobApplication
  )

  return (
    <Section variant='withHeaderBar' title={TITLE}>
      <Typography size='medium' as='div'>
        <Container>{renderDescription()}</Container>

        {applicationComment && (
          <Container top='small' data-testid='job-application-comment'>
            {applicationComment}
          </Container>
        )}
      </Typography>
    </Section>
  )
}

export default JobApplicationSection
