import React from 'react'
import { Container, SkeletonLoader } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { useUserDateFormatter } from '@staff-portal/current-user'
import { NO_VALUE } from '@staff-portal/config'

import { useGetTalentNPSScore } from './data/get-talent-nps-score'

export interface Props {
  talentId: string
}

const NSPScoreField = ({ talentId }: Props) => {
  const { data, loading } = useGetTalentNPSScore(talentId)
  const userDateFormatter = useUserDateFormatter()

  if (!data?.node) {
    return null
  }

  if (loading) {
    return <SkeletonLoader.Typography />
  }

  const { lastAnsweredPromotion, promotions } = data.node

  const fieldValue = (
    <>
      {lastAnsweredPromotion
        ? `${lastAnsweredPromotion.score} (${userDateFormatter(
            lastAnsweredPromotion.updatedAt
          )})`
        : NO_VALUE}
    </>
  )

  return (
    <Container data-testid='nps-score-field'>
      {lastAnsweredPromotion && promotions?.webResource.url ? (
        <Link href={promotions.webResource.url}>{fieldValue}</Link>
      ) : (
        fieldValue
      )}
    </Container>
  )
}

export default NSPScoreField
