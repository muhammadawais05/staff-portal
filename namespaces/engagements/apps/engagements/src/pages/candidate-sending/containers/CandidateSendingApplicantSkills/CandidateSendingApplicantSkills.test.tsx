import { useQuery } from '@staff-portal/data-layer-service'
import { SkillRating } from '@staff-portal/graphql/staff'
import { SkillSetField } from '@staff-portal/talents'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@toptal/picasso/test-utils'
import React from 'react'

import { GetApplicantSkillsQuery } from '../../data/get-applicant-skills/get-applicant-skills.staff.gql.types'
import CandidateSendingApplicantSkills from './CandidateSendingApplicantSkills'
import CandidateSendingApplicantSkillsLoader from '../../components/CandidateSendingApplicantSkillsLoader/CandidateSendingApplicantSkillsLoader'

jest.mock(
  '../../components/CandidateSendingApplicantSkillsLoader/CandidateSendingApplicantSkillsLoader'
)
jest.mock('@staff-portal/talents', () => ({
  SkillSetField: jest.fn()
}))
jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useQuery: jest.fn()
}))

const mockUseQuery = useQuery as jest.Mock
const mockSkillSetField = SkillSetField as jest.MockedFunction<
  typeof SkillSetField
>
const mockCandidateSendingApplicantSkillsLoader =
  CandidateSendingApplicantSkillsLoader as jest.Mock

const renderComponent = ({
  data,
  loading
}: { data?: GetApplicantSkillsQuery; loading?: boolean } = {}) => {
  mockCandidateSendingApplicantSkillsLoader.mockImplementation(() => null)
  mockSkillSetField.mockImplementation(() => null)

  mockUseQuery.mockImplementation(() => ({ data, loading }))

  return render(
    <TestWrapper>
      <CandidateSendingApplicantSkills applicantId='1' />
    </TestWrapper>
  )
}

describe('CandidateSendingApplicantSkills', () => {
  describe('when data is null', () => {
    it('returns null', () => {
      renderComponent()

      expect(mockCandidateSendingApplicantSkillsLoader).not.toHaveBeenCalled()
      expect(mockSkillSetField).not.toHaveBeenCalled()
    })
  })

  describe('when is loading', () => {
    it('shows the section loader', () => {
      renderComponent({ loading: true })

      expect(mockCandidateSendingApplicantSkillsLoader).toHaveBeenCalled()
      expect(mockSkillSetField).not.toHaveBeenCalled()
    })
  })

  describe('when is loading and the node is missing', () => {
    it('returns null', () => {
      renderComponent({ loading: true, data: {} })

      expect(mockCandidateSendingApplicantSkillsLoader).not.toHaveBeenCalled()
      expect(mockSkillSetField).not.toHaveBeenCalled()
    })
  })

  describe('when talent is missing', () => {
    it('returns null', () => {
      renderComponent({
        loading: true,
        data: { node: { id: '1', job: { id: '1' } } }
      })

      expect(mockCandidateSendingApplicantSkillsLoader).not.toHaveBeenCalled()
      expect(mockSkillSetField).not.toHaveBeenCalled()
    })
  })

  describe('when jobApplicationTalent is available and availabilityRequestTalent is missing', () => {
    it('shows the jobApplicationTalent skills', () => {
      const TALENT_TYPE = 'developer'
      const TALENT_SKILL_SET = {
        id: '11',
        rating: SkillRating.COMPETENT,
        skill: { id: '22', name: 'C#' }
      }
      const TALENT = {
        id: '1',
        type: TALENT_TYPE,
        skillSets: {
          nodes: [TALENT_SKILL_SET]
        }
      }

      renderComponent({
        loading: true,
        data: {
          node: {
            id: '1',
            job: {
              id: '1',
              skillSets: {
                nodes: [
                  { id: '1', skill: { id: '2' } },
                  { id: '3', skill: { id: '4' } }
                ]
              }
            },
            jobApplicationTalent: TALENT
          }
        }
      })

      expect(mockCandidateSendingApplicantSkillsLoader).not.toHaveBeenCalled()
      expect(mockSkillSetField).toHaveBeenCalledWith(
        {
          talentType: TALENT_TYPE,
          skills: [TALENT_SKILL_SET],
          highlightedSkillIds: ['2', '4']
        },
        expect.anything()
      )
    })
  })

  describe('when availabilityRequestTalent is available and jobApplicationTalent is missing', () => {
    it('shows the availabilityRequestTalent skills', () => {
      const TALENT_TYPE = 'developer'
      const TALENT_SKILL_SET = {
        id: '11',
        rating: SkillRating.COMPETENT,
        skill: { id: '22', name: 'C#' }
      }
      const TALENT = {
        id: '1',
        type: TALENT_TYPE,
        skillSets: {
          nodes: [TALENT_SKILL_SET]
        }
      }

      renderComponent({
        loading: true,
        data: {
          node: {
            id: '1',
            job: {
              id: '1',
              skillSets: {
                nodes: [
                  { id: '1', skill: { id: '2' } },
                  { id: '3', skill: { id: '4' } }
                ]
              }
            },
            availabilityRequestTalent: TALENT
          }
        }
      })

      expect(mockCandidateSendingApplicantSkillsLoader).not.toHaveBeenCalled()
      expect(mockSkillSetField).toHaveBeenCalledWith(
        {
          talentType: TALENT_TYPE,
          skills: [TALENT_SKILL_SET],
          highlightedSkillIds: ['2', '4']
        },
        expect.anything()
      )
    })
  })

  describe('when both, availabilityRequestTalent and  jobApplicationTalent are available', () => {
    it('shows the availabilityRequestTalent skills', () => {
      const TALENT_TYPE = 'developer'
      const TALENT_SKILL_SET = {
        id: '11',
        rating: SkillRating.COMPETENT,
        skill: { id: '22', name: 'C#' }
      }
      const AVAILABILITY_REQUEST_TALENT = {
        id: '1',
        type: TALENT_TYPE,
        skillSets: {
          nodes: [TALENT_SKILL_SET]
        }
      }

      const JOB_APPLICATION_TALENT = {
        id: '2',
        type: 'designer',
        skillSets: {
          nodes: []
        }
      }

      renderComponent({
        loading: true,
        data: {
          node: {
            id: '1',
            job: {
              id: '1',
              skillSets: {
                nodes: [
                  { id: '1', skill: { id: '2' } },
                  { id: '3', skill: { id: '4' } }
                ]
              }
            },
            availabilityRequestTalent: AVAILABILITY_REQUEST_TALENT,
            jobApplicationTalent: JOB_APPLICATION_TALENT
          }
        }
      })

      expect(mockCandidateSendingApplicantSkillsLoader).not.toHaveBeenCalled()
      expect(mockSkillSetField).toHaveBeenCalledWith(
        {
          talentType: TALENT_TYPE,
          skills: [TALENT_SKILL_SET],
          highlightedSkillIds: ['2', '4']
        },
        expect.anything()
      )
    })
  })
})
