import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Redirect, useParams } from '@staff-portal/navigation'
import { isOperationEnabled } from '@staff-portal/operations'
import ContentWrapper from '@staff-portal/page-wrapper'
import { Section } from '@toptal/picasso'
import React, { useMemo } from 'react'
import { getDashboardPath } from '@staff-portal/routes'

import {
  TalentUpdateFormSkeletonLoader,
  TalentUpdateTitle
} from '../../components'
import TalentUpdateForm from '../../components/TalentUpdateForm'
import { useGetTalentUpdate } from './data'

const TalentUpdatePage = () => {
  const { id: talentLegacyId } = useParams<{ id: string }>()
  const talentId = useMemo(
    () => encodeEntityId(talentLegacyId, 'Talent'),
    [talentLegacyId]
  )
  const { talent, permits, loading } = useGetTalentUpdate(talentId)

  if (
    !loading &&
    !isOperationEnabled(talent?.operations?.updateTalentProfile)
  ) {
    return <Redirect to={getDashboardPath()} />
  }

  return (
    <ContentWrapper
      titleLoading={loading}
      title={
        talent ? (
          <TalentUpdateTitle
            talentFullName={talent.fullName}
            talentUrl={talent.webResource.url}
          />
        ) : undefined
      }
      browserTitle={talent ? `Profile of ${talent.fullName}` : undefined}
    >
      <Section title='Talent Details' variant='withHeaderBar'>
        {loading && <TalentUpdateFormSkeletonLoader />}
        {!loading && talent && permits && (
          <TalentUpdateForm talent={talent} permits={permits} />
        )}
      </Section>
    </ContentWrapper>
  )
}

export default TalentUpdatePage
