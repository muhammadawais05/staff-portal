import { StepStatus, StepType } from '@staff-portal/graphql/staff'

import { TalentActivationStepsFragment } from '../../data/get-talent-activation'

export const getTalentActivationData = (
  talent: NonNullable<TalentActivationStepsFragment>
) => ({
  talentFullName: talent.fullName,
  activation: talent.activation,
  isProfileCreationStepFinished:
    talent.activation?.steps.nodes.filter(
      node =>
        node.type === StepType.PROFILE_CREATION &&
        node.status === StepStatus.FINISHED
    ).length === 1
})
