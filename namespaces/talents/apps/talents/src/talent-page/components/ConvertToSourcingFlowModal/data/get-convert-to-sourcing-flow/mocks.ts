import { MockedResponse } from '@staff-portal/data-layer-service'
import { createCountryFragment } from '@staff-portal/facilities/src/mocks'
import { CountryFragment } from '@staff-portal/facilities'
import {
  TalentApplicantSkillFragment,
  TalentLocationV2Fragment
} from '@staff-portal/talents'

import { DefaultApplicationAnswersFragment } from './get-convert-to-sourcing-flow.staff.gql.types'
import { GET_COVERT_TO_SOURCING_FLOW_INFO } from '.'

type Params = {
  talentId: string
  defaultApplicationAnswers?: DefaultApplicationAnswersFragment[]
  applicantSkills?: TalentApplicantSkillFragment[]
  citizenship?: CountryFragment
  locationV2?: TalentLocationV2Fragment | null
}

const getLocation = (location?: TalentLocationV2Fragment | null) => {
  if (location === null) {
    return null
  }

  if (!location) {
    return {
      placeId: 'some-id',
      cityName: 'Sri Jayawardenepura Kotte',
      countryName: 'Sri Lanka',
      stateName: 'SomeState',
      __typename: 'Location'
    }
  }

  return {
    ...location,
    __typename: 'Location'
  }
}

export const createGetConvertToSourcingFlowMock = ({
  talentId,
  defaultApplicationAnswers,
  applicantSkills,
  citizenship,
  locationV2
}: Params): MockedResponse => ({
  request: {
    query: GET_COVERT_TO_SOURCING_FLOW_INFO,
    variables: { id: talentId }
  },
  result: {
    data: {
      countries: {
        nodes: [
          {
            ...createCountryFragment({
              code: 'GL',
              id: '123',
              name: 'Greenland'
            }),
            __typename: 'Country'
          },
          {
            ...createCountryFragment({
              code: 'PL',
              id: '456',
              name: 'Poland'
            }),
            __typename: 'Country'
          }
        ]
      },
      node: {
        id: talentId,
        __typename: 'Talent',
        fullName: 'Full Name',
        email: 'test@gmail.com',
        applicantSkills: {
          nodes: applicantSkills || [
            {
              id: 'applicant-id',
              name: 'Web',
              __typename: 'Skill'
            }
          ]
        },
        locationV2: getLocation(locationV2),
        citizenship: citizenship || createCountryFragment(),
        defaultApplicationAnswers: {
          nodes: defaultApplicationAnswers || [
            {
              __typename: 'ApplicationAnswer',
              id: 'VjEtQXBwbGljYXRpb25BbnN3ZXIt',
              answers: ['VjEtQXBwbGljYXRpb25RdWVzdGlvbi0yOA'],
              question: {
                __typename: 'ApplicationQuestion',
                id: 'VjEtQXBwbGljYXRpb25RdWVzdGlvbi0yOA',
                label:
                  'How many hours per week do you plan to work for Toptal?',
                kind: 'SELECT',
                options: {
                  nodes: [
                    {
                      id: 'VjEtQXBwbGljYXRpb25RdWVzdGlvbk9wdGlvbi0zMzI4MQ',
                      content: '< 20 hours',
                      __typename: 'ApplicationQuestionOption'
                    },
                    {
                      id: 'VjEtQXBwbGljYXRpb25RdWVzdGlvbk9wdGlvbi0zMzI4Mg',
                      content: '20-30 hours',
                      __typename: 'ApplicationQuestionOption'
                    },
                    {
                      id: 'VjEtQXBwbGljYXRpb25RdWVzdGlvbk9wdGlvbi0zMzI4Mw',
                      content: '30-40 hours',
                      __typename: 'ApplicationQuestionOption'
                    },
                    {
                      id: 'VjEtQXBwbGljYXRpb25RdWVzdGlvbk9wdGlvbi0zMzI4NA',
                      content: '> 40 hours',
                      __typename: 'ApplicationQuestionOption'
                    }
                  ],
                  totalCount: 4
                }
              }
            }
          ]
        }
      }
    }
  }
})
