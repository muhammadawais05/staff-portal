import { useGetVerticalSkillsAutocomplete } from '@staff-portal/skills'
import { stringListToOptions } from '@staff-portal/string'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'
import {
  fireEvent,
  getByRole,
  render,
  screen
} from '@toptal/picasso/test-utils'
import React from 'react'

import { DraftJobFormFields } from '../../../../enums/DraftJobFormFields'
import { DraftJobSkillSetFragment } from '../../../DraftJobSection/data/draft-job-skill-set-fragment'
import { VerticalFragment } from '../../../DraftJobSection/data/vertical-fragment'
import DraftJobFormSkillsField from './SkillsField'

jest.mock('@staff-portal/skills')
const mockUseGetVerticalSkillsAutocomplete =
  useGetVerticalSkillsAutocomplete as jest.Mock

type VerticalType = {
  node: VerticalFragment
  skillSets: {
    nodes: DraftJobSkillSetFragment[]
  }
}

const VERTICALS: VerticalType[] = [
  {
    node: {
      id: '1',
      talentType: 'Developer',
      defaultSkillCategory: { id: '1' }
    },
    skillSets: {
      nodes: [
        { skillName: 'Developer Skill' } as DraftJobSkillSetFragment,
        { skillName: 'Some Skill' } as DraftJobSkillSetFragment
      ]
    }
  },
  {
    node: {
      id: '2',
      talentType: 'Designer',
      defaultSkillCategory: { id: '2' }
    },
    skillSets: {
      nodes: [
        { skillName: 'Designer Skill' } as DraftJobSkillSetFragment,
        { skillName: 'Some Skill' } as DraftJobSkillSetFragment
      ]
    }
  }
]

const renderComponent = (verticals = VERTICALS) => {
  mockUseGetVerticalSkillsAutocomplete.mockReturnValue({
    getVerticalSkills: jest.fn(),
    loading: false,
    data: []
  })

  const initialValue = {
    [DraftJobFormFields.VerticalId]: verticals?.[0]?.node.id,
    [DraftJobFormFields.Skills]: stringListToOptions(
      verticals?.[0]?.skillSets.nodes.map(({ skillName }) => skillName)
    )
  }

  const verticalOptions = verticals.map(({ node: { id, talentType } }) => ({
    text: talentType,
    value: id
  }))

  return render(
    <TestWrapper>
      <Form initialValues={initialValue} onSubmit={() => {}}>
        <Form.Select
          name={DraftJobFormFields.VerticalId}
          placeholder='Type of Talent'
          width='full'
          options={verticalOptions}
        />

        <DraftJobFormSkillsField verticals={{ edges: verticals }} />
      </Form>
    </TestWrapper>
  )
}

describe('DraftJobFormSkillsField', () => {
  describe('when changing vertical', () => {
    it('shows the vertical skills', async () => {
      renderComponent()

      expect(screen.getByText('Developer Skill')).toBeInTheDocument()
      expect(screen.getByText('Some Skill')).toBeInTheDocument()

      fireEvent.click(screen.getByPlaceholderText('Type of Talent'))
      fireEvent.click(screen.getByText('Designer'))

      expect(await screen.findByText('Designer Skill')).toBeInTheDocument()
      expect(screen.getByText('Some Skill')).toBeInTheDocument()
      expect(screen.queryByText('Developer Skill')).not.toBeInTheDocument()
    })
  })

  describe('when removing a skill', () => {
    it('removes the selected skills from all verticals', async () => {
      renderComponent()

      const fromLabel = screen
        .getByText('Some Skill')
        .closest<HTMLElement>('[role="button"]')!

      fireEvent.click(getByRole(fromLabel, 'button', { name: 'delete icon' }))

      fireEvent.click(screen.getByPlaceholderText('Type of Talent'))
      fireEvent.click(screen.getByText('Designer'))

      expect(await screen.findByText('Designer Skill')).toBeInTheDocument()
      expect(screen.queryByText('Some Skill')).not.toBeInTheDocument()
    })
  })

  describe('when adding a new skill', () => {
    it('adds to the skill to all the verticals', async () => {
      renderComponent([
        {
          node: {
            id: '1',
            talentType: 'Developer',
            defaultSkillCategory: { id: '1' }
          },
          skillSets: {
            nodes: []
          }
        },
        {
          node: {
            id: '2',
            talentType: 'Designer',
            defaultSkillCategory: { id: '2' }
          },
          skillSets: {
            nodes: [{ skillName: 'Designer Skill' } as DraftJobSkillSetFragment]
          }
        }
      ])

      fireEvent.change(screen.getByPlaceholderText('Enter a required skill'), {
        target: { value: 'Skill one' }
      })

      fireEvent.click(await screen.findByText('Add new option:'))

      expect(await screen.findByText('Skill one')).toBeInTheDocument()

      fireEvent.click(screen.getByPlaceholderText('Type of Talent'))
      fireEvent.click(screen.getByText('Designer'))

      expect(await screen.findByText('Designer Skill')).toBeInTheDocument()
      expect(screen.getByText('Skill one')).toBeInTheDocument()
    })
  })
})
