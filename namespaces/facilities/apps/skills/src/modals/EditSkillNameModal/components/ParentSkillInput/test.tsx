import React, { ChangeEvent, ComponentProps, useState } from 'react'
import { fireEvent, render, screen, waitFor } from '@toptal/picasso/test-utils'
import { Form } from '@toptal/picasso-forms'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { MockedResponse } from '@staff-portal/data-layer-service'

import { SkillForm } from '../../types'
import { SkillsListFragment } from '../../data'
import {
  createFailedGetParentNamesAutocompleteForSkillMock,
  createFailedGetParentNamesAutocompleteForVerticalMock,
  createSuccessfulGetParentNamesAutocompleteForSkillMock,
  createSuccessfulGetParentNamesAutocompleteForVerticalMock
} from '../../data/mocks'
import ParentSkillInput from './ParentSkillInput'

// A wrapper component for testing so that we can simulate 'change tab' event.
const ParentSkillTestWrapper = ({
  currentSkillIndex: skillIndex,
  ...rest
}: Partial<ComponentProps<typeof ParentSkillInput>>) => {
  const [currentSkillIndex, setCurrentSkillIndex] = useState(skillIndex || 0)
  const currentVerticalId = 'skill-vertical-' + currentSkillIndex + 1

  const handleChangeTab = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentSkillIndex(Number(e.target.value))
  }

  const props = {
    name: `skills[${currentSkillIndex}].parentSkillId`,
    skills: [],
    currentSkillIndex,
    currentVerticalId,
    ...rest
  }

  return (
    <>
      <ParentSkillInput {...props} />
      <Form.Input
        initialValue={currentSkillIndex}
        label='Test Change Tab'
        name='tabIndexTestInput'
        onChange={handleChangeTab}
      />
    </>
  )
}

const skillsFormData = (skills: Partial<SkillsListFragment>[]) => {
  const skillsData = skills.map(
    ({ id, isIdentifier, category, parent }): SkillForm => ({
      id,
      categoryId: category?.id as string,
      isIdentifier,
      parentSkillId: parent?.id,
      verticalId: category?.vertical?.id as string
    })
  )

  return {
    skills: skillsData
  }
}

const skills: Partial<SkillsListFragment>[] = [
  {
    id: 'skill-1',
    isIdentifier: false,
    category: {
      id: 'skill-category-1',
      title: 'Other',
      vertical: {
        id: 'skill-vertical-1',
        talentType: 'Developer'
      }
    },
    parent: {
      id: 'parent-skill-1',
      name: 'Ruby'
    }
  },
  {
    id: 'skill-2',
    isIdentifier: false,
    category: {
      id: 'skill-category-2',
      title: 'Core',
      vertical: {
        id: 'skill-vertical-2',
        talentType: 'Designer'
      }
    },
    parent: null
  }
]

const arrangeTest = (options?: {
  componentProps?: Partial<ComponentProps<typeof ParentSkillInput>>
  mocks?: MockedResponse[]
}) => {
  const formValues = skillsFormData(skills)
  const props = {
    skills,
    ...options?.componentProps
  }

  return render(
    <TestWrapperWithMocks mocks={options?.mocks}>
      <Form onSubmit={jest.fn()} initialValues={formValues}>
        <ParentSkillTestWrapper {...props} />
      </Form>
    </TestWrapperWithMocks>
  )
}

