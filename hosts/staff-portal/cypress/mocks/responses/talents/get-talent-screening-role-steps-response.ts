import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentScreeningRoleStepsResponse = (
  talent?: Partial<Talent>
) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      fullName: 'Euna Conroy',
      screeningRoleSteps: {
        nodes: [],
        __typename: 'TalentScreeningRoleStepConnection'
      },
      status: 'rejected',
      specializationApplications: {
        nodes: [],
        __typename: 'SpecializationApplicationConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
