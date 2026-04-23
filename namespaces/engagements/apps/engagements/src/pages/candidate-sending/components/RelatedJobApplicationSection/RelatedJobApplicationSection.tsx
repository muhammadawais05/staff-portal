import { Note } from '@staff-portal/notes'
import { Typography } from '@toptal/picasso'
import React from 'react'

import { RelatedJobApplicationFragment } from '../../data/related-job-application-fragment'
import { buildRelatedJobApplication } from '../../utils'
import * as S from './styles'

type Props = {
  relatedJobApplication: RelatedJobApplicationFragment
}

const RelatedJobApplicationSection = ({ relatedJobApplication }: Props) => {
  const { applicationComment, renderDescription } = buildRelatedJobApplication(
    relatedJobApplication
  )

  return (
    <Note css={S.note}>
      <Note.Header top='xsmall' flex={false}>
        <Typography color='black' size='medium' as='div'>
          {renderDescription()}
        </Typography>
      </Note.Header>

      {applicationComment && (
        <Note.Body top='small' data-testid='related-job-application-comment'>
          <Typography size='small'>{applicationComment}</Typography>
        </Note.Body>
      )}
    </Note>
  )
}

export default RelatedJobApplicationSection