describe('ParentSkillInput', () => {
  it('renders elements with correct data', () => {
    const { container } = arrangeTest()

    expect(
      container.querySelector('input[name="skills[0].parentSkillId"]')
    ).toHaveValue('parent-skill-1')

    expect(screen.getByLabelText('Parent Skill')).toHaveValue('Ruby')
  })

  it('renders error message when searching for parent skill failed on an existing skill', async () => {
    arrangeTest({
      mocks: [
        createFailedGetParentNamesAutocompleteForSkillMock({
          skillId: skills[0].id as string,
          term: 'Rails'
        })
      ]
    })

    fireEvent.change(screen.getByLabelText('Parent Skill'), {
      target: { value: 'Rails' }
    })

    expect(
      await screen.findByText('An error occurred. Failed to load skill list.')
    ).toBeInTheDocument()
  })

  it('renders error message when searching for parent skill failed on a newly added skill', async () => {
    arrangeTest({
      componentProps: {
        name: 'skills[2].parentSkillId',
        currentSkillIndex: 2,
        currentVerticalId: 'skill-vertical-3'
      },
      mocks: [
        createFailedGetParentNamesAutocompleteForVerticalMock({
          verticalId: 'skill-vertical-3',
          term: 'Rails'
        })
      ]
    })

    fireEvent.change(screen.getByLabelText('Parent Skill'), {
      target: { value: 'Rails' }
    })

    expect(
      await screen.findByText('An error occurred. Failed to load skill list.')
    ).toBeInTheDocument()
  })

  it('sets correct input values when clearing search term or choosing Vertical Root', () => {
    const { container } = arrangeTest()

    const parentSkillInputEl = container.querySelector(
      'input[name="skills[0].parentSkillId"]'
    )
    const parentSkillSearchEl = screen.getByLabelText('Parent Skill')

    expect(parentSkillInputEl).toHaveValue('parent-skill-1')
    expect(parentSkillSearchEl).toHaveValue('Ruby')

    fireEvent.change(parentSkillSearchEl, {
      target: { value: '' }
    })

    expect(parentSkillInputEl).toHaveValue('')
  })

  it('sets correct input values when selecting a search item on an existing skill', async () => {
    const { container } = arrangeTest({
      mocks: [
        createSuccessfulGetParentNamesAutocompleteForSkillMock({
          skillId: skills[0].id as string,
          term: 'Rails'
        })
      ]
    })

    const parentSkillInputEl = container.querySelector(
      'input[name="skills[0].parentSkillId"]'
    )
    const parentSkillSearchEl = screen.getByLabelText('Parent Skill')

    fireEvent.change(parentSkillSearchEl, {
      target: { value: 'Rails' }
    })

    await waitFor(() => {
      expect(screen.getByText('Rails')).toBeInTheDocument()
    })

    // Select a search result.
    fireEvent.click(screen.getByText('Rails'))

    await waitFor(() => {
      expect(parentSkillInputEl).toHaveValue('skill-101')
      expect(parentSkillSearchEl).toHaveValue('Rails')
    })
  })

  it('sets correct input values when selecting a search item on a newly added skill', async () => {
    const { container } = arrangeTest({
      componentProps: {
        name: 'skills[2].parentSkillId',
        currentSkillIndex: 2,
        currentVerticalId: 'skill-vertical-3'
      },
      mocks: [
        createSuccessfulGetParentNamesAutocompleteForVerticalMock({
          verticalId: 'skill-vertical-3',
          term: 'Rails'
        })
      ]
    })

    const parentSkillInputEl = container.querySelector(
      'input[name="skills[2].parentSkillId"]'
    )
    const parentSkillSearchEl = screen.getByLabelText('Parent Skill')

    fireEvent.change(parentSkillSearchEl, {
      target: { value: 'Rails' }
    })

    await waitFor(() => {
      expect(screen.getByText('Rails')).toBeInTheDocument()
    })

    // Select a search result.
    fireEvent.click(screen.getByText('Rails'))

    await waitFor(() => {
      expect(parentSkillInputEl).toHaveValue('skill-101')
      expect(parentSkillSearchEl).toHaveValue('Rails')
    })
  })

  it('automatically selects the first item when losing focus', async () => {
    const { container } = arrangeTest({
      mocks: [
        createSuccessfulGetParentNamesAutocompleteForSkillMock({
          skillId: skills[0].id as string,
          term: 'Rails',
          skills: [
            {
              key: 'skills-keywords-101',
              label: 'Rails',
              labelHighlight: '{{strong}}Rails{{/strong}}',
              node: {
                id: 'skill-101'
              }
            },
            {
              key: 'skills-keywords-102',
              label: 'Rails 3',
              labelHighlight: '{{strong}}Rails{{/strong}} 3',
              node: {
                id: 'skill-102'
              }
            }
          ]
        })
      ]
    })

    const parentSkillInputEl = container.querySelector(
      'input[name="skills[0].parentSkillId"]'
    )
    const parentSkillSearchEl = screen.getByLabelText('Parent Skill')

    fireEvent.change(parentSkillSearchEl, {
      target: { value: 'Rails' }
    })

    await waitFor(() => {
      expect(screen.getAllByText('Rails')).toHaveLength(2)
    })

    // Blur the input field.
    fireEvent.blur(parentSkillSearchEl)

    await waitFor(() => {
      expect(parentSkillInputEl).toHaveValue('skill-101')
      expect(parentSkillSearchEl).toHaveValue('Rails')
    })
  })

  it('clears the invalid search term when losing focus', async () => {
    const { container } = arrangeTest({
      mocks: [
        createSuccessfulGetParentNamesAutocompleteForSkillMock({
          skillId: skills[0].id as string,
          term: 'abcde',
          skills: []
        })
      ]
    })

    const parentSkillInputEl = container.querySelector(
      'input[name="skills[0].parentSkillId"]'
    )
    const parentSkillSearchEl = screen.getByLabelText('Parent Skill')

    expect(parentSkillInputEl).toHaveValue('parent-skill-1')
    expect(parentSkillSearchEl).toHaveValue('Ruby')

    fireEvent.change(parentSkillSearchEl, {
      target: { value: 'abcde' }
    })

    // Blur the input field.
    fireEvent.blur(parentSkillSearchEl)

    await waitFor(() => {
      expect(parentSkillInputEl).toHaveValue('parent-skill-1')
      expect(parentSkillSearchEl).toHaveValue('Ruby')
    })
  })

  it('renders correct input values when switching among skills', async () => {
    const { container } = arrangeTest({
      mocks: [
        createSuccessfulGetParentNamesAutocompleteForSkillMock({
          skillId: skills[0].id as string,
          term: 'Rails'
        }),
        createSuccessfulGetParentNamesAutocompleteForSkillMock({
          skillId: skills[1].id as string,
          term: 'Rails'
        })
      ]
    })

    const parentSkillSearchEl = screen.getByLabelText('Parent Skill')
    const tabIndexInput = screen.getByLabelText('Test Change Tab')

    //
    // Skill index 0
    //
    expect(
      container.querySelector('input[name="skills[0].parentSkillId"]')
    ).toHaveValue('parent-skill-1')
    expect(parentSkillSearchEl).toHaveValue('Ruby')

    //
    // Skill index 1
    //
    fireEvent.change(tabIndexInput, {
      target: { value: 1 }
    })

    await waitFor(() => {
      expect(
        container.querySelector('input[name="skills[0].parentSkillId"]')
      ).not.toBeInTheDocument()

      expect(
        container.querySelector('input[name="skills[1].parentSkillId"]')
      ).toHaveValue('')

      expect(parentSkillSearchEl).toHaveValue('')
    })

    // Search and select a new parent skill.
    fireEvent.change(parentSkillSearchEl, {
      target: { value: 'Rails' }
    })

    await waitFor(() => {
      expect(screen.getByText('Rails')).toBeInTheDocument()
    })

    // Select a search result.
    fireEvent.click(screen.getByText('Rails'))

    await waitFor(() => {
      expect(
        container.querySelector('input[name="skills[1].parentSkillId"]')
      ).toHaveValue('skill-101')
      expect(parentSkillSearchEl).toHaveValue('Rails')
    })

    //
    // Skill index 0
    //
    fireEvent.change(tabIndexInput, {
      target: { value: 0 }
    })

    await waitFor(() => {
      expect(
        container.querySelector('input[name="skills[0].parentSkillId"]')
      ).toHaveValue('parent-skill-1')

      expect(
        container.querySelector('input[name="skills[1].parentSkillId"]')
      ).not.toBeInTheDocument()

      expect(parentSkillSearchEl).toHaveValue('Ruby')
    })

    //
    // Skill index 1
    //
    fireEvent.change(tabIndexInput, {
      target: { value: 1 }
    })

    await waitFor(() => {
      expect(
        container.querySelector('input[name="skills[0].parentSkillId"]')
      ).not.toBeInTheDocument()

      expect(
        container.querySelector('input[name="skills[1].parentSkillId"]')
      ).toHaveValue('skill-101')

      expect(parentSkillSearchEl).toHaveValue('Rails')
    })
  })
})
