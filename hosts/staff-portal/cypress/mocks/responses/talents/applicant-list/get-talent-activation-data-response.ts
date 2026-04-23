import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentActivationDataResponse = () => ({
  node: {
    id: encodeEntityId('123', 'Talent'),
    activationSectionInProgress: false,
    activationSectionVisible: true,
    activation: null,
    activationTemplate: {
      id: 'VjEtQWN0aXZhdGlvblRlbXBsYXRlLTE',
      active: true,
      name: 'Default Template',
      steps: {
        totalCount: 8,
        nodes: [
          {
            id: 'VjEtQWN0aXZhdGlvblRlbXBsYXRlU3RlcC0x',
            type: 'TALENT_AGREEMENT',
            __typename: 'ActivationTemplateStep'
          },
          {
            id: 'VjEtQWN0aXZhdGlvblRlbXBsYXRlU3RlcC0y',
            type: 'TOPTAL_TRAINING',
            __typename: 'ActivationTemplateStep'
          },
          {
            id: 'VjEtQWN0aXZhdGlvblRlbXBsYXRlU3RlcC0z',
            type: 'PROFILE_CREATION',
            __typename: 'ActivationTemplateStep'
          },
          {
            id: 'VjEtQWN0aXZhdGlvblRlbXBsYXRlU3RlcC05',
            type: 'PROFILE_APPROVE',
            __typename: 'ActivationTemplateStep'
          },
          {
            id: 'VjEtQWN0aXZhdGlvblRlbXBsYXRlU3RlcC00',
            type: 'PROFILE_EDITING',
            __typename: 'ActivationTemplateStep'
          },
          {
            id: 'VjEtQWN0aXZhdGlvblRlbXBsYXRlU3RlcC02',
            type: 'LEGAL',
            __typename: 'ActivationTemplateStep'
          },
          {
            id: 'VjEtQWN0aXZhdGlvblRlbXBsYXRlU3RlcC03',
            type: 'PAYMENT',
            __typename: 'ActivationTemplateStep'
          },
          {
            id: 'VjEtQWN0aXZhdGlvblRlbXBsYXRlU3RlcC04',
            type: 'TOPTAL_EMAIL',
            __typename: 'ActivationTemplateStep'
          }
        ],
        __typename: 'ActivationTemplateStepsConnection'
      },
      __typename: 'ActivationTemplate'
    },
    __typename: 'Talent'
  }
})
