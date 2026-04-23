import React from 'react'
import {
  act,
  render,
  screen,
  fireEvent,
  getByText,
  getByTestId,
  getByRole
} from '@testing-library/react'
import { useApolloClient } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import SearchBar from './SearchBar'
import {
  SearchBarCategories,
  AutocompleteSearchBarCategory,
  MultiAutocompleteSearchBarCategory,
  SearchBarCategory
} from './types'
import Filters from '../Filters'

jest.mock('@apollo/client')

type AutocompleteOption = {
  key: string
  label: string
  node: { id: string }
  entityType?: string
}

const getKeywordOptions = (value: string) =>
  Promise.resolve({
    data:
      value === ''
        ? []
        : [
            { key: 1, node: { id: 1 }, label: 'Keyword 1' },
            { key: 2, node: { id: 2 }, label: 'Keyword 2' },
            { key: 3, node: { id: 3 }, label: 'Keyword 3' },
            { key: 4, node: { id: 4 }, label: 'Keyword 4' },
            { key: 5, node: { id: 5 }, label: 'Keyword 5' }
          ]
  })

const getNameOptions = (value: string) =>
  Promise.resolve({
    data:
      value === ''
        ? []
        : [
            { key: 1, node: { id: 1 }, label: 'John' },
            { key: 2, node: { id: 2 }, label: 'Jane' },
            { key: 3, node: { id: 3 }, label: 'Martin' },
            { key: 4, node: { id: 4 }, label: 'Alex' },
            { key: 5, node: { id: 5 }, label: 'Pavel' }
          ]
  })

const getSkillOptions = (value: string) =>
  Promise.resolve({
    data:
      value === ''
        ? []
        : [
            { key: 1, node: { id: 1 }, label: 'Javascript' },
            { key: 2, node: { id: 2 }, label: 'PHP' },
            { key: 3, node: { id: 3 }, label: 'CSS' }
          ]
  })

const getEverythingOptions = (value: string) =>
  Promise.resolve({
    data:
      value === ''
        ? []
        : [
            {
              key: 1,
              node: { id: 1 },
              label: 'Javascript',
              entityType: 'skill'
            },
            { key: 2, node: { id: 2 }, label: 'John', entityType: 'user' },
            { key: 3, node: { id: 3 }, label: 'Jade', entityType: 'other' }
          ]
  })

const TEST_CATEGORIES: SearchBarCategories = [
  {
    type: 'autocomplete',
    numberOfAutocompleteResults: 3,
    name: 'keywords',
    label: 'keywords',
    toQueryParam: value => value,
    fromOption: ({ label }) => label,
    getKey: value => value,
    getOptions: getKeywordOptions,
    getOptionKey: ({ key }) => key,
    renderOption: ({ label }) => (
      <div data-testid={`test-keyword-option-${label}`}>{label}</div>
    ),
    fromInputValue: value => `input:${value}`,
    getBadgeLabel: value => value
  } as AutocompleteSearchBarCategory<string, AutocompleteOption>,
  {
    name: 'skills',
    numberOfAutocompleteResults: 3,
    toQueryParam: ({ name }) => name,
    fromOption: ({ label }) => ({
      name: label,
      rating: 'COMPETENT'
    }),
    getKey: value => value.name,
    getOptions: getSkillOptions,
    getOptionKey: ({ key }) => key,
    renderOption: ({ label }) => (
      <div data-testid={`test-skill-option-${label}`}>{label}</div>
    ),
    getBadgeLabel: ({ name }) => name,
    BadgeComponent: ({
      value: { name, rating },
      onBadgeChange,
      onBadgeDelete
    }) => (
      <div
        data-testid={`skill-${name}`}
        onClick={() => onBadgeChange({ name, rating: 'STRONG' })}
      >
        {name} - {rating}
        <div data-testid='delete' onClick={() => onBadgeDelete()} />
      </div>
    )
  } as AutocompleteSearchBarCategory<
    { name: string; rating: string },
    AutocompleteOption
  >,
  {
    type: 'autocomplete',
    numberOfAutocompleteResults: 4,
    name: 'names',
    label: 'user names',
    toQueryParam: ({ id }) => id,
    fromOption: ({ node: { id }, label }) => ({ id, name: label }),
    getKey: ({ id }) => id,
    getOptions: getNameOptions,
    getOptionKey: ({ key }) => key,
    renderOption: ({ node, label }) => (
      <div data-testid={`test-name-option-${node.id}`}>{label}</div>
    ),
    getBadgeLabel: ({ id, name }) => `${name}-${id}`
  } as AutocompleteSearchBarCategory<
    { id: string; name: string },
    AutocompleteOption
  >,
  {
    type: 'input',
    name: 'ids',
    label: 'IDS',
    getKey: value => value,
    getBadgeLabel: value => `ID: ${value}`,
    toQueryParam: value => value,
    fromInputValue: value => value
  } as SearchBarCategory<string>,
  {
    type: 'multi-autocomplete',
    numberOfAutocompleteResults: 4,
    name: 'other',
    label: 'everything',
    toQueryParam: ({ id }) => id,
    fromOption: option => {
      const {
        node: { id },
        label,
        entityType
      } = option

      if (entityType === 'user') {
        const category = TEST_CATEGORIES.find(
          ({ name }) => name === 'names'
        ) as AutocompleteSearchBarCategory

        return { category, value: category.fromOption(option) }
      } else if (entityType === 'skill') {
        const category = TEST_CATEGORIES.find(
          ({ name }) => name === 'skills'
        ) as AutocompleteSearchBarCategory

        return { category, value: category.fromOption(option) }
      }

      const category = TEST_CATEGORIES.find(
        ({ name }) => name === 'other'
      ) as MultiAutocompleteSearchBarCategory
      const value = { id, name: label }

      return { category, value }
    },
    getKey: ({ id }) => id,
    getOptions: getEverythingOptions,
    getOptionKey: ({ key }) => key,
    renderOption: ({ node, label }) => (
      <div data-testid={`test-everything-option-${node.id}`}>{label}</div>
    ),
    getBadgeLabel: ({ id, name }) => `${name}-${id}`
  } as MultiAutocompleteSearchBarCategory<
    { id: string; name: string },
    AutocompleteOption,
    { id: string; name: string }
  >
]

