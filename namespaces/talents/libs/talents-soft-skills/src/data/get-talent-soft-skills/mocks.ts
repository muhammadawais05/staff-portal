import {
  OperationCallableTypes,
  SoftSkillRatingValue
} from '@staff-portal/graphql/staff'
import { mapToTypename } from '@staff-portal/test-utils'
import { WebResourceFragment } from '@staff-portal/facilities'

import {
  TalentSoftSkillsFragment,
  TalentSoftSkillFragment,
  GetTalentSoftSkillsQueryVariables,
  GetTalentSoftSkillsDocument
} from './get-talent-soft-skills.staff.gql.types'
import { Rating } from '../../types'

export const createSoftSkillsRatingFragmentMock = (
  softSkillId = '123'
): Rating => ({
  id: '123',
  performer: {
    id: '123',
    fullName: 'TEST_NAME',
    webResource: {
      text: 'TEST_TEXT',
      url: null,
      __typename: 'WebResource'
    } as WebResourceFragment['webResource']
  },
  performerUnits: { nodes: [] },
  note: { id: 'test-id', type: 'technical_one_call' },
  value: SoftSkillRatingValue.RATING_2,
  comment: 'TEST_COMMENT',
  createdAt: '2020-09-02T12:26:22.142Z',
  operations: {
    removeSoftSkillRating: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  },
  softSkill: {
    id: softSkillId
  }
})

export const createSoftSkillsRatingsFragmentMock = (
  softSkillId = '123',
  talentId: string
): TalentSoftSkillsFragment => ({
  id: talentId,
  fullName: 'TEST_NAME',
  operations: {
    createTalentSoftSkillRating: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  },
  softSkillRatings: {
    nodes: [
      {
        ...createSoftSkillsRatingFragmentMock(softSkillId),
        note: { id: 'test-id', type: 'technical_one_call' },
        value: SoftSkillRatingValue.RATING_2
      },
      {
        ...createSoftSkillsRatingFragmentMock(softSkillId),
        note: { id: 'test-id', type: 'technical_two_call' },
        value: SoftSkillRatingValue.RATING_3
      },
      {
        ...createSoftSkillsRatingFragmentMock(softSkillId),
        note: { id: 'test-id', type: 'english_call' },
        value: SoftSkillRatingValue.RATING_4
      }
    ]
  }
})

export const createGetTalentSoftSkillsMock = (
  partialSoftSkillRatingsFragment?: Partial<TalentSoftSkillsFragment>,
  softSkills?: TalentSoftSkillFragment[],
  talentId = '123'
) => {
  const softSkillId = '123'
  const defaultSoftSkill = {
    id: softSkillId,
    name: 'English',
    ratingHints: [
      {
        description: 'Some description',
        title: 'Some title',
        value: SoftSkillRatingValue.RATING_1
      }
    ]
  }

  const softSkillsMock = softSkills || [defaultSoftSkill]
  const softSkillsRatingsFragment = {
    ...createSoftSkillsRatingsFragmentMock(softSkillId, talentId),
    ...partialSoftSkillRatingsFragment
  }

  return {
    request: {
      query: GetTalentSoftSkillsDocument,
      variables: { talentId: softSkillsRatingsFragment.id }
    },
    result: {
      data: {
        node: {
          ...softSkillsRatingsFragment,
          operations: {
            __typename: 'TalentOperations',
            createTalentSoftSkillRating: {
              ...softSkillsRatingsFragment.operations
                .createTalentSoftSkillRating,
              __typename: 'Operation'
            }
          },
          softSkillRatings: {
            ...softSkillsRatingsFragment.softSkillRatings,
            nodes: softSkillsRatingsFragment.softSkillRatings?.nodes.map(
              node => ({
                ...node,
                operations: {
                  removeSoftSkillRating: {
                    ...node.operations.removeSoftSkillRating,
                    __typename: 'Operation'
                  },
                  __typename: 'TalentSoftSkillRatingOperations'
                },
                note: {
                  ...node.note,
                  __typename: 'Note'
                },
                performer: {
                  ...node.performer,
                  __typename: 'Staff'
                },
                performerUnits: {
                  nodes: node.performerUnits?.nodes.map(unit => ({
                    ...unit,
                    __typename: 'Team'
                  })),
                  __typename: 'StaffUnitConnection'
                },
                softSkill: {
                  ...node.softSkill,
                  __typename: 'Skill'
                },
                __typename: 'TalentSoftSkillRating'
              })
            ),
            __typename: 'TalentSoftSkillConnection'
          },
          __typename: 'Talent'
        },
        softSkills: {
          nodes: softSkillsMock.map(({ id, name, ratingHints }) => ({
            id,
            name,
            ratingHints: mapToTypename(ratingHints, 'SoftSkillRatingHint'),
            __typename: 'SoftSkill'
          })),
          __typename: 'SoftSkillConnection'
        }
      }
    }
  }
}

export const createGetTalentSoftSkillsFailedMock = (
  variables: GetTalentSoftSkillsQueryVariables,
  errorMessage = 'fake error message.'
) => ({
  request: { query: GetTalentSoftSkillsDocument, variables },
  error: new Error(errorMessage)
})
