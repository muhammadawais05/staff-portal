import React, { ComponentProps } from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MockedResponse, useLazyQuery } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetSearchBarSkillsAutocomplete } from '@staff-portal/skills'
import { createGetSearchBarSkillsMock } from '@staff-portal/skills/src/mocks'

import SkillsAutoSuggest from './SkillsAutoSuggest'
import { SEARCH_TYPES } from '../../types'

jest.mock('@staff-portal/data-layer-service')

const mockedUseLazyQuery = useLazyQuery as jest.Mock
const mockedRequest = jest.fn()
const handleSelect = () => { }

const arrangeTest = ({
  mocks = [],
  queryProps = {
    loading: false
  },
  componentProps
}: {
  mocks?: MockedResponse[]
  queryProps?: Partial<ReturnType<typeof useGetSearchBarSkillsAutocomplete>>
  componentProps?: Partial<ComponentProps<typeof SkillsAutoSuggest>>
}) => {
  mockedUseLazyQuery.mockImplementation(() => [
    mockedRequest,
    {
      ...mocks[0].result,
      ...queryProps
    }
  ])

  render(
    <TestWrapper>
      <SkillsAutoSuggest
        searchType={SEARCH_TYPES.SKILLS}
        initialValue=''
        placeholder='Search for...'
        endAdornment={<span>Some node</span>}
        searchTypeDropdownOpen={false}
        onSelect={componentProps?.onSelect || handleSelect}
        {...componentProps}
      />
    </TestWrapper>
  )
}

describe('SkillsAutoSuggest', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  it('renders suggestions', async () => {
    const onChangeMock = jest.fn()

    arrangeTest({
      mocks: [createGetSearchBarSkillsMock()],
      componentProps: {
        onChange: onChangeMock
      }
    })

    const input = screen.getByTestId('skillsAutoSuggest')

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'Ru'
        }
      })
    })

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledWith('Ru')
      expect(screen.getByText('Ruby')).toBeInTheDocument()
      expect(screen.getByText('Ruby on Rails')).toBeInTheDocument()
    })
  })

  describe('when selecting a suggestion', () => {
    it('calls onSelect', async () => {
      const onSelect = jest.fn()

      arrangeTest({
        mocks: [createGetSearchBarSkillsMock()],
        componentProps: { onSelect }
      })

      const value = 'Ruby'

      const changeInput = async () => {
        const input = screen.getByTestId('skillsAutoSuggest')

        act(() => {
          fireEvent.change(input, { target: { value } })
        })

        await waitFor(() => {
          expect(screen.getAllByText(value, { exact: false })).toHaveLength(2)
        })
      }

      // Pick the first element - skill
      await changeInput()
      fireEvent.click(screen.getAllByText(value)[0])

      await waitFor(() => {
        expect(onSelect).toHaveBeenCalledWith(SEARCH_TYPES.SKILLS, value)
      })
    })
  })

  describe('when pressing enter', () => {
    it('calls onSelect', async () => {
      const onSelect = jest.fn()

      arrangeTest({
        mocks: [createGetSearchBarSkillsMock()],
        componentProps: { onSelect }
      })

      const input = screen.getByTestId('skillsAutoSuggest')
      const value = 'Ruby'

      fireEvent.change(input, {
        target: {
          value
        }
      })

      fireEvent.keyDown(input, {
        key: 'Enter',
        code: 'Enter',
        keyCode: 13,
        charCode: 13
      })

      await waitFor(() => {
        expect(onSelect).toHaveBeenCalledWith(SEARCH_TYPES.SKILLS, value)
      })
    })
  })

  describe('when there are no available options', () => {
    it('shows no options in case of no suggestions and shows nothing if empty search string', async () => {
      const onSelect = jest.fn()

      arrangeTest({
        mocks: [createGetSearchBarSkillsMock(false)],
        componentProps: {
          onSelect
        }
      })

      const input = screen.getByTestId('skillsAutoSuggest')

      fireEvent.change(input, { target: { value: 'Ruby' } })

      await waitFor(() => {
        expect(screen.queryByText('No options')).toBeInTheDocument()
      })

      fireEvent.change(input, { target: { value: '' } })

      await waitFor(() => {
        expect(screen.queryByText('No options')).not.toBeInTheDocument()
      })
    })
  })
})
