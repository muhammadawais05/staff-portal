import { Container, SkeletonLoader, Tooltip } from '@toptal/picasso'
import React from 'react'
import { TooltipContent } from '@staff-portal/ui'
import { useGetCurrentUser } from '@staff-portal/current-user'

import useGetScreeningSteps from './hooks/use-get-screening-steps-data'
import { getIndicatorColor } from '../../../talent-screening-section/utils'
import CustomTag from '../CustomTag'

interface Props {
  talentId: string
}

const TalentScreeningSteps = ({ talentId }: Props) => {
  const { data, loading } = useGetScreeningSteps(talentId)
  const currentUser = useGetCurrentUser()

  if (loading && !data) {
    return <SkeletonLoader.Typography rows={2} />
  }

  return (
    <Container>
      {data?.node?.screeningRoleSteps?.nodes.map(item => (
        <Container right='xsmall' bottom='xsmall' inline key={item.id}>
          <Tooltip
            content={
              <TooltipContent
                messages={item.mainAction.tooltip}
                stepName={item.step.title}
              />
            }
            placement='top'
          >
            <CustomTag
              key={item.id}
              variant={getIndicatorColor(
                item.status,
                item.claimer?.id === currentUser?.id
              )}
            >
              {item.step.title}
            </CustomTag>
          </Tooltip>
        </Container>
      ))}
    </Container>
  )
}

export default TalentScreeningSteps
