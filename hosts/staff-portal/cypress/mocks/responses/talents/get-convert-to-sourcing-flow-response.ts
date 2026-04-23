import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Talent } from '@staff-portal/graphql/staff'

export const getConvertToSourcingFlowResponse = (talent?: Partial<Talent>) => ({
  data: {
    countries: {
      nodes: [
        {
          id: 'VjEtQ291bnRyeS05MDI0OQ',
          name: 'Romania',
          code: 'RO',
          __typename: 'Country'
        }
      ],
      __typename: 'CountryConnection'
    },
    node: {
      id: encodeEntityId('123', 'Talent'),
      email: 'agus-5359223034de8b8a@toptal.io',
      fullName: 'Leona Daniel',
      citizenship: null,
      locationV2: null,
      applicantSkills: {
        nodes: [],
        __typename: 'TalentApplicantSkillConnection'
      },
      defaultApplicationAnswers: {
        nodes: [
          {
            id: 'VjEtQXBwbGljYXRpb25BbnN3ZXItdmlydHVhbF9hcHBsaWNhbnRfaWQ9MzI1ODUyMyZxdWVzdGlvbl9pZD0xMjE1ODI',
            answers: [],
            question: {
              id: 'VjEtQXBwbGljYXRpb25RdWVzdGlvbi0xMjE1ODI',
              label: 'English Proficiency',
              options: {
                nodes: [
                  {
                    id: 'VjEtQXBwbGljYXRpb25RdWVzdGlvbk9wdGlvbi0zMzM0Mw',
                    content: 'Native/Fluent',
                    __typename: 'ApplicationQuestionOption'
                  }
                ],
                totalCount: 1,
                __typename: 'ApplicationQuestionOptionsConnection'
              },
              __typename: 'ApplicationQuestion'
            },
            __typename: 'ApplicationAnswer'
          }
        ],
        __typename: 'TalentDefaultApplicationAnswersConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
