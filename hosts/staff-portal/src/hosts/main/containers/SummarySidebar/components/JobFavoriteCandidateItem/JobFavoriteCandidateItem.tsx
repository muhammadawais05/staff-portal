import React, { useState } from 'react'
import { Tag, TypographyOverflow } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { WebResource } from '@staff-portal/graphql/staff'
import { LinkWrapper } from '@staff-portal/ui'
import { JOB_FAVORITE_TALENTS_UPDATED } from '@staff-portal/jobs'
import { useRemoveTalentFromJobFavorites } from '@staff-portal/talents'

import * as S from './styles'

export interface Props {
  talent: { id: string; fullName: string } & WebResource
  jobId: string
  onItemRemoved: () => void
}

const JobFavoriteCandidateItem = ({ talent, jobId, onItemRemoved }: Props) => {
  const [isRemoved, setIsRemoved] = useState(false)
  const { showError } = useNotifications()
  const emitMessage = useMessageEmitter()
  const [removeTalentFromJobFavorites, { loading }] =
    useRemoveTalentFromJobFavorites({
      onCompleted: () => {
        setIsRemoved(true)
        onItemRemoved()
        emitMessage(JOB_FAVORITE_TALENTS_UPDATED, { jobId })
      },
      onError: () => showError('Cannot remove talent from job favorites.')
    })

  if (isRemoved) {
    return null
  }

  return (
    <Tag
      disabled={loading || isRemoved}
      onDelete={() =>
        removeTalentFromJobFavorites({
          variables: { talentId: talent.id, jobId }
        })
      }
      css={S.jobCandidateItem}
      data-testid='favorite-candidate'
    >
      <LinkWrapper
        wrapWhen={Boolean(talent.webResource.url)}
        href={talent.webResource.url as string}
      >
        <TypographyOverflow
          as='span'
          size='inherit'
          color='inherit'
          weight='inherit'
        >
          {talent.fullName}
        </TypographyOverflow>
      </LinkWrapper>
    </Tag>
  )
}

export default JobFavoriteCandidateItem
