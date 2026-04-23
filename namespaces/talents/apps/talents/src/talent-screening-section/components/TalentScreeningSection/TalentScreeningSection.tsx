import React, { memo, ReactNode } from 'react'
import { Grid, SkeletonLoader } from '@toptal/picasso'
import Section, { SectionProps } from '@toptal/picasso/Section'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { TALENT_UPDATED, ROLE_STEP_UPDATED } from '@staff-portal/talents'
import { TASK_UPDATED } from '@staff-portal/tasks'

import { ScreeningStepButton } from '../ScreeningStepButton'
import { ScreeningStepDefaultButton } from '../ScreeningStepDefaultButton'
import { useGetTalentScreeningRoleSteps } from '../../data/get-talent-screening-role-steps'
import { getTalentScreeningData } from '../../utils'
import useNextAction from './hooks/use-next-action'
import { checkTalentScreeningSectionVisibility } from './utils'

const SectionItem = ({ children }: { children: ReactNode }) => (
  <Grid.Item small={3}>{children}</Grid.Item>
)

export interface Props {
  talentId: string
  sectionVariant?: SectionProps['variant']
}

const TalentScreeningSection = ({
  talentId,
  sectionVariant = 'default'
}: Props) => {
  const { talent, loading, refetch } = useGetTalentScreeningRoleSteps(talentId)

  const { triggerNextAction } = useNextAction({ talentId })

  useMessageListener([ROLE_STEP_UPDATED, TALENT_UPDATED, TASK_UPDATED], () =>
    refetch()
  )

  if (loading || !talent) {
    return (
      <Section title='Screening' variant={sectionVariant}>
        <Grid spacing={8}>
          {[...new Array(8)].map((_, index) => (
            // Skeleton loader, no unique id
            // eslint-disable-next-line react/no-array-index-key
            <SectionItem key={index}>
              <SkeletonLoader.Media variant='image' width={212} height={32} />
            </SectionItem>
          ))}
        </Grid>
      </Section>
    )
  }

  const { screeningRoleSteps } = getTalentScreeningData(talent)
  const isSectionVisible = checkTalentScreeningSectionVisibility(
    screeningRoleSteps,
    talent
  )

  return isSectionVisible ? (
    <Section
      title='Screening'
      variant={sectionVariant}
      data-testid='talent-screening-section'
    >
      <Grid spacing={8}>
        {screeningRoleSteps?.map(node => (
          <SectionItem key={node.id}>
            {node.mainAction.actionName ? (
              <ScreeningStepButton
                talentId={talentId}
                node={node}
                triggerNextAction={triggerNextAction}
              />
            ) : (
              <ScreeningStepDefaultButton node={node} />
            )}
          </SectionItem>
        ))}
      </Grid>
    </Section>
  ) : null
}

export default memo(TalentScreeningSection)
