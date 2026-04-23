import { SoftSkill, SoftSkillRating } from '@staff-portal/graphql/staff'

import { enabledOperationMock } from '~integration/mocks/enabled-operation-mock'

export const softSkillMock = (softSkill?: Partial<SoftSkill>) =>
  ({
    id: 'VjEtU29mdFNraWxsLTE',
    name: 'English',
    ratingHints: [
      {
        description: 'Rating 1.',
        title: 'Unacceptable',
        value: 'RATING_1',
        __typename: 'SoftSkillRatingHint'
      },
      {
        description: 'Rating 2.',
        title: 'Needs Improvement',
        value: 'RATING_2',
        __typename: 'SoftSkillRatingHint'
      },
      {
        description: 'Rating 3',
        title: 'Adequate',
        value: 'RATING_3',
        __typename: 'SoftSkillRatingHint'
      },
      {
        description: 'Rating 4.',
        title: 'Very Good',
        value: 'RATING_4',
        __typename: 'SoftSkillRatingHint'
      },
      {
        description: 'Rating 5.',
        title: 'Exceptional',
        value: 'RATING_5',
        __typename: 'SoftSkillRatingHint'
      }
    ],
    ...softSkill,
    __typename: 'SoftSkill'
  } as unknown as SoftSkill)

export const softSkillRatingMock = (rating?: Partial<SoftSkillRating>) =>
  ({
    comment: 'Made a few slips.\nSolid grammar and vocabulary.',
    createdAt: '2021-12-01T12:10:20+03:00',
    id: 'VjEtU29mdFNraWxsUmF0aW5nLTc1OTcxNw',
    note: {
      id: 'VjEtTm90ZS0xNzIxMjI0',
      type: 'english_call',
      __typename: 'Note'
    },
    operations: {
      removeSoftSkillRating: enabledOperationMock(),
      __typename: 'SoftSkillRatingOperations'
    },
    performer: {
      id: 'VjEtU3RhZmYtMjE2NDY2OA',
      fullName: 'Austin Boyer',
      webResource: {
        url: 'https://staging.toptal.net/platform/staff/staff/2164668',
        text: 'Austin Boyer',
        __typename: 'Link'
      },
      __typename: 'Staff'
    },
    performerUnits: {
      nodes: [
        {
          name: 'English Recording Screeners',
          __typename: 'Team'
        }
      ],
      __typename: 'StaffUnitConnection'
    },
    value: 'RATING_3',
    __typename: 'SoftSkillRating',
    ...rating,
    softSkill: {
      id: 'VjEtU29mdFNraWxsLTE',
      ...rating?.softSkill,
      __typename: 'SoftSkill'
    }
  } as unknown as SoftSkillRating)