const arrangeTest = (
  values: Record<string, unknown>,
  onFiltersChange: (values: Record<string, unknown>) => void = jest.fn()
) =>
  render(
    <TestWrapper>
      <Filters values={values} onChange={onFiltersChange}>
        {nestableControls => (
          <SearchBar
            name='badges'
            categories={TEST_CATEGORIES}
            nestableControls={nestableControls}
          />
        )}
      </Filters>
    </TestWrapper>
  )

const mockedUseApolloClient = useApolloClient as jest.Mock

describe('Search Bar', () => {
  beforeEach(() => {
    mockedUseApolloClient.mockReturnValue({})
  })

  it('injects nestable controls', () => {
    arrangeTest({})
    const searchBarWrapper = screen.getByTestId('filters-search-bar')

    expect(
      getByTestId(searchBarWrapper, 'toggle-filters-form')
    ).toBeInTheDocument()
  })

  it('does NOT render search logic if there are NO selected badges', () => {
    arrangeTest({})

    expect(screen.queryByDisplayValue('and')).not.toBeInTheDocument()
    expect(screen.queryByDisplayValue('or')).not.toBeInTheDocument()
  })

  it('renders search logic if there are selected badges, AND logic selected by default', () => {
    arrangeTest({
      badges: {
        keywords: ['Keyword 1'],
        names: ['Alex']
      }
    })

    expect(screen.getByDisplayValue('and')).toBeInTheDocument()
    expect(screen.getByDisplayValue('or')).toBeInTheDocument()

    expect(screen.getByDisplayValue('and')).toHaveAttribute('checked')
    expect(screen.getByDisplayValue('or')).not.toHaveAttribute('checked')
  })

  it('allows changing search logic if there are selected badges', async () => {
    const onFiltersChange = jest.fn()
    const badges = {
      keywords: ['Keyword 1'],
      names: ['Alex']
    }

    arrangeTest({ badges }, onFiltersChange)

    await act(async () => {
      fireEvent.click(screen.getByDisplayValue('or'))
    })

    expect(onFiltersChange).toHaveBeenCalledWith({ badges, logic: 'or' })
  })

  it('renders first provided search category as active', () => {
    arrangeTest({})

    expect(
      screen.getByPlaceholderText('Filter by keywords')
    ).toBeInTheDocument()
  })

  it('renders categories dropdown menu', async () => {
    arrangeTest({})

    await act(async () => {
      fireEvent.click(screen.getByText(/keywords/i))
    })

    const dropdownMenu = screen.getByTestId('search-categories-dropdown')

    expect(getByText(dropdownMenu, 'Keywords')).toBeInTheDocument()
    expect(getByText(dropdownMenu, 'User Names')).toBeInTheDocument()
    expect(getByText(dropdownMenu, 'IDS')).toBeInTheDocument()
  })

  it('allows changing active search category with dropdown', async () => {
    arrangeTest({})

    await act(async () => {
      fireEvent.click(screen.getByText(/keywords/i))
    })

    let dropdownMenu = screen.getByTestId('search-categories-dropdown')

    await act(async () => {
      fireEvent.click(getByText(dropdownMenu, 'User Names'))
    })

    expect(
      screen.getByPlaceholderText('Filter by user names')
    ).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(screen.getByText(/user names/i))
    })

    dropdownMenu = screen.getByTestId('search-categories-dropdown')

    await act(async () => {
      fireEvent.click(getByText(dropdownMenu, 'IDS'))
    })

    expect(screen.getByPlaceholderText('Filter by IDS')).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(screen.getByText('IDS'))
    })

    dropdownMenu = screen.getByTestId('search-categories-dropdown')

    await act(async () => {
      fireEvent.click(getByText(dropdownMenu, 'Keywords'))
    })

    expect(
      screen.getByPlaceholderText('Filter by keywords')
    ).toBeInTheDocument()
  })

  it('renders badge based on category `getBadgeLabel` property', () => {
    const { container } = arrangeTest({
      badges: {
        ids: ['555'],
        keywords: ['Keyword 2', 'Keyword 3'],
        names: [
          { id: 1, name: 'John' },
          { id: 5, name: 'Alex' }
        ]
      }
    })

    expect(container.textContent).toContain('"ID: 555" IDS')
    expect(container.textContent).toContain('"Keyword 2" keywords')
    expect(container.textContent).toContain('"Keyword 3" keywords')
    expect(container.textContent).toContain('"John-1" user names')
    expect(container.textContent).toContain('"Alex-5" user names')
  })

  it('renders custom badges based on category `BadgeComponent` property', () => {
    arrangeTest({
      badges: {
        skills: [
          { name: 'Javascript', rating: 'STRONG' },
          { name: 'PHP', rating: 'COMPETENT' }
        ]
      }
    })

    expect(screen.getByText('Javascript - STRONG')).toBeInTheDocument()
    expect(screen.getByText('PHP - COMPETENT')).toBeInTheDocument()
  })

  it('allows removing the badge', async () => {
    const onFilterChange = jest.fn()

    arrangeTest(
      {
        badges: {
          ids: ['555']
        }
      },
      onFilterChange
    )

    const badge = screen
      .getByTestId('search-bar-badge')
      .closest<HTMLElement>('[role="button"]')!

    await act(async () => {
      fireEvent.click(getByRole(badge, 'button', { name: 'delete icon' }))
    })

    expect(onFilterChange).toHaveBeenCalledWith({
      badges: { ids: [] }
    })
  })

  it('allows removing custom badges', async () => {
    const onFilterChange = jest.fn()

    arrangeTest(
      {
        badges: {
          skills: [
            { name: 'Javascript', rating: 'STRONG' },
            { name: 'PHP', rating: 'COMPETENT' }
          ]
        }
      },
      onFilterChange
    )

    const badge = screen.getByTestId(`skill-Javascript`)

    await act(async () => {
      fireEvent.click(getByTestId(badge, 'delete'))
    })

    expect(onFilterChange).toHaveBeenCalledWith({
      badges: {
        skills: [{ name: 'PHP', rating: 'COMPETENT' }]
      }
    })
  })

  it('allows changing custom badge filters', async () => {
    const onFilterChange = jest.fn()

    arrangeTest(
      {
        badges: {
          skills: [
            { name: 'Javascript', rating: 'COMPETENT' },
            { name: 'PHP', rating: 'COMPETENT' }
          ]
        }
      },
      onFilterChange
    )

    await act(async () => {
      fireEvent.click(screen.getByTestId(`skill-Javascript`))
    })

    expect(onFilterChange).toHaveBeenCalledWith({
      badges: {
        skills: [
          { name: 'Javascript', rating: 'STRONG' },
          { name: 'PHP', rating: 'COMPETENT' }
        ]
      }
    })
  })

  describe('Input values search', () => {
    it('allows specifying search values right from the text input (by pressing Enter)', async () => {
      const onFiltersChange = jest.fn()

      arrangeTest({}, onFiltersChange)

      await act(async () => {
        fireEvent.click(screen.getByText(/keywords/i))
      })

      const dropdownMenu = screen.getByTestId('search-categories-dropdown')

      await act(async () => {
        fireEvent.click(getByText(dropdownMenu, 'IDS'))
      })

      const input = screen.getByPlaceholderText('Filter by IDS')

      await act(async () => {
        fireEvent.input(input, { target: { value: '555' } })
      })

      await act(async () => {
        fireEvent.keyDown(input, { key: 'Enter' })
      })

      expect(onFiltersChange).toHaveBeenCalledWith({
        badges: {
          ids: ['555']
        }
      })
    })

    it('allows resetting search input by pressing Esc', async () => {
      const onFiltersChange = jest.fn()

      arrangeTest({}, onFiltersChange)

      await act(async () => {
        fireEvent.click(screen.getByText(/keywords/i))
      })

      const dropdownMenu = screen.getByTestId('search-categories-dropdown')

      await act(async () => {
        fireEvent.click(getByText(dropdownMenu, 'IDS'))
      })

      const input = screen.getByPlaceholderText('Filter by IDS')

      await act(async () => {
        fireEvent.input(input, { target: { value: '555' } })
        fireEvent.keyDown(input, { key: 'Esc' })
      })

      expect(input).toHaveValue('')
      expect(onFiltersChange).not.toHaveBeenCalled()
    })
  })

  describe('Autocomplete search WITH ability to specify input value', () => {
    it('queries autocomplete with category `getOptions` property and renders N returned options with `renderOption` component (N is specified by `numberOfAutocompleteResults` property)', async () => {
      arrangeTest({})

      expect(
        screen.queryByTestId('test-keyword-option-Keyword 1')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('test-keyword-option-Keyword 2')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('test-keyword-option-Keyword 5')
      ).not.toBeInTheDocument()

      const input = screen.getByPlaceholderText('Filter by keywords')

      await act(async () => {
        fireEvent.change(input, { target: { value: 'Key' } })
      })

      await screen.findByTestId('test-keyword-option-Keyword 1')

      expect(
        screen.getByTestId('test-keyword-option-Keyword 1')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('test-keyword-option-Keyword 2')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('test-keyword-option-Keyword 3')
      ).toBeInTheDocument()

      expect(
        screen.queryByTestId('test-keyword-option-Keyword 4')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('test-keyword-option-Keyword 5')
      ).not.toBeInTheDocument()
    })

    it('allows selecting value from the dropdown, value is extracted with `fromOption` category property', async () => {
      const onFilterChange = jest.fn()

      arrangeTest({}, onFilterChange)

      const input = screen.getByPlaceholderText('Filter by keywords')

      await act(async () => {
        fireEvent.change(input, { target: { value: 'Key' } })
      })

      await screen.findByTestId('test-keyword-option-Keyword 1')

      await act(async () => {
        fireEvent.click(screen.getByTestId('test-keyword-option-Keyword 2'))
      })

      expect(onFilterChange).toHaveBeenCalledWith({
        badges: {
          keywords: ['Keyword 2']
        }
      })
    })

    it('allows adding input value from the autocomplete, converts it with `fromInputValue` property', async () => {
      const onFilterChange = jest.fn()

      arrangeTest({}, onFilterChange)

      const input = screen.getByPlaceholderText('Filter by keywords')

      await act(async () => {
        fireEvent.change(input, { target: { value: 'Keyword X' } })
      })

      await screen.findByTestId('test-keyword-option-Keyword 1')

      await act(async () => {
        fireEvent.click(screen.getByText('Search for: Keyword X'))
      })

      expect(onFilterChange).toHaveBeenCalledWith({
        badges: {
          keywords: ['input:Keyword X']
        }
      })
    })
  })

  describe('Autocomplete search WITHOUT ability to provide input value', () => {
    it('queries autocomplete with category `getOptions` property and renders N returned options with `renderOption` component (N is specified by `numberOfAutocompleteResults` property)', async () => {
      arrangeTest({})

      await act(async () => {
        fireEvent.click(screen.getByText(/keywords/i))
      })

      const dropdownMenu = screen.getByTestId('search-categories-dropdown')

      await act(async () => {
        fireEvent.click(getByText(dropdownMenu, 'User Names'))
      })

      expect(screen.queryByTestId('test-name-option-1')).not.toBeInTheDocument()
      expect(screen.queryByTestId('test-name-option-2')).not.toBeInTheDocument()
      expect(screen.queryByTestId('test-name-option-3')).not.toBeInTheDocument()
      expect(screen.queryByTestId('test-name-option-4')).not.toBeInTheDocument()
      expect(screen.queryByTestId('test-name-option-5')).not.toBeInTheDocument()

      const input = screen.getByPlaceholderText('Filter by user names')

      await act(async () => {
        fireEvent.change(input, { target: { value: 'User' } })
      })

      await screen.findByTestId('test-name-option-1')

      expect(screen.getByTestId('test-name-option-1')).toBeInTheDocument()
      expect(screen.getByTestId('test-name-option-2')).toBeInTheDocument()
      expect(screen.getByTestId('test-name-option-3')).toBeInTheDocument()
      expect(screen.getByTestId('test-name-option-4')).toBeInTheDocument()
      expect(screen.queryByTestId('test-name-option-5')).not.toBeInTheDocument()
    })

    it('allows selecting value from the autocomplete, value is extracted with `fromOption` category property', async () => {
      const onFilterChange = jest.fn()

      arrangeTest({}, onFilterChange)

      await act(async () => {
        fireEvent.click(screen.getByText(/keywords/i))
      })

      const dropdownMenu = screen.getByTestId('search-categories-dropdown')

      await act(async () => {
        fireEvent.click(getByText(dropdownMenu, 'User Names'))
      })

      const input = screen.getByPlaceholderText('Filter by user names')

      await act(async () => {
        fireEvent.change(input, { target: { value: 'User' } })
      })

      await screen.findByTestId('test-name-option-1')

      await act(async () => {
        fireEvent.click(screen.getByTestId('test-name-option-3'))
      })

      expect(onFilterChange).toHaveBeenCalledWith({
        badges: {
          names: [{ id: 3, name: 'Martin' }]
        }
      })
    })

    describe('multi-autocomplete categories which allow selecting values for other categories, value is extracted with `fromOption` category property', () => {
      let onFilterChange: jest.Mock

      beforeEach(async () => {
        onFilterChange = jest.fn()

        arrangeTest({}, onFilterChange)

        await act(async () => {
          fireEvent.click(screen.getByText(/keywords/i))
        })

        const dropdownMenu = screen.getByTestId('search-categories-dropdown')

        await act(async () => {
          fireEvent.click(getByText(dropdownMenu, 'Everything'))
        })

        const input = screen.getByPlaceholderText('Filter by everything')

        await act(async () => {
          fireEvent.change(input, { target: { value: 'User' } })
        })

        await screen.findByTestId('test-everything-option-1')
      })

      it('allows adding to custom category based on the `fromOption` logic', async () => {
        await act(async () => {
          fireEvent.click(screen.getByTestId('test-everything-option-1'))
        })

        expect(onFilterChange).toHaveBeenCalledWith({
          badges: {
            skills: [{ name: 'Javascript', rating: 'COMPETENT' }]
          }
        })
      })

      it('allows adding to the multi-category itself', async () => {
        await act(async () => {
          fireEvent.click(screen.getByTestId('test-everything-option-3'))
        })

        expect(onFilterChange).toHaveBeenCalledWith({
          badges: {
            other: [{ id: 3, name: 'Jade' }]
          }
        })
      })
    })

    it('does NOT allow adding input value', async () => {
      const onFilterChange = jest.fn()

      arrangeTest({}, onFilterChange)

      await act(async () => {
        fireEvent.click(screen.getByText(/keywords/i))
      })

      const dropdownMenu = screen.getByTestId('search-categories-dropdown')

      await act(async () => {
        fireEvent.click(getByText(dropdownMenu, 'User Names'))
      })

      const input = screen.getByPlaceholderText('Filter by user names')

      await act(async () => {
        fireEvent.change(input, { target: { value: 'User' } })
      })

      await screen.findByTestId('test-name-option-1')

      expect(screen.queryByText('Search for:')).not.toBeInTheDocument()
    })
  })
})
