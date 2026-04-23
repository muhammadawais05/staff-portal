import { Form } from '@toptal/picasso-forms'
import { fireEvent, render, screen, within } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { ApplicantSkillsAutocompleteFragment } from '../../data/get-talent-applicant-skills-autocomplete'
import { useGetTalentApplicationSkillsAutoComplete } from '../../data'
import TalentApplicantSkillsSelector from './TalentApplicantSkillsSelector'
import { Skill } from './types'

jest.mock('../../data', () => ({
  __esModule: true,
  useGetTalentApplicationSkillsAutoComplete: jest.fn()
}))

const mockDataWithSuccessResponse = (
  skills: ApplicantSkillsAutocompleteFragment[] = []
) => {
  const mock = useGetTalentApplicationSkillsAutoComplete as jest.Mock

  mock.mockReturnValue({ request: jest.fn(), data: skills, loading: false })
}

const arrangeTest = ({ skills = [] }: Partial<{ skills?: Skill[] }> = {}) =>
  render(
    <TestWrapper>
      <Form initialValues={{ skills }} onSubmit={() => {}}>
        <TalentApplicantSkillsSelector
          name='skills'
          talentOrVerticalId='VjEtVGFsZW50LTI3ODE1MjU'
        />
      </Form>
    </TestWrapper>
  )

describe('TalentApplicantSkillsSelector', () => {
  it('shows initial selected skills', () => {
    mockDataWithSuccessResponse()
    arrangeTest({
      skills: [
        { id: '1', name: 'Skill 1' },
        { id: '2', name: 'Skill 2' }
      ]
    })

    expect(screen.getByTestId('selected-skill-Skill 1')).toBeInTheDocument()
    expect(screen.getByTestId('selected-skill-Skill 2')).toBeInTheDocument()
  })

  describe('when remove a skill', () => {
    it('removes the skill from the list', () => {
      mockDataWithSuccessResponse()
      arrangeTest({
        skills: [
          { id: '1', name: 'Skill 1' },
          { id: '2', name: 'Skill 2' }
        ]
      })

      fireEvent.click(
        within(screen.getByTestId('selected-skill-Skill 1')).getByRole('button')
      )

      expect(screen.getByTestId('selected-skill-Skill 2')).toBeInTheDocument()
      expect(
        screen.queryByTestId('selected-skill-Skill 1')
      ).not.toBeInTheDocument()
    })
  })

  describe('when click', () => {
    it('shows the options', async () => {
      mockDataWithSuccessResponse([
        {
          key: '1',
          labelHighlight: '{{strong}}Skill{{/strong}} 1',
          node: { id: '1', name: 'Skill 1' }
        },
        {
          key: '2',
          labelHighlight: '{{strong}}Skill{{/strong}} 2',
          node: { id: '2', name: 'Skill 2' }
        }
      ])
      arrangeTest()

      fireEvent.click(
        screen.getByPlaceholderText('Select skills from autocomplete')
      )

      const labels = await screen.findAllByTestId('go-to-user-label')

      expect(labels[0]).toHaveTextContent('Skill 1')
      expect(labels[1]).toHaveTextContent('Skill 2')
    })

    it('selecting an item', async () => {
      mockDataWithSuccessResponse([
        {
          key: '1',
          labelHighlight: '{{strong}}Skill{{/strong}} 1',
          node: { id: '1', name: 'Skill 1' }
        },
        {
          key: '2',
          labelHighlight: '{{strong}}Skill{{/strong}} 2',
          node: { id: '2', name: 'Skill 2' }
        }
      ])
      arrangeTest()

      fireEvent.click(
        screen.getByPlaceholderText('Select skills from autocomplete')
      )

      const labels = await screen.findAllByTestId('go-to-user-label')

      fireEvent.click(labels[0])

      expect(
        await screen.findByTestId('selected-skill-Skill 1')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('go-to-user-label')).not.toBeInTheDocument()
    })
  })
})
