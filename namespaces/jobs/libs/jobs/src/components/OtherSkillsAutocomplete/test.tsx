import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form, useFieldArray, useField } from '@toptal/picasso-forms'
import { useGetVerticalSkillsAutocomplete } from '@staff-portal/skills'
import { useDebouncedAutocomplete } from '@staff-portal/utils'

import OtherSkillsAutocomplete, { Props } from './OtherSkillsAutocomplete'

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useFieldArray: jest.fn(),
  useField: jest.fn()
}))

jest.mock('@staff-portal/skills', () => ({
  ...jest.requireActual('@staff-portal/skills'),
  useGetVerticalSkillsAutocomplete: jest.fn()
}))

jest.mock('@staff-portal/utils', () => ({
  ...jest.requireActual('@staff-portal/utils'),
  useDebouncedAutocomplete: jest.fn()
}))

const mockDebouncedAutocomplete = useDebouncedAutocomplete as jest.Mock
const mockUseGetVerticalSkillsAutocomplete =
  useGetVerticalSkillsAutocomplete as jest.Mock
const useFieldArrayMock = useFieldArray as jest.Mock
const useFieldMock = useField as jest.Mock

const arrangeTest = (props: Props) => {
  mockUseGetVerticalSkillsAutocomplete.mockReturnValue({
    getVerticalSkills: jest.fn(),
    loading: false,
    data: {}
  })

  useFieldArrayMock.mockReturnValue({
    fields: { push: () => {}, remove: () => {}, value: [] },
    meta: { submitError: [null] }
  })
  useFieldMock.mockReturnValue({ meta: { invalid: false } })

  mockDebouncedAutocomplete.mockReturnValue({
    search: jest.fn(),
    searching: false,
    searchTerm: '',
    setSearchTerm: jest.fn(),
    searchOptions: [
      {
        key: 'skills-keywords-82774',
        label: 'ACCA',
        labelHighlight: '{{strong}}A{{/strong}}CCA {{strong}}A{{/strong}}FM',
        node: {
          id: 'VjEtU2tpbGwtODI3NzQ',
          name: 'ACCA AFM',
          competentProfilesCount: 0,
          expertProfilesCount: 0,
          strongProfilesCount: 0,
          totalProfilesCount: 0,
          category: {
            id: 'VjEtU2tpbGxDYXRlZ29yeS00MQ',
            title: 'Other',
            description: "Skills that don't fit into other categories",
            position: 18
          }
        }
      }
    ]
  })

  render(
    <TestWrapper>
      <Form onSubmit={jest.fn()}>
        <OtherSkillsAutocomplete {...props} />
      </Form>
    </TestWrapper>
  )
}

describe('OtherSkillsAutocomplete', () => {
  it('renders the skills autocomplete', () => {
    const onChange = jest.fn()

    arrangeTest({
      defaultSkillCategoryId: '1',
      defaultSkillCategoryTitle: 'Developer',
      onChange,
      label: 'test',
      name: 'test',
      hint: 'test',
      placeholder: 'test',
      requiredDecoration: true,
      verticalId: '1',
      titleCase: true
    })

    expect(screen.getByTestId('other-skills-autocomplete')).toBeInTheDocument()

    fireEvent.change(screen.getByTestId('other-skills-autocomplete'), {
      target: {
        value: 'Ru'
      }
    })
    fireEvent.click(screen.getByText(/CCA/i))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith({
      addedAt: expect.any(String),
      destroy: false,
      main: false,
      niceToHave: true,
      rating: 'COMPETENT',
      skill: {
        category: {
          description: "Skills that don't fit into other categories",
          id: 'VjEtU2tpbGxDYXRlZ29yeS00MQ',
          position: 18,
          title: 'Other'
        },
        competentProfilesCount: 0,
        expertProfilesCount: 0,
        id: 'VjEtU2tpbGwtODI3NzQ',
        name: 'ACCA AFM',
        strongProfilesCount: 0,
        totalProfilesCount: 0
      }
    })
  })
})
