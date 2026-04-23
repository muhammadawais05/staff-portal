import React from 'react'
import { Container } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { NoSearchResultsMessage } from '@staff-portal/ui'

import EmploymentItem from './components/EmploymentItem/EmploymentItem'
import { useGetTalentEmploymentsSection } from './data/get-talent-employments-section/get-talent-employments-section.staff.gql'
import EmploymentsSectionSkeletonLoader from '../../components/EmploymentsSectionSkeletonLoader/EmploymentsSectionSkeletonLoader'
import * as S from './styles'

interface Props {
  talentId: string
}

export const EmploymentsSection = ({ talentId }: Props) => {
  const { showError } = useNotifications()
  const { data, talentType, loading } = useGetTalentEmploymentsSection({
    talentId,
    onError: () => showError('Failed fetching talent employments section.')
  })

  if (loading) {
    return <EmploymentsSectionSkeletonLoader />
  }

  if (!data?.length) {
    return <NoSearchResultsMessage message='No employments were added yet.' />
  }

  return (
    <Container css={S.container} data-testid='employments-section'>
      {data.map(employmentItem => (
        <EmploymentItem
          key={`${employmentItem.company}-${employmentItem.startDate}`}
          data={employmentItem}
          talentType={talentType}
        />
      ))}
    </Container>
  )
}

export default EmploymentsSection
