import React from 'react'
import { Section } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { TALENT_UPDATED } from '@staff-portal/talents'

import TalentApplicantItemSkeletonLoader from '../TalentApplicantItemSkeletonLoader'
import {
  TalentApplicantItemActions,
  TalentApplicantItemTitle,
  TalentApplicantDetails
} from './components'
import useGetTalentApplicantData from './hooks/use-get-talent-applicant-data'
import { useGetActivationStepsData } from '../TalentActivationSteps'
import { useGetScreeningStepsData } from '../TalentScreeningSteps'
import * as S from './styles'

type Props = {
  talentId: string
  itemIndex: number
}

const TalentApplicantItem = ({ talentId }: Props) => {
  const { data, loading, refetch } = useGetTalentApplicantData(talentId)

  useGetScreeningStepsData(talentId) // preloads screening steps data
  useGetActivationStepsData(talentId) // preloads activation steps data

  const talent = data?.node

  useMessageListener(
    TALENT_UPDATED,
    ({ talentId: id }) => talentId === id && refetch()
  )

  if (loading && !talent) {
    return <TalentApplicantItemSkeletonLoader />
  }

  if (!talent) {
    return null
  }

  return (
    <Section
      variant='withHeaderBar'
      title={<TalentApplicantItemTitle talent={talent} />}
      actions={<TalentApplicantItemActions talent={talent} />}
      css={[talent.isNew && S.highlighted]}
    >
      <TalentApplicantDetails talent={talent} />
    </Section>
  )
}

export default TalentApplicantItem
