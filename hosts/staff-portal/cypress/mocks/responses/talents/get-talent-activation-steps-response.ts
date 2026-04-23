import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Talent } from '@staff-portal/graphql/staff'

export const getTalentActivationStepsResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      fullName: 'Euna Conroy',
      activationSectionInProgress: false,
      activationSectionVisible: false,
      activation: null,
      activationTemplate: {
        id: 'VjEtQWN0aXZhdGlvblRlbXBsYXRlLTE',
        steps: {
          nodes: [],
          __typename: 'ActivationTemplateStepsConnection'
        },
        __typename: 'ActivationTemplate'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
