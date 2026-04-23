import { Container, SkeletonLoader } from '@toptal/picasso'
import React, { useMemo } from 'react'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { NO_VALUE } from '@staff-portal/config'

import useGetActivationStepsData from './hooks/use-get-activation-steps-data'
import { getStepName } from '../../../talent-activation-section/utils'
import StepItem from './components/StepItem'
import { getIndicatorColor } from '../../../talent-activation-section/components/ActivationStepButton/utils/get-indicator-color'
import { getTooltipMessages } from './utils'

type Props = {
  talentId: string
}

const TalentActivationSteps = ({ talentId }: Props) => {
  const { data, loading } = useGetActivationStepsData(talentId)
  const currentUser = useGetCurrentUser()
  const inactiveMessages = useMemo(
    () => [
      'These steps are only available after talent has passed the screening process.'
    ],
    []
  )

  if (!data && loading) {
    return <SkeletonLoader.Typography rows={2} />
  }

  let tagListNodes

  if (!data?.node?.activationSectionVisible) {
    tagListNodes = NO_VALUE
  } else if (data?.node?.activationSectionInProgress) {
    tagListNodes = data.node.activation?.steps.nodes.map(item => (
      <StepItem
        key={item.id}
        color={getIndicatorColor(item, item.staff?.id === currentUser?.id)}
        messages={getTooltipMessages(item)}
        content={getStepName(item.type)}
      />
    ))
  } else {
    tagListNodes = data?.node?.activationTemplate?.steps.nodes.map(item => (
      <StepItem
        disabled
        key={item.id}
        content={getStepName(item.type)}
        messages={inactiveMessages}
      />
    ))
  }

  return <Container>{tagListNodes}</Container>
}

export default TalentActivationSteps
