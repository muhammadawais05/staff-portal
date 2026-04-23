import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { FieldRenderProps } from '@toptal/picasso-forms'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetSearchBarSkillsAutocomplete } from '@staff-portal/skills'
import { buildSearchBarSkillMock } from '@staff-portal/skills/src/mocks'

import RequestSkills from './RequestSkills'

jest.mock('@staff-portal/data-layer-service')

jest.mock('@staff-portal/skills', () => ({
  ...jest.requireActual('@staff-portal/skills'),
  useGetSearchBarSkillsAutocomplete: jest.fn()
}))

const TEST_NAME = 'skills'
const mockGetSearchBarSkillsAutocomplete =
  useGetSearchBarSkillsAutocomplete as jest.Mock

type Props = {
  onChange?: () => void
  onBlur?: () => void
  onFocus?: () => void
  skillName?: string
}

const noop = () => {}
const createSkillsList = ({
  onChange = noop,
  onBlur = noop,
  onFocus = noop,
  skillName = 'Javascript'
}: Props = {}): FieldRenderProps<string[], HTMLElement> => ({
  input: {
    value: [skillName],
    onChange,
    onBlur,
    onFocus,
    name: TEST_NAME
  },
  meta: {
    error: false,
    touched: false
  }
})

const arrangeTest = (skillsList = createSkillsList()) => {
  return render(
    <TestWrapper>
      <RequestSkills skillsList={skillsList} />
    </TestWrapper>
  )
}

describe('RequestSkills', () => {
  beforeEach(() => {
    mockGetSearchBarSkillsAutocomplete.mockReturnValue({
      fetchData: () => {},
      data: [buildSearchBarSkillMock()],
      loading: false
    })
  })

  it('renders as expected and display skills list', () => {
    arrangeTest()

    expect(screen.queryByText('Javascript')).toBeInTheDocument()
    expect(screen.queryByTestId('skillsAutoSuggest')).toBeInTheDocument()
    expect(screen.queryByTestId('skillsList')).toBeInTheDocument()
  })

  it('handles skill selection', async () => {
    const onChangeMock = jest.fn()

    arrangeTest(createSkillsList({ onChange: onChangeMock }))

    const input = screen.getByTestId('skillsAutoSuggest')

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'Ru'
        }
      })
    })

    const skillSuggested = screen.getByText('Ruby')

    act(() => {
      fireEvent.click(skillSuggested)
    })

    expect(onChangeMock).toHaveBeenCalledWith(['Javascript', 'Ruby'])
  })

  it('handles skill deletion', () => {
    const onChangeMock = jest.fn()

    arrangeTest(createSkillsList({ onChange: onChangeMock }))

    act(() => {
      fireEvent.click(screen.getByLabelText('delete icon'))
    })

    expect(onChangeMock).toHaveBeenCalledWith([])
  })
})
