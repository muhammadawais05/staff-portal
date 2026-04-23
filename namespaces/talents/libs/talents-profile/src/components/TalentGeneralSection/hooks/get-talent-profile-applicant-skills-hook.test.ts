import { renderHook } from '@testing-library/react-hooks'
import { when } from 'jest-when'
import { useLazyQuery } from '@staff-portal/data-layer-service'

import { GetTalentProfileApplicantSkillsDocument } from '../data/get-talent-profile-general-data/get-talent-profile-applicant-skills.staff.gql.types'
import { getTalentProfileApplicantSkillsHook } from './get-talent-profile-applicant-skills-hook'

jest.mock('@staff-portal/data-layer-service')

const mockUseLazyQuery = useLazyQuery as jest.Mock

describe('#getTalentProfileApplicantSkillsHook', () => {
  it('returns', () => {
    when(mockUseLazyQuery)
      .calledWith(GetTalentProfileApplicantSkillsDocument, {
        variables: { talentId: 'test' },
        fetchPolicy: 'network-only'
      })
      .mockImplementation(() => [
        () => ({}),
        {
          data: {
            node: {
              applicantSkills: { nodes: [{ id: 1, name: 'javascript' }] }
            }
          },
          loading: false,
          called: false
        }
      ])

    const {
      result: { current }
    } = renderHook(() => getTalentProfileApplicantSkillsHook('test'))

    expect(current().data).toStrictEqual([
      {
        text: 'javascript',
        value: 'javascript'
      }
    ])
  })
})
