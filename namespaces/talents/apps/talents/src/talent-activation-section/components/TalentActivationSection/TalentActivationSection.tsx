import React, { memo } from 'react'
import { Grid, SkeletonLoader } from '@toptal/picasso'
import { SectionProps } from '@toptal/picasso/Section'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { TASK_UPDATED } from '@staff-portal/tasks'
import { TALENT_UPDATED, ROLE_STEP_UPDATED } from '@staff-portal/talents'
import { MEETING_CANCELED } from '@staff-portal/meetings'

import { getTalentActivationData } from './utils'
import { ActivationStepButton } from '../ActivationStepButton'
import { useGetTalentActivation } from '../../data/get-talent-activation'
import TalentActivationSectionLayout from '../TalentActivationSectionLayout'
import ActivationDisabledStepButton from '../ActivationDisabledStepButton'

interface Props {
  talentId: string
  sectionVariant?: SectionProps['variant']
}

const TalentActivationSection = ({
  talentId,
  sectionVariant = 'default'
}: Props) => {
  const currentUser = useGetCurrentUser() ?? { id: '', fullName: '' }
  const { talent, loading, refetch } = useGetTalentActivation(talentId)
  const { activationSectionVisible, activationSectionInProgress } = talent || {}

  useMessageListener(
    [TALENT_UPDATED],
    ({ talentId: id }) => id === talentId && refetch()
  )
  useMessageListener([ROLE_STEP_UPDATED, TASK_UPDATED], () => refetch())
  useMessageListener(
    [MEETING_CANCELED],
    ({ attendeeId }) => attendeeId === talentId && refetch()
  )

  if (loading || !talent) {
    return (
      <TalentActivationSectionLayout sectionVariant={sectionVariant}>
        {[...new Array(8)].map((_, index) => (
          // TODO: replaced by a reusable Component
          // Skeleton loader, no unique id
          // eslint-disable-next-line react/no-array-index-key
          <Grid.Item key={index} small={3}>
            <SkeletonLoader.Media variant='image' width={212} height={32} />
          </Grid.Item>
        ))}
      </TalentActivationSectionLayout>
    )
  }

  const { talentFullName, activation, isProfileCreationStepFinished } =
    getTalentActivationData(talent)

  if (!activationSectionVisible) {
    return null
  }

  if (activationSectionInProgress) {
    return activation?.steps.nodes.length ? (
      <TalentActivationSectionLayout sectionVariant={sectionVariant}>
        {activation.steps.nodes.map(node => (
          <Grid.Item key={node.id} small={3}>
            <ActivationStepButton
              activationId={activation.id}
              step={node}
              talentId={talent.id}
              currentUserId={currentUser.id}
              staffFullName={currentUser.fullName}
              talentFullName={talentFullName}
              isProfileCreationStepFinished={isProfileCreationStepFinished}
            />
          </Grid.Item>
        ))}
      </TalentActivationSectionLayout>
    ) : null
  }

  if (talent.activationTemplate?.steps.nodes.length) {
    return (
      <TalentActivationSectionLayout sectionVariant={sectionVariant}>
        {talent.activationTemplate.steps.nodes.map(node => (
          <Grid.Item key={node.id} small={3}>
            <ActivationDisabledStepButton type={node.type} />
          </Grid.Item>
        ))}
      </TalentActivationSectionLayout>
    )
  }

  return null
}

export default memo(TalentActivationSection)
