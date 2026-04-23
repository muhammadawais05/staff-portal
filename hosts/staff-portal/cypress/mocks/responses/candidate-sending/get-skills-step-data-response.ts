import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getSkillsStepDataResponse = () => ({
  data: {
    newEngagementWizard: {
      talent: {
        id: encodeEntityId('123', 'Talent'),
        webResource: {
          url: '',
          text: 'Timofei Kachalov'
        },
        __typename: 'Talent'
      },
      skillSetToVet: {
        id: encodeEntityId('123', 'SkillSet'),
        skill: {
          id: encodeEntityId('123', 'Skill'),
          name: 'JavaScript',
          __typename: 'Skill'
        },
        __typename: 'SkillSet'
      },
      __typename: 'NewEngagementWizard'
    }
  }
})
